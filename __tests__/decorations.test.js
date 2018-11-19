import decorations from '../src/js/decorations'
import OlFeature from 'ol/Feature';
import {notAccessibleFeature, accessibleFeature} from './features.mock'
import nyc from 'nyc-lib/nyc'


describe('decorations', () => {
    let container
    beforeEach(() => {
      container = $('<div></div>')
      $('body').append(container)
    })
    afterEach(() => {
      container.remove()
    })

  test('extendFeature', () => {
    expect.assertions(4)
    accessibleFeature.extendFeature()
    expect(accessibleFeature.locationKey).toBe(`${accessibleFeature.get('X')}@${accessibleFeature.get('Y')}`)
    expect(accessibleFeature.get('search_label')).toBe(
      `<span class="srch-lbl-lg${accessibleFeature.get('WHEELCHAIR_ACCESS') === '1' ? 1 : 0}${accessibleFeature.get('LOCATION_NAME').toLowerCase().indexOf('family justice center') > -1 ? '1' : '0'}">${accessibleFeature.get('ORGANIZATION_NAME')}</span><br>
      <span class="srch-lbl-sm">${accessibleFeature.get('LOCATION_NAME')}</span>`)
    expect(accessibleFeature.get('other_languages')).toBe(`${accessibleFeature.get('OTHER_LANGUAGE') !== '' ? '1' : ''}`)
    expect(accessibleFeature.get('fjc')).toBe(`${accessibleFeature.get('LOCATION_NAME').toLowerCase().indexOf('family justice center') > -1 ? '1' : ''}`)
    /* TODO: test count by location */
  })

  test('getAddress1', () => {
    expect.assertions(2)
    expect(accessibleFeature.getAddress1()).toBe(`${accessibleFeature.get('ADDRESS_1')}`)
    expect(accessibleFeature.getAddress1()).not.toBeNull()
  })

  test('getBorough', () => {
    expect.assertions(2)
    expect(accessibleFeature.getBorough()).toBe(`${accessibleFeature.get('BOROUGH')}`)
    expect(accessibleFeature.getBorough()).not.toBeNull()
  })

  test('getCityStateZip', () => {
    expect.assertions(2)
    expect(accessibleFeature.getCityStateZip()).toBe(`${accessibleFeature.get('ADDRESS_2')}`)
    expect(accessibleFeature.getCityStateZip()).not.toBeNull()
    
  })

  test('getName', () => {
    expect.assertions(2)
    expect(accessibleFeature.getName()).toBe(`${accessibleFeature.get('ORGANIZATION_NAME')}`)
    expect(accessibleFeature.getName()).not.toBeNull()
    
  })

  test('getPhone', () => {
    expect.assertions(2)
    expect(accessibleFeature.getPhone()).toBe(`${accessibleFeature.get('PHONE')}`)
    expect(accessibleFeature.getPhone()).not.toBeNull()
    
  })

  test('getWebsite', () => {
    expect.assertions(2)
    expect(accessibleFeature.getWebsite()).toBe(`${accessibleFeature.get('WEBSITE')}`)
    expect(accessibleFeature.getWebsite()).not.toBeNull()
    
  })

  test('getAccessible', () => {
    expect.assertions(2)
    expect(accessibleFeature.getAccessible()).toEqual(1)
    expect(notAccessibleFeature.getAccessible()).toBe('')
    
  })

  test('getFJC', () => {
    expect.assertions(1)
    accessibleFeature.extendFeature()
    expect(accessibleFeature.getFJC()).toBe(`${accessibleFeature.get('fjc')}`)
    
  })

  test('locationHtml', () => {
    expect.assertions(1)
    expect(accessibleFeature.locationHtml()).toEqual($(`<div class="location notranslate" translate="no">${accessibleFeature.get('LOCATION_NAME')}</div>`))
    
  })

  test('detailsHtml', () => {
    expect.assertions(1)
    expect(accessibleFeature.detailsHtml().children().length).toBe(7)
    // expect(accessibleFeature.detailsHtml()).toBe(
    //   `${accessibleFeature.hoursHtml()}${accessibleFeature.phoneHtml()}${accessibleFeature.eligibilityHtml()}${accessibleFeature.servicesHtml()}${accessibleFeature.languagesHtml()}${accessibleFeature.culturalHtml()}`
    // )
    
  
  })

  test('hoursHtml', () => {
    expect.assertions(2)
    expect(accessibleFeature.hoursHtml()).toEqual($('<div class="hours"><div class="name">Hours of operation:</div><div>Monday - Friday: 9 am - 5 pm<div></div></div> (Saturday: 8 am - 8 pm)</div>'))
    expect(notAccessibleFeature.hoursHtml()).toEqual($('<div class="hours"><div class="name">Hours of operation:</div><div>Monday - Friday: 9 am - 5 pm<div></div></div>'))

  })

  test('eligibilityHtml', () => {
    expect.assertions(2)
    expect(accessibleFeature.eligibilityHtml()).toEqual($('<div class="eligibility"><div class="name">Eligibility criteria:</div>Serves NYC Residents Only</div>'))
    expect(notAccessibleFeature.eligibilityHtml()).toEqual(undefined)
  })

  test('servicesHtml', () => {
    expect.assertions(1)
    expect(accessibleFeature.servicesHtml()).toEqual($('<div class="services"><div class="name">Services offered:</div><ul><li>case management</li><li>crisis intervention</li><li>legal services</li><li>safety planning</li><li>immigration services</li><li>emergency or transitional shelter</li><li>permanent housing</li><li>health care</li><li>mental health counseling</li><li>drug addiction screening and treatment</li><li>language interpretation</li><li>public benefits</li><li>job training and economic empowerment</li><li>restorative justice</li><li>other health services</li></ul></div>'))

  })  

  test('culturalHtml', () => {
    expect.assertions(2)
    expect(accessibleFeature.culturalHtml()).toEqual($('<div class="cultural"><div class="name">Cultural competency specializations:</div><div>All Communities</div></div>'))
    expect(notAccessibleFeature.culturalHtml()).toEqual(undefined)
  
  })

  test('referralHtml', () => {
    expect.assertions(2)
    expect(accessibleFeature.referralHtml()).toEqual($('<div class="referral"><div class="name">Referral Required:</div><div>Self-Referral</div></div>'))
    expect(notAccessibleFeature.referralHtml()).toEqual(undefined)
  
  })
  
})

describe('Accessible facilities', () => {
  let container
  beforeEach(() => {
    container = $('<h3></h3>')
    $('body').append(container)
  })
  afterEach(() => {
    container.remove()
  })

  test('nameHtml isAccessible & fjc', () => {
    expect.assertions(1)

    const div = $('<div></div>')

    div.html(accessibleFeature.nameHtml())

    expect(div.html()).toBe('<h3 class="name notranslate accessible fjc">Organization</h3><div class="location notranslate" translate="no">Brooklyn Family Justice Center<div class="screen-reader-only"> - this is a wheelchair accessible facility</div><div class="screen-reader-only"> - this is a family justice center</div></div>')
  })

  test('nameHtml isNotAccessible', () => {
    expect.assertions(1)

    const div = $('<div></div>')

    div.html(notAccessibleFeature.nameHtml())
    expect(div.html()).toBe('<h3 class="name notranslate">Organization 2</h3><div class="location notranslate" translate="no">Organization 2 Center</div>')
  })

})


test('phoneHtml with ext', () => {
  expect.assertions(2)


  expect(accessibleFeature.phoneButton()).toEqual($('<a class="btn rad-all phone notranslate" href="tel:800-888-8888,1111" translate="no" role="button">800-888-8888 ext. 1111</a>'))
  
  
  let button = false
  expect(accessibleFeature.phoneHtml(button)).toEqual($('<span>800-888-8888 ext. 1111</span>'))

})

test('phoneHtml no ext', () => {
  expect.assertions(2)


  expect(notAccessibleFeature.phoneButton()).toEqual($('<a class="btn rad-all phone notranslate" href="tel:800-888-8888" translate="no" role="button">800-888-8888</a>'))

  let button = false
  expect(notAccessibleFeature.phoneHtml(button)).toEqual($('<span>800-888-8888</span>'))

})


/* TODO: languages Html & makeList */

test('languagesHtml', () => {
  //create ul of languages
  //if ul has children create languages div
    //if #children == length of languages && interpretation services, append interpretation services
})


test('makeList', () => {
  //create ul
  //if item in list is in data
    //create list item: make lowercase and remove _ and -
    //append item to ul
})