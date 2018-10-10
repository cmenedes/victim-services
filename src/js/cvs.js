
new nyc.ol.FinderApp({
  title: '<span class="screen-reader-only">NYC Criminal Justice</span>Victim Services Finder',
  splashOptions: {message: '<h1>Computer Safety Notice</h1><p>Be aware that abusers may be able to track your visit to this web page.</p>'},
  geoclientUrl: 'https://maps.nyc.gov/geoclient/v1/search.json?app_key=74DF5DB1D7320A9A2&app_id=nyc-lib-example',
  facilityTabTitle: 'Locations',
  facilityUrl: 'data/facility.csv',
  facilityFormat: new nyc.ol.format.CsvPoint({
    x: 'X',
    y: 'Y',
    defaultDataProjection: 'EPSG:2263'
  }),
  facilityStyle: style,
  filterChoiceOptions: [
    {
      title: 'Age Group',
      choices: [
        {name: 'age_group', values: ['1000','1001','1010','1011','1100','1101','1110','1111'], label: 'Under 5 years old', checked: true},
        {name: 'age_group', values: ['0100','0101','0110','0111','1100','1101','1110','1111'], label: '5 to 24 years old', checked: true},
        {name: 'age_group', values: ['0010','0011','0110','0111','1010','1011','1110','1111' ], label: '25 to 60 years old', checked: true},
        {name: 'age_group', values: ['0001','0011','0101','0111','1001','1011','1101','1111'], label: '60 years old and older', checked: true},

      ]
    }
    ,
    {
      title: 'Support for a victim of',
      choices: [
        {
          name: 'crime_types',
          values: ['10000','10001','10010','10011','10100','10101','10110','10111','11000','11001','11010','11011','11100','11101','11110','11111'],
          label: 'Intimate partner violence <a class="filter-info">?</a><div class="filter-info">Physical, sexual, psychological, or economic abuse that occurs between a former husband/wife, boyfriend/girlfriend, child\'s mother/father or a partner that someone lives with or used to live with</div>',
          checked: true
        }, {
          name: 'crime_types',
          values: ['11000','11001','11010','11011','11100','11101','11110','11111','01000','01001','01010','01011','01100','01101','01110','01111'],
          label: 'Family violence <a class="filter-info">?</a><div class="filter-info">Physical, sexual, psychological, or economic abuse that occurs between family members</div>',
          checked: true
        }, {
          name: 'crime_types',
          values: ['00100','00101','00110','00111','01100','01101','01110','01111','10100','10101','10110','10111','11100','11101','11110','11111'],
          label: 'Sexual assault',
          checked: true
        }, {
          name: 'crime_types',
          values: ['00010','00011','00110','00111','01010','01011','01110','01111','10010','10011','10110','10111','11010','11011','11110','11111'],
          label: 'Violent crime',
          checked: true
        }, {
          name: 'crime_types',
          values: ['00001','00011','00111','01011','01111','10011','10111','11011','11111','00101','01001','01101','10001','10101','11001','11101'],
          label: 'Property/financial crime',
          checked: true
        }
      ]
    }
  ],
  facilitySearch: {displayField: 'search_label', nameField: 'ORGANIZATION_NAME'},
  decorations: finderDecorations,
  directionsUrl: 'https://maps.googleapis.com/maps/api/js?client=gme-newyorkcitydepartment&channel=pka&sensor=false&libraries=visualization'
});
