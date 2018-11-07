/**
 * @module victimservices/popuphack
 */

import $ from 'jquery'
import MultiFeaturePopup from 'nyc-lib/nyc/ol/MultiFeaturePopup'
import {getCenter as olExtentGetCenter} from 'ol/extent'

MultiFeaturePopup.prototype.showFeatures = function(features, coordinate) {
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

  setTimeout(() => {
    this.pan()
  }, 1000)
}

MultiFeaturePopup.prototype.pagerShow = function(features) {
  this.content.find('.it-pg').show()
  this.pager.show(features)
}

MultiFeaturePopup.prototype.showSplit = function(fjcFeatures, otherFeatures) {
  const fjcButtons = $(popuphack.BUTTONS_HTML)
  this.fjcFeatures = fjcFeatures
  $(popuphack.COUNT_OF_HTML).insertAfter(this.content.find('span.total'))
  this.otherFeatures = otherFeatures
  if (otherFeatures.length === 0) {
    fjcButtons.find('.other').remove()
  }
  fjcButtons.find('button').click($.proxy(this.showSubset, this))
  fjcButtons.find('.fjc').html(`${fjcFeatures.length} ${fjcFeatures[0].get('LOCATION_NAME')} facilities`)
  fjcButtons.find('.other').prepend(`${otherFeatures.length} `)
  this.content.find('.fjc-btns').show()
  this.content.find('.it-pg').hide()
  this.content.append(fjcButtons)
}

MultiFeaturePopup.prototype.showSubset = function(event) {
  let features
  if ($(event.currentTarget).hasClass('fjc')) {
    features = this.fjcFeatures
    this.content.find('button.fjc').hide()
    this.content.find('button.other').show()
    this.content.find('.count-of').html(' Family Justice Centers')
  } else {
    features = this.otherFeatures
    this.content.find('button.fjc').show()
    this.content.find('button.other').hide()
    this.content.find('.count-of').html(' Other Facilities')
  }  

  this.pagerShow(features)
}

const popuphack = {
  BUTTONS_HTML: '<div class="fjc-btns"><button class="btn rad-all fjc"></button><button class="btn rad-all other">Other facilities</button></div>',
  COUNT_OF_HTML: '<span class="count-of"></span>'
}
