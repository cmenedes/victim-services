/**
 * @module victimservices/App
 */

import $ from 'jquery'
import popuphack from './popuphack'
import decorations from './decorations'
import style from './style'

import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import Filters from './Filters'
import Dialog from 'nyc-lib/nyc/Dialog'



class App extends FinderApp {
  /**
   * @desc Create an instance of App
   * @public
   * @constructor
   */  

  ready(features){
    super.ready(features)
    
    $('#filters.tab.tab-2 .clps .btn').trigger('click')
    const reset = $('<button class="btn rad-all reset">Reset</button>').click(() => {
      finderApp.filters.choiceControls.forEach(ctl => {
        ctl.val([])
        ctl.trigger('change')
      })
    })
    $('#filters').append(reset)
    $('#map').append($('#phn'))
    $('#map').append($('#info'))

    this.dialogHandler()
  }

  dialogHandler(){
    let phoneDialog = new Dialog('phone-dia');
    let infoDialog = new Dialog('info-dia');

    $('#splash-content button').click(() => {
      $('.dia-container.splash').fadeOut();
      phoneDialog.ok({
        message: $('#phone-content'),
        buttonText: ['Close']
      })
    });

    $('#phn a.btn-phn').click(() => {
      $('.dia-container.splash').fadeOut();
      phoneDialog.ok({
        message: $('#phone-content'),
        buttonText: ['Close']
      })
    });

    $('#info a.btn-info').click(() => {
      $('.dia-container.splash').fadeOut();
      infoDialog.ok({
        message: $('#info-content'),
        buttonText: ['Close']
      })
    });

  }
}

export default App