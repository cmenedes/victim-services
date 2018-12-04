import $ from 'jquery'
import {getCenter as olExtentGetCenter} from 'ol/extent'
import OlMap from 'ol/Map'
import OlView from 'ol/View'
import OlFeature from 'ol/Feature'
import OlGeomPoint from 'ol/geom/Point'
import ItemPager from 'nyc-lib/nyc/ItemPager'
import Popup from 'nyc-lib/nyc/ol/Popup'
import FeaturePopup from 'nyc-lib/nyc/ol/FeaturePopup'
import MultiFeaturePopup from 'nyc-lib/nyc/ol/MultiFeaturePopup'
import FJCPopup from '../src/js/FJCPopup'
import nyc from 'nyc-lib/nyc'
import decorations from '../src/js/decorations'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'


class MockLayer {
  set(prop, val) {
    this[prop] = val
  }
  get(prop) {
    return this[prop]
  }
}
const mockLayers = [new MockLayer(), new MockLayer()]
const mockLayer = new MockLayer()
let map, target

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
  defaultDataProjection: 'EPSG:3857'
})
const fjcFeature = csvPoint.readFeature(fjcFeatureSource)
nyc.mixin(fjcFeature, [decorations])

const nonFjcFeature = csvPoint.readFeature(nonFjcFeatureSource)
nyc.mixin(nonFjcFeature, [decorations])

fjcFeature.extendFeature()
nonFjcFeature.extendFeature()

let features 

beforeAll(() => {
  target = $('<div></div>').css({width: '500px', height: '500px'})
  $('body').append(target)

  map = new OlMap({
    target: target.get(0),
    view: new OlView({
      center: [0, 0],
      zoom: 0
    })
  })
  
})

afterAll(() => {
  target.remove()
  
})

test('constructor', () => {
  expect.assertions(2)
  const popup = new FJCPopup({
    map: map,
    layers: mockLayers
  })

  expect(popup).toBeInstanceOf(FJCPopup)

  expect(popup.pager instanceof ItemPager).toBe(true)
})

describe('showFeatures', () => {
  const show = FJCPopup.prototype.show 
  const showFeatures = FJCPopup.prototype.showFeatures
  const showSplit = FJCPopup.prototype.showSplit
  const pagerShow = FJCPopup.prototype.pagerShow
  
  let csvPoint, popup
  
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

    features = [nonFjcFeature]

    popup.showFeatures(features)
  
    expect(FJCPopup.prototype.pagerShow).toHaveBeenCalledTimes(1)
    expect(popup.pagerShow.mock.calls[0][0].length).toBe(1)
    expect(popup.pagerShow.mock.calls[0][0][0]).toEqual(nonFjcFeature)
    
    let fjcContent = popup.content.find('.fjc-btns, .count-of')
    expect(fjcContent.length).toBe(0)

    expect(FJCPopup.prototype.show.mock.calls[0][0]).toEqual({coordinate: [0,1]})
    
  
  })

  test('showFeatures - pagerShow: Multiple Features 2 nonFJC', () => {
    expect.assertions(4)
    
    features = [nonFjcFeature, nonFjcFeature]
  
    popup.showFeatures(features, [1,1])
  
    expect(FJCPopup.prototype.pagerShow).toHaveBeenCalledTimes(1)
    expect(popup.pagerShow.mock.calls[0][0].length).toBe(2)
    expect(popup.pagerShow.mock.calls[0][0][0]).toEqual(nonFjcFeature)
    
    let fjcContent = popup.content.find('.fjc-btns, .count-of')
    expect(fjcContent.length).toBe(0)
  
  })

  test('showFeatures w/coordinates - showSplit: 1 FJC & 1 nonFJC', () => {
    expect.assertions(7)

    features = [fjcFeature, nonFjcFeature]

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


describe('pagerShow', () => {
  const pagerShow = FJCPopup.prototype.pagerShow
  const show = ItemPager.prototype.show
  
  let popup
  
  beforeEach(() => {
    FJCPopup.prototype.pagerShow = jest.fn()        
    ItemPager.prototype.show = jest.fn()        
    
    popup = new FJCPopup({
      map: map,
      layers: mockLayers
    })
    
  afterEach(() => {
    FJCPopup.prototype.pagerShow = pagerShow
    ItemPager.prototype.show = show
    
  })
    
  })
  test('pagerShow', () => {
    expect.assertions(2)
  
    features = [nonFjcFeature, nonFjcFeature]


    // popup.showFeatures(features)
    popup.pagerShow(features)

    // expect(popup.content.find('.it-pg').length).toBe(1)
    expect($(popup.content.find('.it-pg')).css('display')).toBe('block')
    // expect($(popup.content.find('.btns')).length).toEqual(1)
    expect($(popup.content.find('.btns')).css('display')).toBe('block')
    

    // console.info(ItemPager.show)
    // expect(ItemPager.prototype.show).toHaveBeenCalledTimes(1)
    // expect(ItemPager.prototype.show.mock.calls[0][0]).toBe(feature)
  })

})


test('showSplit', () => {


})

describe('showSubset', () => {
  test('showSubset if FJC is clicked', () => {
  
    //button.fjc is hidden
    //button.other is visible
    //count of 'Family Justice Centers' is visible
    //.fjc-btns is visible if there are no other facilities at location
  
  })

  test('showSubset if FJC is clicked && otherFeatures == 0', () => {
  
    //button.fjc is hidden
    //button.other is visible
    //count of 'Family Justice Centers' is visible
    //.fjc-btns is hidden 
  
  })
  
  test('showSubset if other is clicked', () => {
  
    //button.fjc is visible
    //button.other is hidden
    //count of 'Other Facilities' is visible
  

  })

  test('showSubset either case', () => {
  
    //in either case
      //.fjc-btns css padding top and bottom set to 10px
      //website button and hr is hidden
      //pager is visible

  })


})
