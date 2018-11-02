/**
 * @module victimservices/App
 */

import $ from 'jquery'
import popuphack from './popuphack'
import decorations from './decorations'
import style from './style'
import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import Dialog from 'nyc-lib/nyc/Dialog'

class App extends FinderApp {
  /**
   * @desc Create an instance of App
   * @public
   * @constructor
   */  

  ready(features) {
    super.ready(features)
    
    $('#filters.tab.tab-2 .clps .btn').trigger('click')
    this.reset = $('<button class="btn rad-all reset">Reset</button>')
      .click($.proxy(this.resetFilters, this))
    $('#filters').append(this.reset)
    $('#map').append($('#phn'))
    $('#map').append($('#info'))

    this.dialogHandlers()
  }

  resetFilters(){
    this.filters.choiceControls.forEach(ctl => {
      ctl.val([])
      ctl.trigger('change')
    })
  }

  dialogHandlers() {
    this.phoneDialog = new Dialog('phone-dia')
    this.infoDialog = new Dialog('info-dia')
    this.splashBtn = $('#splash-content button').click($.proxy(this.showPhoneDialog, this))
    this.phoneBtn = $('#phn a.btn-phn').click($.proxy(this.showPhoneDialog, this))
    this.infoBtn = $('#info a.btn-info').click($.proxy(this.showInfoDialog, this))
  }

  showPhoneDialog() {
    $('.dia-container.splash').fadeOut()
    this.phoneDialog.ok({
      message: $('#phone-content'),
      buttonText: ['Close']
    })
  }

  showInfoDialog() {
    $('.dia-container.splash').fadeOut()
    this.infoDialog.ok({
      message: $('#info-content'),
      buttonText: ['Close']
    })
}
}


export default App