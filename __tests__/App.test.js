import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import FJCPopup from '../src/js/FJCPopup'
import Choice from 'nyc-lib/nyc/Choice'
import Dialog from 'nyc-lib/nyc/Dialog'
import App from '../src/js/App'
import $ from 'jquery'

jest.mock('nyc-lib/nyc/ol/FinderApp')
jest.mock('../src/js/FJCPopup')
jest.mock('nyc-lib/nyc/Choice')
jest.mock('nyc-lib/nyc/Dialog')

beforeEach(() => {
  $.resetMocks()
  FinderApp.mockReset()
  FJCPopup.mockReset()
  Choice.mockReset()
  Dialog.mockReset()
})

describe('constructor', () => {
  const makePopup = App.prototype.makePopup
  beforeEach(() => {
    App.prototype.makePopup = jest.fn()
  })
  afterEach(() => {
    App.prototype.makePopup = makePopup
  })

  test('constructor', () => {
    expect.assertions(1)
    const app = new App('mock-options')
    expect(app.makePopup).toHaveBeenCalledTimes(1)  

  })
})

describe('makePopup', () => {
  const makePopup = App.prototype.makePopup
  beforeEach(() => {
    App.prototype.makePopup = jest.fn()
  })
  afterEach(() => {
    App.prototype.makePopup = makePopup
  })

  test('makePopup', () => {
    expect.assertions(3)
    const app = new App('mock-options')
    app.makePopup = makePopup
    app.map = 'mock-map'
    app.layer = 'mock-layer'
    app.makePopup()
    expect(FJCPopup).toHaveBeenCalledTimes(1)
    expect(FJCPopup.mock.calls[0][0].map).toBe('mock-map')
    expect(FJCPopup.mock.calls[0][0].layers).toEqual(['mock-layer'])
      
  })
})

describe('ready', () => {
  const dialogHandlers = App.prototype.dialogHandlers
  const resetFilters = App.prototype.resetFilters
  const map = $('<div id="map"></div>')
  const phn = $('<div id="phn"></div>')
  const info = $('<div id="info"></div>')
  beforeEach(() => {
    App.prototype.dialogHandlers = jest.fn()
    App.prototype.resetFilters = jest.fn()
    $('body').append(map).append(phn).append(info)
  })
  afterEach(() => {
    App.prototype.dialogHandlers = dialogHandlers
    App.prototype.resetFilters = resetFilters
    map.remove()
    phn.remove()
    info.remove()
  })
  test('ready', () => {
    expect.assertions(11)
  
    const app = new App('mock-options')

    expect(FinderApp).toHaveBeenCalledTimes(1)
    expect(FinderApp.mock.calls[0][0]).toBe('mock-options')

    const features = []
    app.ready(features)

    const test = async () => {
      return new Promise(resolve => {
        setTimeout(() => {
          expect($('#phn').length).toBe(1)
          expect($('#info').length).toBe(1)
          expect($('#phn').parent().get(0)).toBe(map.get(0))
          expect($('#info').parent().get(0)).toBe(map.get(0))
          expect(App.prototype.dialogHandlers).toHaveBeenCalledTimes(1)
          expect(FinderApp.mock.instances[0].ready).toHaveBeenCalledTimes(1)
          expect(FinderApp.mock.instances[0].ready.mock.calls[0][0]).toBe(features)      
          
          app.reset.trigger('click')
          expect(App.prototype.resetFilters).toHaveBeenCalledTimes(1)
          
          resolve(true)
        }, 1300)
      })
    }
  
    return test().then(success => expect(success).toBe(true))
  })
})

test('resetFilters', () => {
  expect.assertions(16)

  const app = new App('mock-options')

  app.filters = {
    choiceControls: [new Choice(), new Choice(), new Choice(), new Choice()]
  }

  app.resetFilters()

  for (var i = 0; i < 4; i++) {
    expect(Choice.mock.instances[i].val).toHaveBeenCalledTimes(1)
    expect(Choice.mock.instances[i].trigger).toHaveBeenCalledTimes(1)
    expect(Choice.mock.instances[i].val.mock.calls[0][0]).toEqual([])      
    expect(Choice.mock.instances[i].trigger.mock.calls[0][0]).toBe('change')      
  }
})

describe('dialogHandlers', () => {
  const showPhoneDialog = App.prototype.showPhoneDialog
  const showInfoDialog = App.prototype.showInfoDialog
  const splash = $('<div id="splash-content"><button></button></div>')
  const phn = $('<div id="phn"><a class="btn-phn"></a></div>')
  const info = $('<div id="info"><a class="btn-info"></a></div>')
  beforeEach(() => {
    App.prototype.showPhoneDialog = jest.fn()
    App.prototype.showInfoDialog = jest.fn()
    $('body').append(splash).append(phn).append(info)
  })
  afterEach(() => {
    App.prototype.showPhoneDialog = showPhoneDialog
    App.prototype.showInfoDialog = showInfoDialog
    splash.remove()
    phn.remove()
    info.remove()
  })
  test('dialogHandlers', () => {
    expect.assertions(6)

    const app = new App('mock-options')
    
    app.dialogHandlers()

    expect(Dialog).toHaveBeenCalledTimes(2)
    expect(Dialog.mock.calls[0][0]).toBe('phone-dia')
    expect(Dialog.mock.calls[1][0]).toBe('info-dia')
    app.splashBtn.trigger('click')
    expect(App.prototype.showPhoneDialog).toBeCalledTimes(1)
    app.phoneBtn.trigger('click')
    expect(App.prototype.showPhoneDialog).toBeCalledTimes(2)
    app.infoBtn.trigger('click')
    expect(App.prototype.showInfoDialog).toBeCalledTimes(1)
  })

})

describe('dialog tests', () => {
  let dialogContainer
  let phoneContent
  let infoContent
  beforeEach(() => {
    dialogContainer = $('<div class="dia-container splash"></div>')
    phoneContent = $('<div id="phone-content"></div>')
    infoContent = $('<div id="info-content"></div>')
  
    $('body').append(dialogContainer)
      .append(phoneContent)
      .append(infoContent)
  })
  afterEach(() => {
    dialogContainer.remove()
    phoneContent.remove()
    infoContent.remove()
  })

  test('showPhoneDialog', () => {
    expect.assertions(8)

    const app = new App('mock-options')

    app.phoneDialog = new Dialog('phone-dia')

    expect(phoneContent.length).toBe(1)
    expect(dialogContainer.css('display')).toBe('block')

    app.showPhoneDialog()

    expect(dialogContainer.css('display')).toBe('none')
    expect($.mocks.fadeOut).toBeCalledTimes(1)
    expect($.mocks.fadeOut.mock.instances[0].get(0)).toBe(dialogContainer.get(0))

    expect(app.phoneDialog.ok).toBeCalledTimes(1)
    expect(app.phoneDialog.ok.mock.calls[0][0].message.get(0)).toBe(phoneContent.get(0))
    expect(app.phoneDialog.ok.mock.calls[0][0].buttonText[0]).toBe('Close')
  })

  test('showInfoDialog', () => {
    expect.assertions(8)

    const app = new App('mock-options')
    
    app.infoDialog = new Dialog('info-dia')

    expect(infoContent.length).toBe(1)
    expect(dialogContainer.css('display')).toBe('block')

    app.showInfoDialog()

    expect(dialogContainer.css('display')).toBe('none')
    expect($.mocks.fadeOut).toBeCalledTimes(1)
    expect($.mocks.fadeOut.mock.instances[0].get(0)).toBe(dialogContainer.get(0))

    expect(app.infoDialog.ok).toBeCalledTimes(1)
    expect(app.infoDialog.ok.mock.calls[0][0].message.get(0)).toBe(infoContent.get(0))
    expect(app.infoDialog.ok.mock.calls[0][0].buttonText[0]).toBe('Close')
  })
})

describe('isFiltered', () => {
  let filterButton
  beforeEach(() => {
    filterButton = $('<div id="tabs"><div class="btns"><h2><button class="btn btn-tab btn-2" role="tab" id="tab-btn-2">Filters</button></h2></div></div>')
    $('body').append(filterButton)
  })
  afterEach(() => {
    filterButton.remove()
  })
  
  test('isFiltered', () => {
    expect.assertions(2)
    const app = new App('mock-options')

    expect(app.isFiltered()).toBe(false)
    filterButton.find('button').addClass('filtered')
    expect(app.isFiltered()).toBe(true)
    
  })
})