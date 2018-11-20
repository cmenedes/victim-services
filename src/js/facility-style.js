/**
 * @module victimservices/facility-style
 */

import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import Text from 'ol/style/Text'
import Fill from 'ol/style/Fill'
import nycOl from 'nyc-lib/nyc/ol' 

const facilityStyle = {
  textStyle: (size, count, style) => {
      const fontSize = count > 9 ? 15 : 20
      style.push(
        new Style({
          text: new Text({
            fill: new Fill({color: '#fff'}),
            font: `${fontSize}px sans-serif`,
            text: `${count}`,
            offsetX: 5 * size / 33,
            offsetY: -4 * size / 33,
            textAlign: 'center',
            scale: size / 33
          })
        })
      )
  },

  pointStyle: (feature, resolution) => {
    const zoom = nycOl.TILE_GRID.getZForResolution(resolution)
    let count = 0
    if (zoom > 13 && finderApp.isFiltered()) {
      const coord = feature.getGeometry().getCoordinates()
      count = finderApp.source.getFeaturesAtCoordinate(coord).length    
    } else {
      count = feature.countByLocation[feature.locationKey]
    }
  
    const fjc = feature.getFJC() ? '-fjc' : ''
    let size = 12
    if (zoom > 17) size = 40
    else if (zoom > 15) size = 32
    else if (zoom > 13) size = 24
    else if (zoom > 11) size = 16
  
    const style = [new Style({
      image: new Icon({
        src: 'img/' + (count === 1 ? `icon${fjc}.svg` : `stack${fjc}.svg`),
        scale: size / 33,
        imgSize: [33, 33]
      })
    })]

    if (zoom > 13 && count > 1) {
      facilityStyle.textStyle(size,count,style)
    }
  
    return style
  }
}


export default facilityStyle