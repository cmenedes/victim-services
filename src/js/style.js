/**
 * @module victimservices/style
 */

import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import Text from 'ol/style/Text'
import Fill from 'ol/style/Fill'
import nycOl from 'nyc-lib/nyc/ol' 

const style = (feature, resolution) => {
  const count = feature.countByLocation[feature.locationKey]
  const zoom = nycOl.TILE_GRID.getZForResolution(resolution)

  let size = 12
  if (zoom > 11) size = 16
  if (zoom > 13) size = 24
  if (zoom > 15) size = 32
  if (zoom > 17) size = 40
  const fjc = feature.get('fjc') ? '-fjc' : ''
  
  const style = [new Style({
    image: new Icon({
      src: 'img/' + (count === 1 ? `icon${fjc}.svg` : `stack${fjc}.svg`),
      scale: size / 33,
      imgSize: [33, 33]
    })
  })]
  
  let fontSize = '20'
  if (zoom > 13 && count > 1) {
    if(count > 9)
      fontSize = '15'
    style.push(
      new Style({
        text: new Text({
          fill: new Fill({color: '#fff'}),
          font: fontSize + 'px sans-serif',
          text: count + '',
          offsetX: 5 * size / 33,
          offsetY: -4 * size / 33,
          textAlign: 'center',
          scale: size / 33
        })
      })
    )
  }

  return style
}

export default style