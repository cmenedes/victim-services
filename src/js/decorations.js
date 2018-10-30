/**
 * @module victimservices/decorations
 */

const decorations = {
  services: [
    'CASE_MANAGEMENT',
    'CRISIS_INTERVENTION',
    'LEGAL_SERVICES',
    'SAFETY_PLANNING',
    'IMMIGRATION_SERVICES',
    'EMERGENCY_OR_TRANSITIONAL_SHELTER',
    'PERMANENT_HOUSING',
    'HEALTH_CARE',
    'MENTAL_HEALTH_COUNSELING',
    'DRUG_ADDICTION_SCREENING_AND_TREATMENT',
    'LANGUAGE_INTERPRETATION',
    'PUBLIC_BENEFITS',
    'JOB_TRAINING_AND_ECONOMIC_EMPOWERMENT',
    'RESTORATIVE_JUSTICE'
  ],
  languages: [
    'SPANISH',
    'ARABIC',
    'BENGALI',
    'CHINESE',
    'FRENCH',
    'HAITIAN-CREOLE',
    'ITALIAN',
    'KOREAN',
    'POLISH',
    'RUSSIAN',
    'URDU',
    'YIDDISH'
  ],
  extendFeature() {
    const locationKey = `${this.get('X')}@${this.get('Y')}`
    const count = decorations.countByLocation[locationKey] || 0
    decorations.countByLocation[locationKey] = count + 1
    this.locationKey = locationKey
    this.__prop__=this.getProperties()
    this.set(
      'search_label',
      `<span class="srch-lbl-lg">${this.get('ORGANIZATION_NAME')}</span><br>
      <span class="srch-lbl-sm">${this.get('LOCATION_NAME')}</span>`
    )
    this.set(
      'other_languages',
      this.get('OTHER_LANGUAGE') !== '' ? '1' : '' 
    )
    this.set(
      'fjc',
      this.get('LOCATION_NAME').toLowerCase().indexOf('family justice center') > -1 ? '1' : ''
    )

    decorations.culturalCompetencies[this.get('CULTURAL_COMPETENCIES_SPECIALIZATIONS')] = true
  },
  getCountAtLocation() {
    return decorations.countByLocation[this.locationKey]
  },
  getAddress1() {
    return this.get('ADDRESS_1')
  },
  getBorough() {
    return this.get('BOROUGH')
  },
  getCityStateZip() {
    return this.get('ADDRESS_2')
  },
  getName() {
    return this.get('ORGANIZATION_NAME')
  },
  getPhone() {
    return this.get('PHONE')
  },
  getWebsite() {
    return this.get('WEBSITE')
  },
  getAccessible() {
    return this.get('WHEELCHAIR_ACCESS')
  },
  getFJC() {
    return this.get('fjc')
  },
  cssClass() {
    return this.get('fjc') ? 'fjc' : ''
  },
  locationHtml() {
    const div = $('<div class="location notranslate fjc" translate="no"></div>')
    return div.html(this.get('LOCATION_NAME'))
  },
  nameHtml() {
    const html = $(`<h3 class="name notranslate">${this.getName()}</h3>`)
    const location = this.locationHtml()
    if(this.getAccessible()){
      html.addClass('accessible')
      location.append('<div class="screen-reader-only"> - this is a wheelchair accessible facility</div>')
    }
    if(this.getFJC()){
      html.addClass('fjc')
    }
    return html.add(location)
      
  },
  phoneHtml(button) {
    const phone = this.get('PHONE').split(' ')[0].trim()
    if (phone){
      let result
      let ext = this.get('EXT')
      const readable = ext ? ' ext. ' + ext : ''
      ext = ext.split(' ')[0]
      ext = ext ? ',' + ext : ''
      if (button){
        result = $('<a class="btn rad-all phone notranslate" translate="no" role="button"></a>')
          .attr('href', `tel:${phone}${ext}`)
      }else{
        result = $('<span></span>')
      }
      return result.html(phone + readable)
    }
  },
  phoneButton() {
    return this.phoneHtml(true)
  },
  detailsHtml() {
    const div = $('<div></div>')
    const phone = $('<div class="phone"><b>Phone:</b> </div>')
    return div.append(this.hoursHtml())
      .append(phone.append(this.phoneHtml()))
      .append(this.eligibilityHtml())
      .append(this.servicesHtml())
      .append(this.languagesHtml())
      .append(this.culturalHtml())
  },
  hoursHtml() {
    const hrs = $('<div class="hours"></div>')
    hrs.append('<div class="name">Hours of operation:</div>')
      .append(`<div>${this.get('MAIN_HOURS_OF_OPERATION')}<div>`)
    const wkend = this.get('WEEKEND_HOURS_OF_OPERATION')
    if (wkend){
      hrs.append(` (${wkend})`)
    }
    return hrs
  },
  eligibilityHtml() {
    const eligibility = this.get('ELIGIBILITY_CRITERIA')
    if (eligibility){
      return $('<div class="eligibility"></div>')
        .append('<div class="name">Eligibility criteria:</div>')
        .append(eligibility)
    }
  },
  servicesHtml() {
    const div = $('<div class="services"><div class="name">Services offered:</div></div>')
    return div.append(this.makeList(this.services, this.get('OTHER_SERVICE')))
  },
  languagesHtml() {
    const ul = this.makeList(this.languages, this.get('OTHER_LANGUAGE'))
    if (ul.children().length){
      const div = $('<div class="languages"><div class="name">Languages offered:</div></div>')
      if (ul.children().length == this.languages.length && this.get('INTERPRETATION_SERVICE_OFFERED')){
        return div.append('<div>Interpretation service offered</div>')
      }else{
        return div.append(ul)
      }
    }
  },
  culturalHtml() {
    const cultural = this.get('CULTURAL_COMPETENCIES_SPECIALIZATIONS')
    if (cultural){
      return $('<div class="cultural"><div class="name">Cultural competency specializations:</div></div>')
        .append(`<div>${cultural}</div>`)
    }
  },
  makeList(list, other) {
    const ul = $('<ul></ul>')
    list.forEach(item => {
      if(this.get(item)){
        const li = $('<li></li>').html(item.toLowerCase().replace(/_/g, ' ').replace(/-/g, ' '))
        ul.append(li)
      }
    })
    if (other){
      ul.append(`<li>${other}</li>`)
    }
    return ul
  },
  countByLocation: {},
  culturalCompetencies: {}
}

export default decorations