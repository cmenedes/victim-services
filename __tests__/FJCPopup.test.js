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
const showFeatures = FJCPopup.showFeatures
let map, target

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
  FJCPopup.showFeatures = showFeatures
  
})


test('showFeatures', () => {
  expect.assertions(7)
  
  const csvPoint = new CsvPoint({
    x: 'X',
    y: 'Y',
    defaultDataProjection: 'EPSG:2263'
  })
  
  const features = [
    new OlFeature({geometry: new OlGeomPoint([0, 0])}),
    new OlFeature({geometry: new OlGeomPoint([0, 1])}),
    new OlFeature({geometry: new OlGeomPoint([0, 2])})
  ]
  features.forEach(feature => {
    nyc.mixin(feature, [decorations])
  }) 
    
  const popup = new FJCPopup({
    map: map,
    layers: mockLayers
  })

  popup.showFeatures = jest.fn()

  popup.showFeatures(features, [1,1])
  expect(popup.showFeatures).toHaveBeenCalledTimes(1)
  expect(popup.showFeatures.mock.calls[0][0].length).toBe(3)
  expect(popup.showFeatures.mock.calls[0][0][0].getGeometry().getCoordinates()).toEqual([0,0])
  expect(popup.showFeatures.mock.calls[0][0][1].getGeometry().getCoordinates()).toEqual([0,1])
  expect(popup.showFeatures.mock.calls[0][0][2].getGeometry().getCoordinates()).toEqual([0,2])
  expect(popup.showFeatures.mock.calls[0][1]).toEqual([1,1])
  
  let fjcContent = popup.content.find('.fjc-btns, .count-of')
  expect(fjcContent.length).toBe(0)

  //features length 1

  //features length 3
  
})

test('pagerShow', () => {


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
