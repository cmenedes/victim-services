function style(feature,resolution) {
  var count = 1;
  var size = 16;
  return new ol.style.Style({
    image: new ol.style.Icon({
      src: 'img/' + (count == 1 ? 'icon.svg' : 'stack.svg'),
      scale: size / 33,
      imgSize: [33, 33]
    })
  });
};