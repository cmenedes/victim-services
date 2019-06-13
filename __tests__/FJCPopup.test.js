import $ from 'jquery'
import OlMap from 'ol/Map'
import OlView from 'ol/View'
import ItemPager from 'nyc-lib/nyc/ItemPager'
import MultiFeaturePopup from 'nyc-lib/nyc/ol/MultiFeaturePopup'
import FJCPopup from '../src/js/FJCPopup'
import nyc from 'nyc-lib/nyc'
import decorations from '../src/js/decorations'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'

jest.mock('nyc-lib/nyc/ItemPager')

class MockLayer {
  set(prop, val) {
    this[prop] = val
  }
  get(prop) {
    return this[prop]
  }
}
const mockLayers = [new MockLayer()]

const fjcFeatureSource = {
  LOCATION_NAME: 'Brooklyn Family Justice Center',
  WHEELCHAIR_ACCESS: 1,
  X: 0,
  Y: 0,
  ORGANIZATION_NAME: 'Organization1'
}

const nonFjcFeatureSource = {
  LOCATION_NAME: 'Brooklyn Center',
  WHEELCHAIR_ACCESS: 1,
  X: 0,
  Y: 1,
  ORGANIZATION_NAME: 'Organization2'
}

const csvPoint = new CsvPoint({
  x: 'X',
  y: 'Y',
  dataProjection: 'EPSG:3857'
})
const fjcFeature = csvPoint.readFeature(fjcFeatureSource)
nyc.mixin(fjcFeature, [decorations])

const nonFjcFeature = csvPoint.readFeature(nonFjcFeatureSource)
nyc.mixin(nonFjcFeature, [decorations])

fjcFeature.extendFeature()
nonFjcFeature.extendFeature()

let map, target, options

beforeEach(() => {
  ItemPager.mockReset()
  target = $('<div></div>').css({width: '500px', height: '500px'})
  $('body').append(target)

  map = new OlMap({
    target: target.get(0),
    view: new OlView({
      center: [0, 0],
      zoom: 0
    })
  })

  options = {
    map: map,
    layers: mockLayers
  }
  
})

afterEach(() => {
  target.remove()
})

test('constructor', () => {
  expect.assertions(4)
  const popup = new FJCPopup(options)

  expect(popup).toBeInstanceOf(FJCPopup)
  expect(popup).toBeInstanceOf(MultiFeaturePopup)
  expect(ItemPager).toHaveBeenCalledTimes(1)
  expect(ItemPager.mock.instances[0]).toBe(popup.pager)
})

describe('showFeatures', () => {
  const show = FJCPopup.prototype.show 
  const showSplit = FJCPopup.prototype.showSplit
  const pagerShow = FJCPopup.prototype.pagerShow
  
  let popup
  
  beforeEach(() => {
    FJCPopup.prototype.show = jest.fn()    
    FJCPopup.prototype.showSplit = jest.fn()
    FJCPopup.prototype.pagerShow = jest.fn()

    popup = new FJCPopup({
      map: map,
      layers: mockLayers
    })
    
  })
  afterEach(() => {
    FJCPopup.prototype.show = show
    FJCPopup.prototype.showSplit = showSplit
    FJCPopup.prototype.pagerShow = pagerShow
    
  })

  test('showFeatures w/o coordinates - pagerShow: 1 Feature', () => {
    expect.assertions(5)

    const features = [nonFjcFeature]

    popup.showFeatures(features)
  
    expect(FJCPopup.prototype.pagerShow).toHaveBeenCalledTimes(1)
    expect(popup.pagerShow.mock.calls[0][0].length).toBe(1)
    expect(popup.pagerShow.mock.calls[0][0][0]).toEqual(nonFjcFeature)
    
    let fjcContent = popup.content.find('.fjc-btns, .count-of')
    expect(fjcContent.length).toBe(0)
    expect(FJCPopup.prototype.show.mock.calls[0][0]).toEqual({coordinate: [0, 1]})
    
  })

  test('showFeatures - pagerShow: Multiple Features 2 nonFJC', () => {
    expect.assertions(4)
    
    const features = [nonFjcFeature, nonFjcFeature]
  
    popup.showFeatures(features, [1,1])
  
    expect(FJCPopup.prototype.pagerShow).toHaveBeenCalledTimes(1)
    expect(popup.pagerShow.mock.calls[0][0].length).toBe(2)
    expect(popup.pagerShow.mock.calls[0][0][0]).toEqual(nonFjcFeature)
    
    let fjcContent = popup.content.find('.fjc-btns, .count-of')
    expect(fjcContent.length).toBe(0)
  
  })

  test('showFeatures w/coordinates - showSplit: 1 FJC & 1 nonFJC', () => {
    expect.assertions(7)

    const features = [fjcFeature, nonFjcFeature]

    popup.showFeatures(features, [1,1])

    expect(FJCPopup.prototype.showSplit).toHaveBeenCalledTimes(1)
    expect(popup.showSplit.mock.calls[0][0].length).toBe(1)   
    expect(popup.showSplit.mock.calls[0][1].length).toBe(1)    
    expect(popup.showSplit.mock.calls[0][0][0]).toEqual(fjcFeature)
    expect(popup.showSplit.mock.calls[0][1][0]).toEqual(nonFjcFeature)
    
    let fjcContent = popup.content.find('.fjc-btns, .count-of')
    expect(fjcContent.length).toBe(0)
    
    expect(FJCPopup.prototype.show.mock.calls[0][0]).toEqual({coordinate: [1,1]})
  })
})

test('pagerShow', () => {
  expect.assertions(5)

  const popup = new FJCPopup(options)
  const features = [nonFjcFeature, nonFjcFeature]

  expect(ItemPager.mock.instances[0]).toBe(popup.pager)

  popup.pagerShow(features)

  expect(ItemPager.mock.instances[0].show).toHaveBeenCalledTimes(1)
  expect(ItemPager.mock.instances[0].show.mock.calls[0][0]).toBe(features)

  expect(popup.pager.show).toHaveBeenCalledTimes(1)
  expect(popup.pager.show.mock.calls[0][0]).toBe(features)
  

})

describe('showSplit', () => {
  const showSubset = FJCPopup.prototype.showSubset
  
  beforeEach(() => {
    FJCPopup.prototype.showSubset = jest.fn()
    
  })
  afterEach(() => {
    FJCPopup.prototype.showSubset = showSubset
    
  })

  test('showSplit', () => {
    expect.assertions(10)
  
    const fjcButtons = $(FJCPopup.HTML.BUTTONS_HTML)  
    const popup = new FJCPopup(options)
    let fjcFeatures = [fjcFeature]
    let otherFeatures = [nonFjcFeature]
    let features = [fjcFeature, nonFjcFeature]

    popup.content.append('<span class="total"></span>')
    
    popup.showSplit(fjcFeatures, otherFeatures)
  
    expect(popup.fjcFeatures).toBe(fjcFeatures)
    expect(popup.otherFeatures).toBe(otherFeatures)
  
    expect(popup.content.find('span.total').length).toBe(1)
    expect(popup.content.find('span.total').next()[0]).toBe(popup.content.find('span.count-of')[0])
  

    popup.fjcButtons.find('.fjc').trigger('click')
    expect(popup.showSubset).toHaveBeenCalledTimes(1)

    let fjcButton = popup.fjcButtons.find('.fjc').html(`${'Brooklyn Family Justice Center <br> - Click for details'}`)

    expect(fjcButton.length).toBe(1)

    let fjcContent = popup.content.find('.fjc-btns')
    expect(fjcContent.children().length).toBe(4)
  
    let itContent = popup.content.find('.it-pg')
    expect(itContent.length).toBe(0)
  

    otherFeatures = []
    popup.showSplit(fjcFeatures, otherFeatures)
    
    let otherContent = popup.fjcButtons.find('.other')
    let hrContent = popup.fjcButtons.find('.hr')
    
    expect(otherContent.length).toBe(0)
    expect(hrContent.length).toBe(0)
  
  })
  
})


describe('showSubset', () => {
  const pagerShow = FJCPopup.prototype.pagerShow

  test('showSubset if FJC is clicked', () => {
    expect.assertions(3)

    let fjcFeatures = [fjcFeature]    
    let otherFeatures = [nonFjcFeature]
    const popup = new FJCPopup(options)
    
    popup.content.append('<span class="total"></span>')
    
    popup.showSplit(fjcFeatures, otherFeatures)

    popup.fjcButtons.find('.fjc').trigger('click')
    expect(popup.content.find('button.fjc').css('display')).toBe('none')
    expect(popup.content.find('button.other').css('display')).toBe('inline-block')
    expect(popup.content.find('.count-of').text()).toBe(' Family Justice Centers')
  
  })

  test('showSubset if FJC is clicked && otherFeatures == 0', () => {
    expect.assertions(2)
  
    let fjcFeatures = [fjcFeature]  
    let otherFeatures = []     
    const popup = new FJCPopup(options)
    popup.content.append('<span class="total"></span>')

    popup.showSplit(fjcFeatures, otherFeatures)
    popup.fjcButtons.find('.fjc').trigger('click')

    expect(popup.content.find('.count-of').text()).toBe(' Family Justice Centers')
    expect(popup.content.find('.fjc-btns').css('display')).toBe('none')
  
  })
  
  test('showSubset if other is clicked', () => {
    expect.assertions(4)
    
    let fjcFeatures = [fjcFeature]    
    let otherFeatures = [nonFjcFeature]
    const popup = new FJCPopup(options)
    popup.content.append('<span class="total"></span>')


    popup.showSplit(fjcFeatures, otherFeatures)  
    popup.fjcButtons.find('button.other').trigger('click')
    expect(popup.content.find('button.fjc').css('display')).toBe('inline-block')
    expect(popup.content.find('button.other').css('display')).toBe('none')
    expect(popup.content.find('.fjc-btns').css('display')).toBe('block')

    expect(popup.content.find('.count-of').text()).toBe(' Other Facilities')
    
  
  })

  test('showSubset either case', () => {
  
    expect.assertions(9)
    let fjcFeatures = [fjcFeature]    
    let otherFeatures = [nonFjcFeature]
    const popup = new FJCPopup(options)
    FJCPopup.prototype.pagerShow = jest.fn()

    popup.showSplit(fjcFeatures, otherFeatures)  
      
    popup.fjcButtons.find('button.other').trigger('click')

    expect(popup.pagerShow.mock.calls[0][0].length).toBe(1)
    expect(popup.pagerShow.mock.calls[0][0][0]).toEqual(nonFjcFeature)
      
    popup.fjcButtons.find('.fjc').trigger('click')

    expect(popup.pagerShow.mock.calls[0][0].length).toBe(1)
    expect(popup.pagerShow.mock.calls[1][0][0]).toEqual(fjcFeature)

    expect(popup.content.find('.fjc-btns').css('padding-bottom')).toBe('10px')
    expect(popup.content.find('.fjc-btns').css('padding-top')).toBe('10px')
    expect(popup.content.find('a.web').css('display')).toBe('none')
    expect(popup.content.find('.fjc-btns hr').css('display')).toBe('none')

    expect(FJCPopup.prototype.pagerShow).toHaveBeenCalledTimes(2)
 
    FJCPopup.prototype.pagerShow = pagerShow
    
  })


})
