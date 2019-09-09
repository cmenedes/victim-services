import index from '../src/js/index'
import App from '../src/js/App'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'
import facilityStyle from '../src/js/facility-style'
import decorations from '../src/js/decorations'


jest.mock('../src/js/App')
jest.mock('nyc-lib/nyc/ol/format/CsvPoint')

describe('App is created', () => {
  test('App is created', () => {
    expect.assertions(17)
    expect(App).toHaveBeenCalledTimes(1)
  
    expect(App.mock.calls[0][0].title).toEqual('<span class="screen-reader-only">NYC Criminal Justice</span><span>Victim Services Finder</span>')

    expect(App.mock.calls[0][0].splashOptions.message).toEqual($('#splash-content'))
    expect(App.mock.calls[0][0].splashOptions.buttonText).toEqual(['Screen reader instructions','Continue to map'])

    expect(App.mock.calls[0][0].geoclientUrl).toEqual('https://maps.nyc.gov/geoclient/v1/search.json?app_key=74DF5DB1D7320A9A2&app_id=nyc-lib-example')

    expect(App.mock.calls[0][0].facilityTabTitle).toEqual('Locations')

    expect(App.mock.calls[0][0].facilityUrl).toEqual('data/facility.csv')

    expect(App.mock.calls[0][0].facilityFormat instanceof CsvPoint).toBe(true)
    expect(CsvPoint.mock.calls[0][0].x).toEqual('X')
    expect(CsvPoint.mock.calls[0][0].y).toEqual('Y')
    expect(CsvPoint.mock.calls[0][0].dataProjection).toEqual('EPSG:2263')

    expect(App.mock.calls[0][0].facilityStyle).toBe(facilityStyle.pointStyle)

    expect(App.mock.calls[0][0].filterChoiceOptions.length).toBe(4)  

    expect(App.mock.calls[0][0].facilitySearch.displayField).toEqual('search_label')
    expect(App.mock.calls[0][0].facilitySearch.nameField).toEqual('ORGANIZATION_NAME')

    expect(App.mock.calls[0][0].decorations).toBe(decorations)

    expect(App.mock.calls[0][0].directionsUrl).toBe('https://maps.googleapis.com/maps/api/js?client=gme-newyorkcitydepartment&channel=cvs&sensor=false&libraries=visualization')

  })
})
