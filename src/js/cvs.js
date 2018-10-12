nyc.ol.Filters.prototype.addFilter = function(choices) {
  var target = $('<div class="competency"></div>');
  this.append(target);
  const choice = new nyc.Choice({
    target: $('<div class="competency-choices"></div>'),
    choices: choices
  })
  const collapsible = new nyc.Collapsible({
    target: target,
    title: 'Cultural competencies',
    content: choice.getContainer()
  })
  choice.on('change', $.proxy(this.filter, this))
  this.choiceControls.push(choice)
};

var readyFn = nyc.ol.FinderApp.prototype.ready;

nyc.ol.FinderApp.prototype.ready = function(features) {
  readyFn.call(this, features);
  var choices = [];
  for (var comp in finderDecorations.culturalCompetencies) {
    if (comp.trim()) {
      choices.push({
        name: 'CULTURAL_COMPETENCIES_SPECIALIZATIONS',
        values: [comp],
        label: comp,
        checked: false
      });
    }
  }
  choices.sort(function(a, b) {
    if (a.label < b.label) return -1;
    if (a.label > b.label) return 1;
    return 0;
  });

  this.filters.addFilter(choices)
};

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
      title: 'Language',
      choices: [
        {name: 'SPANISH', values: ['1'], label: 'Spanish'},
        {name: 'ARABIC', values: ['1'], label: 'Arabic'},
        {name: 'BENGALI', values: ['1' ], label: 'Bengali'},
        {name: 'CHINESE', values: ['1'], label: 'Chinese'},
        {name: 'FRENCH', values: ['1'], label: 'French' },
        {name: 'HAITIAN-CREOLE', values:['1'], label: 'Haitian-Creole'},
        {name: 'ITALIAN', values: ['1'], label: 'Italian'},
        {name: 'KOREAN', values: ['1'], label: 'Korean'},
        {name: 'POLISH', values: ['1'], label: 'Polish'},
        {name: 'RUSSIAN', values: ['1'], label: 'Russian'},
        {name: 'URDU', values: ['1'], label: 'Urdu'},
        {name: 'YIDDISH', values: ['1'], label: 'Yiddish'},
        {name: 'other_languages', values: ['1'], label: 'Other'}

      ]
    },
    {
      title: 'Age Group',
      choices: [
        {name: 'AGE_0-5', values: ['1'], label: 'Under 5 years old'},
        {name: 'AGE_5-24', values: ['1'], label: '5 to 24 years old'},
        {name: 'AGE_25-60', values: ['1'], label: '25 to 60 years old'},
        {name: 'AGE_60+', values: ['1'], label: '60 years old and older'}

      ]
    }
    ,
    {
      title: 'Support for a victim of',
      choices: [
        {
          name: 'INTIMATE_PARTNER_VIOLENCE',
          values: ['1'],
          label: 'Intimate partner violence <a class="filter-info" onClick="$(this).next().slideToggle();">?</a><div class="filter-info">Physical, sexual, psychological, or economic abuse that occurs between a former husband/wife, boyfriend/girlfriend, child\'s mother/father or a partner that someone lives with or used to live with</div>'
        }, {
          name: 'FAMILY_VIOLENCE',
          values: ['1'],
          label: 'Family violence <a class="filter-info" onClick="$(this).next().slideToggle();">?</a><div class="filter-info">Physical, sexual, psychological, or economic abuse that occurs between family members</div>'
        }, {
          name: 'SEXUAL_ASSAULT',
          values: ['1'],
          label: 'Sexual assault'
        }, {
          name: 'VIOLENT_CRIME',
          values: ['1'],
          label: 'Violent crime'
        }, {
          name: 'PROPERTY/FINANCIAL_CRIMES',
          values: ['1'],
          label: 'Property/financial crime'
        }
      ]
    } //"$(this).next().slideToggle())"
  ],
  facilitySearch: {displayField: 'search_label', nameField: 'ORGANIZATION_NAME'},
  decorations: finderDecorations,
  directionsUrl: 'https://maps.googleapis.com/maps/api/js?client=gme-newyorkcitydepartment&channel=pka&sensor=false&libraries=visualization'
});
