/* different features */

//accessible
  //use for all the getters too

//not accessible

//family justice center

//not family justice center


//phone with extension

//phone without extension

//phone as button

//phone as span


//weekend hours in data


//eligibility criteria in data


//interpretation services + length of language list === created list


//cultural competencies in data

/* accessible feature */
//accessible, phone w/ extension, eligible criteria, interpretation services, cultural competencies, wknd horus

import OlFeature from 'ol/Feature'
import decorations from '../src/js/decorations'
import nyc from 'nyc-lib/nyc'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'

// const accessibleFeature = new OlFeature({
//   ORGANIZATION_NAME: 'Organization',
//   LOCATION_NAME: 'Brooklyn Family Justice Center',
//   ADDRESS_1: '2 Metrotech Center',
//   ADDRESS_2: 'Brooklyn, NY 11201',
//   PHONE: '800-888-8888',
//   EXT: '1111',
//   CASE_MANAGEMENT: 1,
//   CRISIS_INTERVENTION: 1,
//   LEGAL_SERVICES: 1,
//   SAFETY_PLANNING: 1,
//   IMMIGRATION_SERVICES: 1,
//   EMERGENCY_OR_TRANSITIONAL_SHELTER: 1,
//   PERMANENT_HOUSING: 1,
//   HEALTH_CARE: 1,
//   MENTAL_HEALTH_COUNSELING: 1,
//   DRUG_ADDICTION_SCREENING_AND_TREATMENT: 1,
//   LANGUAGE_INTERPRETATION: 1,
//   PUBLIC_BENEFITS: 1,
//   JOB_TRAINING_AND_ECONOMIC_EMPOWERMENT: 1,
//   RESTORATIVE_JUSTICE: 1,
//   OTHER_SERVICE: 'other health services',
//   INTIMATE_PARTNER_VIOLENCE: 1,
//   FAMILY_VIOLENCE: 1,
//   SEXUAL_ASSAULT: 1,
//   VIOLENT_CRIME: 1,
//   'PROPERTY/FINANCIAL_CRIMES': 1,
//   'AGE_0-5': 1,
//   'AGE_5-24': 1,
//   'AGE_25-60': 1,
//   'AGE_60+': 1,
//   ELIGIBILITY_CRITERIA: 'Serves NYC Residents Only',
//   MAIN_HOURS_OF_OPERATION: 'Monday - Friday: 9 am - 5 pm',
//   WEEKEND_HOURS_OF_OPERATION: 'Saturday: 8 am - 8 pm',
//   SPANISH: 1,
//   ARABIC: 1,
//   BENGALI: 1,
//   CHINESE: 1,
//   FRENCH: 1,
//   'HAITIAN-CREOLE': 1,
//   ITALIAN: 1,
//   KOREAN: 1,
//   POLISH: 1,
//   RUSSIAN: 1,
//   URDU: 1,
//   YIDDISH: 1,
//   OTHER_LANGUAGE: '',
//   INTERPRETATION_SERVICE_OFFERED: 1,
//   WHEELCHAIR_ACCESS: 1,
//   REFERRAL_REQUIRED: 'Self-Referral',
//   CULTURAL_COMPETENCIES_SPECIALIZATIONS: 'All Communities',
//   BOROUGH: 'Brooklyn',
//   X: 962810,
//   Y: 173464,
//   WEBSITE: 'http://www.website.org/'
// })

const csvPoint = new CsvPoint({
  x: 'X',
  y: 'Y',
  defaultDataProjection: 'EPSG:2263'
})

const accessibleFeatureSource = {
  ORGANIZATION_NAME: 'Organization',
  LOCATION_NAME: 'Brooklyn Family Justice Center',
  ADDRESS_1: '2 Metrotech Center',
  ADDRESS_2: 'Brooklyn, NY 11201',
  PHONE: '800-888-8888',
  EXT: '1111',
  CASE_MANAGEMENT: 1,
  CRISIS_INTERVENTION: 1,
  LEGAL_SERVICES: 1,
  SAFETY_PLANNING: 1,
  IMMIGRATION_SERVICES: 1,
  EMERGENCY_OR_TRANSITIONAL_SHELTER: 1,
  PERMANENT_HOUSING: 1,
  HEALTH_CARE: 1,
  MENTAL_HEALTH_COUNSELING: 1,
  DRUG_ADDICTION_SCREENING_AND_TREATMENT: 1,
  LANGUAGE_INTERPRETATION: 1,
  PUBLIC_BENEFITS: 1,
  JOB_TRAINING_AND_ECONOMIC_EMPOWERMENT: 1,
  RESTORATIVE_JUSTICE: 1,
  OTHER_SERVICE: 'other health services',
  INTIMATE_PARTNER_VIOLENCE: 1,
  FAMILY_VIOLENCE: 1,
  SEXUAL_ASSAULT: 1,
  VIOLENT_CRIME: 1,
  'PROPERTY/FINANCIAL_CRIMES': 1,
  'AGE_0-5': 1,
  'AGE_5-24': 1,
  'AGE_25-60': 1,
  'AGE_60+': 1,
  ELIGIBILITY_CRITERIA: 'Serves NYC Residents Only',
  MAIN_HOURS_OF_OPERATION: 'Monday - Friday: 9 am - 5 pm',
  WEEKEND_HOURS_OF_OPERATION: 'Saturday: 8 am - 8 pm',
  SPANISH: 1,
  ARABIC: 1,
  BENGALI: 1,
  CHINESE: 1,
  FRENCH: 1,
  'HAITIAN-CREOLE': 1,
  ITALIAN: 1,
  KOREAN: 1,
  POLISH: 1,
  RUSSIAN: 1,
  URDU: 1,
  YIDDISH: 1,
  OTHER_LANGUAGE: '',
  INTERPRETATION_SERVICE_OFFERED: 1,
  WHEELCHAIR_ACCESS: 1,
  REFERRAL_REQUIRED: 'Self-Referral',
  CULTURAL_COMPETENCIES_SPECIALIZATIONS: 'All Communities',
  BOROUGH: 'Brooklyn',
  X: 962810,
  Y: 173464,
  WEBSITE: 'http://www.website.org/'
}
const accessibleFeature = csvPoint.readFeature(accessibleFeatureSource)
nyc.mixin(accessibleFeature, [decorations])



const notAccessibleFeatureSource = {
  ORGANIZATION_NAME: 'Organization 2',
  LOCATION_NAME: 'Organization 2 Center',
  ADDRESS_1: '2 Metrotech Center',
  ADDRESS_2: 'Brooklyn, NY 11201',
  PHONE: '800-888-8888',
  EXT: '',
  CASE_MANAGEMENT: 1,
  CRISIS_INTERVENTION: 1,
  LEGAL_SERVICES: 1,
  SAFETY_PLANNING: 1,
  IMMIGRATION_SERVICES: 1,
  EMERGENCY_OR_TRANSITIONAL_SHELTER: 1,
  PERMANENT_HOUSING: 1,
  HEALTH_CARE: '',
  MENTAL_HEALTH_COUNSELING: 1,
  DRUG_ADDICTION_SCREENING_AND_TREATMENT: '',
  LANGUAGE_INTERPRETATION: 1,
  PUBLIC_BENEFITS: 1,
  JOB_TRAINING_AND_ECONOMIC_EMPOWERMENT: 1,
  RESTORATIVE_JUSTICE: '',
  OTHER_SERVICE: '',
  INTIMATE_PARTNER_VIOLENCE: 1,
  FAMILY_VIOLENCE: '',
  SEXUAL_ASSAULT: 1,
  VIOLENT_CRIME: '',
  'PROPERTY/FINANCIAL_CRIMES': '',
  'AGE_0-5': 1,
  'AGE_5-24': 1,
  'AGE_25-60': 1,
  'AGE_60+': 1,
  ELIGIBILITY_CRITERIA: '',
  MAIN_HOURS_OF_OPERATION: 'Monday - Friday: 9 am - 5 pm',
  WEEKEND_HOURS_OF_OPERATION: '',
  SPANISH: '',
  ARABIC: 1,
  BENGALI: '',
  CHINESE: '',
  FRENCH: '',
  'HAITIAN-CREOLE': '',
  ITALIAN: '',
  KOREAN: '',
  POLISH: '',
  RUSSIAN: '',
  URDU: '',
  YIDDISH: '',
  OTHER_LANGUAGE: '',
  INTERPRETATION_SERVICE_OFFERED: 1,
  WHEELCHAIR_ACCESS: '',
  REFERRAL_REQUIRED: '',
  CULTURAL_COMPETENCIES_SPECIALIZATIONS: '',
  BOROUGH: 'Staten Island',
  X: 962810,
  Y: 173464,
  WEBSITE: 'http://www.aafscny.org/'
}
const notAccessibleFeature = csvPoint.readFeature(notAccessibleFeatureSource)
nyc.mixin(notAccessibleFeature, [decorations])


module.exports = {notAccessibleFeature, accessibleFeature}