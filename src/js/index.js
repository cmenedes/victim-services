import App from './App'
import decorations from './decorations'
import facilityStyle from './facility-style'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'

new App({
  title: '<span class="screen-reader-only">NYC Criminal Justice</span><span>Victim Services Finder</span>',
  splashOptions: {
    message: $('#splash-content'),
    buttonText: ['Screen reader instructions', 'Continue to map']
  },
  geoclientUrl: 'https://maps.nyc.gov/geoclient/v1/search.json?app_key=74DF5DB1D7320A9A2&app_id=nyc-lib-example',
  facilityTabTitle: 'Locations',
  facilityUrl: 'data/facility.csv',
  facilityFormat: new CsvPoint({
    x: 'X',
    y: 'Y',
    dataProjection: 'EPSG:2263'
  }),
  facilityStyle: facilityStyle.pointStyle,
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
          label: 'Intimate partner violence <a class="filter-info" onClick="$(this).next().slideToggle();">?</a><div class="filter-reveal">Physical, sexual, psychological, or economic abuse that occurs between a former husband/wife, boyfriend/girlfriend, child\'s mother/father or a partner that someone lives with or used to live with</div>'
        }, {
          name: 'FAMILY_VIOLENCE',
          values: ['1'],
          label: 'Family violence <a class="filter-info" onClick="$(this).next().slideToggle();">?</a><div class="filter-reveal">Physical, sexual, psychological, or economic abuse that occurs between family members</div>'
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
      title: 'Services Offered',
      choices: [
        {name: 'CASE_MANAGEMENT', values: ['1'], label: 'Case Management'},
        {name: 'CRISIS_INTERVENTION', values: ['1'], label: 'Crisis Intervention'},
        {name: 'LEGAL_SERVICES', values: ['1' ], label: 'Legal Services'},
        {name: 'SAFETY_PLANNING', values: ['1'], label: 'Safety Planning'},
        {name: 'IMMIGRATION_SERVICES', values: ['1'], label: 'Immigration Services' },
        {name: 'EMERGENCY_OR_TRANSITIONAL_SHELTER', values: ['1'], label: 'Emergency or Transitional Shelter'},
        {name: 'PERMANENT_HOUSING', values: ['1'], label: 'Permanent Housing'},
        {name: 'HEALTH_CARE', values: ['1'], label: 'Health Care'},
        {name: 'MENTAL_HEALTH_COUNSELING', values: ['1'], label: 'Mental Health Counseling'},
        {name: 'DRUG_ADDICTION_SCREENING_AND_TREATMENT', values: ['1'], label: 'Drug Addiction Screening and Treatment'},
        {name: 'LANGUAGE_INTERPRETATION', values: ['1'], label: 'Language Interpretation'},
        {name: 'JOB_TRAINING_AND_ECONOMIC_EMPOWERMENT', values: ['1'], label: 'Job Training and Economic Empowerment'},
        {name: 'RESTORATIVE_JUSTICE', values: ['1'], label: 'Restorative Justice'}
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
    }
      
  ],
  facilitySearch: {displayField: 'search_label', nameField: 'ORGANIZATION_NAME'},
  decorations: decorations,
  directionsUrl: 'https://maps.googleapis.com/maps/api/js?&sensor=false&libraries=visualization'
  

})

