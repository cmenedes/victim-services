import Point from 'ol/geom/Point'
import facilityStyle from '../src/js/facility-style'
import Feature from 'ol/Feature'



describe('textStyle', () => {
  test('textStyle count < 10', () => {
    expect.assertions(8)
    const style = []
    facilityStyle.textStyle(32, 5, style)

    expect(style.length).toBe(1)
    expect(style[0].getText().getFill().getColor()).toBe('#fff')
    expect(style[0].getText().getFont()).toBe('20px sans-serif')
    expect(style[0].getText().getText()).toBe('5')
    
    expect(style[0].getText().getOffsetX()).toBe(5 * 32 / 33)
    expect(style[0].getText().getOffsetY()).toBe(-4 * 32 / 33)
    expect(style[0].getText().getTextAlign()).toBe('center')
    expect(style[0].getText().getScale()).toBe(32 / 33)
    
  })

  test('textStyle count > 9', () => {
    expect.assertions(8)
    const style = []
    facilityStyle.textStyle(32, 10, style)

    expect(style.length).toBe(1)
    expect(style[0].getText().getFill().getColor()).toBe('#fff')
    expect(style[0].getText().getFont()).toBe('15px sans-serif')
    expect(style[0].getText().getText()).toBe('10')
    
    expect(style[0].getText().getOffsetX()).toBe(5 * 32 / 33)
    expect(style[0].getText().getOffsetY()).toBe(-4 * 32 / 33)
    expect(style[0].getText().getTextAlign()).toBe('center')
    expect(style[0].getText().getScale()).toBe(32 / 33)
    
  })
})

describe('pointStyle', () => {
  const textStyle = facilityStyle.textStyle

  const feature = new Feature({
    geometry: new Point([1,2])
  })
  feature.locationKey = '1@2'
  feature.countByLocation = {}

  beforeEach(() => {
    global.finderApp = {
      source: {}
    }
    facilityStyle.textStyle = jest.fn()
    finderApp.source.getFeaturesAtCoordinate = jest.fn()
    finderApp.isFiltered = jest.fn()
    feature.getFJC = jest.fn().mockImplementation(() => undefined)
    feature.countByLocation['1@2'] = 3
    
  })
  afterEach(() => {
    facilityStyle.textStyle = textStyle
    delete global.finderApp
  })

  test('Zoom is less than 11 & finderApp is filtered', () => {
    expect.assertions(6)
    finderApp.isFiltered.mockImplementation(() => true)

    const style = facilityStyle.pointStyle(feature, 305.748113140705)
    expect(style.length).toBe(1)
    expect(style[0].getImage().getSrc()).toBe('img/stack.svg')
    expect(style[0].getImage().getScale()).toBe(12 / 33)
    expect(facilityStyle.textStyle).toHaveBeenCalledTimes(0)
    expect(finderApp.source.getFeaturesAtCoordinate).toHaveBeenCalledTimes(0)
    expect(feature.getFJC).toHaveBeenCalledTimes(1)
    
  })

  test('Zoom is equal to 13 & finderApp is filtered', () => {
    expect.assertions(6)
    finderApp.isFiltered.mockImplementation(() => true)

    const style = facilityStyle.pointStyle(feature, 19.109257071294063)

    expect(style.length).toBe(1)
    expect(style[0].getImage().getSrc()).toBe('img/stack.svg')
    expect(style[0].getImage().getScale()).toBe(16 / 33)
    expect(facilityStyle.textStyle).toHaveBeenCalledTimes(0)
    expect(finderApp.source.getFeaturesAtCoordinate).toHaveBeenCalledTimes(0)
    expect(feature.getFJC).toHaveBeenCalledTimes(1)
  })

  test('Zoom is equal to 12 & finderApp is not filtered', () => {
    expect.assertions(6)
    finderApp.isFiltered.mockImplementation(() => false)

    feature.countByLocation['1@2'] = 1
    const style = facilityStyle.pointStyle(feature, 38.21851414258813)

    expect(style.length).toBe(1)
    expect(style[0].getImage().getSrc()).toBe('img/icon.svg')
    expect(style[0].getImage().getScale()).toBe(16 / 33)
    expect(facilityStyle.textStyle).toHaveBeenCalledTimes(0)
    expect(finderApp.source.getFeaturesAtCoordinate).toHaveBeenCalledTimes(0)
    expect(feature.getFJC).toHaveBeenCalledTimes(1)
  })

  test('Zoom is equal to 14 & finderApp is not filtered', () => {
    expect.assertions(6)
    finderApp.isFiltered.mockImplementation(() => false)

    feature.countByLocation['1@2'] = 1

    const style = facilityStyle.pointStyle(feature, 9.554628535647032)

    expect(style.length).toBe(1)
    expect(style[0].getImage().getSrc()).toBe('img/icon.svg')
    expect(style[0].getImage().getScale()).toBe(24 / 33)
    expect(facilityStyle.textStyle).toHaveBeenCalledTimes(0)
    expect(finderApp.source.getFeaturesAtCoordinate).toHaveBeenCalledTimes(0)
    expect(feature.getFJC).toHaveBeenCalledTimes(1)
  })

  test('Zoom is equal to 16 & count > 1 & is fjc & filtered', () => {
    expect.assertions(10)
    finderApp.isFiltered.mockImplementation(() => true)
    finderApp.source.getFeaturesAtCoordinate.mockImplementation(() => ['mock-feature0', 'mock-feature1' ])
    feature.getFJC.mockImplementation(() => '1')
    feature.countByLocation['1@2'] = 3

    const style = facilityStyle.pointStyle(feature, 2.388657133911758)

    expect(style.length).toBe(1)
    expect(style[0].getImage().getSrc()).toBe('img/stack-fjc.svg')
    expect(style[0].getImage().getScale()).toBe(32 / 33)

    expect(facilityStyle.textStyle).toHaveBeenCalledTimes(1)
    expect(facilityStyle.textStyle.mock.calls[0][0]).toBe(32)
    expect(facilityStyle.textStyle.mock.calls[0][1]).toBe(2)
    expect(facilityStyle.textStyle.mock.calls[0][2]).toBe(style)

    expect(finderApp.source.getFeaturesAtCoordinate).toHaveBeenCalledTimes(1)
    expect(finderApp.source.getFeaturesAtCoordinate.mock.calls[0][0]).toEqual([1,2])
    
    expect(feature.getFJC).toHaveBeenCalledTimes(1)
  })

  test('Zoom is equal to 18 & count is 1 & is not fjc & filtered', () => {
    expect.assertions(7)
    finderApp.isFiltered.mockImplementation(() => true)
    finderApp.source.getFeaturesAtCoordinate.mockImplementation(() => ['mock-feature'])
    feature.getFJC.mockImplementation(() => undefined)
    feature.countByLocation['1@2'] = 1

    const style = facilityStyle.pointStyle(feature, 0.5971642834779395)

    expect(style.length).toBe(1)
    expect(style[0].getImage().getSrc()).toBe('img/icon.svg')
    expect(style[0].getImage().getScale()).toBe(40 / 33)

    expect(facilityStyle.textStyle).toHaveBeenCalledTimes(0)

    expect(finderApp.source.getFeaturesAtCoordinate).toHaveBeenCalledTimes(1)
    expect(finderApp.source.getFeaturesAtCoordinate.mock.calls[0][0]).toEqual([1,2])
    
    expect(feature.getFJC).toHaveBeenCalledTimes(1)
  })

})