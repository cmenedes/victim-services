/**
 * @module victimservices/FJCPopup
 */

import $ from 'jquery'
import MultiFeaturePopup from 'nyc-lib/nyc/ol/MultiFeaturePopup'
import {getCenter as olExtentGetCenter} from 'ol/extent'


 /**
 * @desc A class to display FJC popups on a map
 * @public
 * @class
 * @extends module:nyc/ol/MultiFeaturePopup~MultiFeaturePopup
 */
class FJCPopup extends MultiFeaturePopup {
  constructor(options){
    super(options)
  }
 
  showFeatures(features, coordinate) {
    coordinate = coordinate || olExtentGetCenter(features[0].getGeometry().getExtent())
    this.content.find('.fjc-btns, .count-of').remove()
    if (features.length === 1) {
      this.pagerShow(features)
    } else {
      const fjcFeatures = features.filter(feature => feature.getFJC())
      const otherFeatures = features.filter(feature => !feature.getFJC())
      if (fjcFeatures.length === 0) {
        this.pagerShow(otherFeatures)
      } else {
        this.showSplit(fjcFeatures, otherFeatures) 
      }
    }
    this.show({coordinate: coordinate})
  }

  pagerShow(features) {
    this.content.find('.it-pg').show()
    this.pager.show(features)
  }

  showSplit(fjcFeatures, otherFeatures) {
    this.fjcButtons = $(FJCPopup.HTML.BUTTONS_HTML)
    this.fjcFeatures = fjcFeatures
    $(FJCPopup.HTML.COUNT_OF_HTML).insertAfter(this.content.find('span.total'))
    this.otherFeatures = otherFeatures
    if (otherFeatures.length === 0) {
      this.fjcButtons.find('.other').remove()
      this.fjcButtons.find('hr').remove()
    }
    this.fjcButtons.find('button').click($.proxy(this.showSubset, this))
    this.fjcButtons.find('.fjc').html(`${fjcFeatures[0].get('LOCATION_NAME')} <br> - Click for details`)
    .append()
    this.content.find('.fjc-btns').show()
    this.content.find('.it-pg').hide()
    this.content.append(this.fjcButtons)
  }

  showSubset(event) {
    let features
    if ($(event.currentTarget).hasClass('fjc')) {
      features = this.fjcFeatures
      this.content.find('button.fjc').hide()
      this.content.find('button.other').show()
      this.content.find('.count-of').html(' Family Justice Centers')
      if(this.otherFeatures.length === 0)  {
        this.content.find('.fjc-btns').hide()
      }
    } else {
      features = this.otherFeatures
      this.content.find('button.fjc').show()
      this.content.find('button.other').hide()
      this.content.find('.count-of').html(' Other Facilities')
  
      }
    
    this.content.find('.fjc-btns').css('padding-bottom', '10px')
    this.content.find('.fjc-btns').css('padding-top', '10px')
    this.content.find('a.web').hide()
    this.content.find('.fjc-btns hr').hide()
    this.pagerShow(features)
  }

}

FJCPopup.HTML = {
  BUTTONS_HTML: '<div class="fjc-btns"><button class="btn rad-all fjc"></button><a class="btn rad-all web" target="__blank" href="https://www1.nyc.gov/site/ocdv/programs/family-justice-centers.page">Website</a><hr><button class="btn rad-all other">Other facilities</button></div>',
  COUNT_OF_HTML: '<span class="count-of"></span>'
}

export default FJCPopup