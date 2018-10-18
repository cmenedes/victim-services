nyc.ol.Filters.prototype.addFilter = function(choices) {
  var target = $('<div class="competency"></div>');
  target.insertAfter($('.filter-1'));
  const choice = new nyc.Choice({
    target: $('<div class="competency-choices"></div>'),
    choices: choices
  })
  const collapsible = new nyc.Collapsible({
    target: target,
    title: 'Cultural competencies',
    content: choice.getContainer()
  })
  choice.on('change', $.proxy(this.filter, this));
  this.choiceControls.push(choice);
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
        label: comp
      });
    }
  }
  choices.sort(function(a, b) {
    if (a.label < b.label) return -1;
    if (a.label > b.label) return 1;
    return 0;
  });

  this.filters.addFilter(choices);
  $('.clps h3').trigger('click');
  var reset = $('<button class="btn rad-all reset">Reset</button>').click(function(){
    $.each(finderApp.filters.choiceControls, function() {
      this.val([]);
      this.trigger('change');
    });
  });
  $('#filters').append(reset);
};

new nyc.ol.FinderApp({
  title: '<span class="screen-reader-only">NYC Criminal Justice</span>Victim Services Finder',
  splashOptions: {
    message: $('#splash-content'),
    buttonText: ['Continue to map']
  },
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
        {name: 'AGE_0-5', values: ['1'], label: 'Under 5 years old'},
        {name: 'AGE_5-24', values: ['1'], label: '5 to 24 years old'},
        {name: 'AGE_25-60', values: ['1'], label: '25 to 60 years old'},
        {name: 'AGE_60+', values: ['1'], label: '60 years old and older'}
      ]
    },
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
    },
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
  ],
  facilitySearch: {displayField: 'search_label', nameField: 'ORGANIZATION_NAME'},
  decorations: finderDecorations,
  directionsUrl: 'https://maps.googleapis.com/maps/api/js?client=gme-newyorkcitydepartment&channel=pka&sensor=false&libraries=visualization'
});

var phoneDialog = new nyc.Dialog('phone-dia');
var infoDialog = new nyc.Dialog('info-dia');



// $('#phone-numbers a.call').click(function() {
//   phoneDialog.hide();
// });  

$('#splash-content button').click(function() {
  $('.dia-container.splash').fadeOut();
  phoneDialog.ok({
    message: $('#phone-content'),
    buttonText: ['Close']
  })
});

$('#phn a.btn-phn').click(function() {
  $('.dia-container.splash').fadeOut();
  phoneDialog.ok({
    message: $('#phone-content'),
    buttonText: ['Close']
  })
});

$('#info a.btn-info').click(function() {
  $('.dia-container.splash').fadeOut();
  infoDialog.ok({
    message: $('#info-content'),
    buttonText: ['Close']
  })
});
// $('#map').append($('<div class="phn" role="region" aria-label="For emergencies"><a class="btn-phn btn-sq rad-all" role="button" href="#" title="Emergency Numbers..." aria-pressed="false" aria-controls="share-0"><span class="screen-reader-only">Emergency numbers...</span></a><div class="btns" aria-expanded="false" aria-collapsed="true" id="share-0" style="display: none;"><a class="btn-sq rad-all facebook" role="button" href="https://www.facebook.com/sharer/sharer.php?u=http://localhost:8080/victim-services/src/index.html#" target="_blank" rel="noopener noreferrer" title="Facebook"><span class="screen-reader-only">Facebook</span></a><a class="btn-sq rad-all twitter" role="button" href="https://twitter.com/intent/tweet?text=http://localhost:8080/victim-services/src/index.html# @nycgov&amp;source=webclient" target="_blank" rel="noopener noreferrer" title="Twitter"><span class="screen-reader-only">Twitter</span></a><a class="btn-sq rad-all google" role="button" href="https://plus.google.com/share?url=http://localhost:8080/victim-services/src/index.html#" target="_blank" rel="noopener noreferrer" title="Google+"><span class="screen-reader-only">Google+</span></a><a class="btn-sq rad-all linkedin" role="button" href="http://www.linkedin.com/shareArticle?mini=true&amp;url=http://localhost:8080/victim-services/src/index.html#" target="_blank" rel="noopener noreferrer" title="LinkedIn"><span class="screen-reader-only">LinkedIn</span></a><a class="btn-sq rad-all tumblr" role="button" href="http://www.tumblr.com/share/link?url=http://localhost:8080/victim-services/src/index.html#&amp;name=NYC Pre-K Finder&amp;description=via%20NYC.gov" target="_blank" rel="noopener noreferrer" title="Tumblr"><span class="screen-reader-only">Tumblr</span></a><a class="btn-sq rad-all email" role="button" href="mailto:?subject=NYC Pre-K Finder&amp;body=Locate Pre-K schools%0A%0Ahttp://localhost:8080/victim-services/src/index.html#" title="email"><span class="screen-reader-only">Email</span></a></div></div>'));