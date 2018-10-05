
new nyc.ol.FinderApp({
  title: 'Victim Services Finder',
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
        {name: 'AGE_0-5', values: '1', label: 'Under 5 years old', checked: true},
        {name: 'AGE_5-24', values: '1', label: '5 to 24 years old', checked: true},
        {name: 'AGE_25-60', values: '1', label: '25 to 60 years old', checked: true},
        {name: 'AGE_60+', values: '1', label: '60 years old and older', checked: true},

      ]
    },
    {
      title: 'Support for a victim of',
      choices: [
        {
          name: 'INTIMATE_PARTNER_VIOLENCE',
          value: '1',
          label: 'Intimate partner violence <a class="filter-info">?</a><div class="filter-info">Physical, sexual, psychological, or economic abuse that occurs between a former husband/wife, boyfriend/girlfriend, child\'s mother/father or a partner that someone lives with or used to live with</div>',
          checked: true
        }, {
          name: 'FAMILY_VIOLENCE',
          value: '1',
          label: 'Family violence <a class="filter-info">?</a><div class="filter-info">Physical, sexual, psychological, or economic abuse that occurs between family members</div>',
          checked: true
        }, {
          name: 'SEXUAL_ASSAULT',
          value: '1',
          label: 'Sexual assault',
          checked: true
        }, {
          name: 'VIOLENT_CRIME',
          value: '1',
          label: 'Violent crime',
          checked: true
        }, {
          name: 'PROPERTY/FINANCIAL_CRIMES',
          value: '1',
          label: 'Property/financial crime',
          checked: true
        }
      ]
    }
  ],
  facilitySearch: {nameField: 'search_label'},
  decorations: finderDecorations,
  directionsUrl: 'https://maps.googleapis.com/maps/api/js?client=gme-newyorkcitydepartment&channel=pka&sensor=false&libraries=visualization'
});
