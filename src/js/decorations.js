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
    const access = this.getAccessible() || 0
    const other = this.get('OTHER_LANGUAGE') || ''
    this.set(
      'search_label',
      `<span class="srch-lbl-lg${access}${this.get('LOCATION_NAME').toLowerCase().indexOf('family justice center') > -1 ? '1' : '0'}">${this.get('ORGANIZATION_NAME')}</span><br>
      <span class="srch-lbl-sm">${this.get('LOCATION_NAME')}</span>`
    )
    this.set(
      'other_languages',
      other !== '' ? '1' : '' 
    )
    this.set(
      'fjc',
      this.get('LOCATION_NAME').toLowerCase().indexOf('family justice center') > -1 ? '1' : ''
    )
    this.getGeometry().containsXY = function(x, y) {
      const coord = this.getCoordinates()
      return coord[0] === x && coord[1] === y
    }
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
  locationHtml() {
    const div = $('<div class="location notranslate" translate="no"></div>')
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
      location.append('<div class="screen-reader-only"> - this is a family justice center</div>')
    }
    return html.add(location)
      
  },
  phoneHtml(button) {
    let phone = this.get('PHONE')
    
    if (phone){
      phone = phone.split(' ')[0].trim()
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
      .append(this.referralHtml())
      .append(this.servicesHtml())
      .append(this.languagesHtml())
      .append(this.culturalHtml())
  },
  hoursHtml() {
    const hours = this.get('MAIN_HOURS_OF_OPERATION')
    let hrsDiv
    if(hours) {
      hrsDiv = $('<div class="hours"></div>')
      hrsDiv.append('<div class="name">Hours of operation:</div>')
        .append(`<div>${hours}<div>`)
    }
    const wkend = this.get('WEEKEND_HOURS_OF_OPERATION')
    if (wkend){
      hrsDiv.append(` (${wkend})`)
    }
    return hrsDiv
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
    const ul = this.makeList(this.services, this.get('OTHER_SERVICE'))
    if (ul.children().length){
      const div = $('<div class="services"><div class="name">Services offered:</div></div>')
      return div.append(ul)
    }
  },
  languagesHtml() {
    const ul = this.makeList(this.languages, this.get('OTHER_LANGUAGE'))
    if (ul.children().length){
      const div = $('<div class="languages"><div class="name">Languages offered:</div></div>')
      return div.append(ul)
    }
  },
  culturalHtml() {
    const cultural = this.get('CULTURAL_COMPETENCIES_SPECIALIZATIONS')
    if (cultural){
      return $('<div class="cultural"><div class="name">Cultural competency specializations:</div></div>')
        .append(`<div>${cultural}</div>`)
    }
  },
  referralHtml() {
    const referral = this.get('REFERRAL_REQUIRED')
    if (referral){
      return $('<div class="referral"><div class="name">Referral required:</div></div>')
        .append(`<div>${referral}</div>`)
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
  countByLocation: {}
}

export default decorations