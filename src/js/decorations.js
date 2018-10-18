var finderDecorations = {
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
  extendFeature: function(){
    var locationKey = this.get('X') + '@' + this.get('Y');
    var count = finderDecorations.countByLocation[locationKey] || 0;
    finderDecorations.countByLocation[locationKey] = count + 1;
    this.locationKey = locationKey;
    this.locationIdx = count;
    this.__prop__=this.getProperties()
    this.set(
      'search_label',
      '<span class="srch-lbl-lg">' + this.get('ORGANIZATION_NAME') + '</span><br>' +
      '<span class="srch-lbl-sm">' + this.get('LOCATION_NAME') + '<span>'
    );
    this.set(
      'other_languages',
      this.get('OTHER_LANGUAGE') !== '' ? '1' : '' 
    );
    this.set(
      'fjc',
      this.get('LOCATION_NAME').toLowerCase().indexOf('family justice center') > -1 ? '1' : ''
    );

    finderDecorations.culturalCompetencies[this.get('CULTURAL_COMPETENCIES_SPECIALIZATIONS')] = true;
  },
  getCountAtLocation: function(){
    return finderDecorations.countByLocation[this.locationKey];
  },
  getAddress1: function(){
    return this.get('ADDRESS_1');
  },
  getBorough: function(){
    return this.get('BOROUGH');
  },
  getCityStateZip: function(){
    return this.get('ADDRESS_2');
  },
  getName: function(){
    return this.get('ORGANIZATION_NAME');
  },
  getPhone: function(){
    return this.get('PHONE');
  },
  getWebsite: function(){
    return this.get('WEBSITE');
  },
  getAccessible: function(){
    return this.get('WHEELCHAIR_ACCESS');
  },
  getFJC: function(){
    return this.get('fjc');
  },
  cssClass: function() {
    return this.get('fjc') ? 'fjc' : '';
  },
  locationHtml: function(){
    var div = $('<div class="location notranslate" translate="no"></div>');
    return div.html(this.get('LOCATION_NAME'));
  },
  nameHtml: function() {
    var classResult = "name no translate";
    if(this.getAccessible()){
      classResult += " accessible";  
    }
    if(this.getFJC()){
      classResult += " fjc";  
    }
    var result = '<h3 class=' + "'" + classResult + "'" +'></h3>';
    return $(result)
      .html(this.getName())
      .add(this.locationHtml());
  },
  phoneHtml: function(button){
    var phone = this.get('PHONE').split(' ')[0].trim();
    if (phone){
      var result;
      var ext = this.get('EXT');
      var readable = ext ? ' ext. ' + ext : '';
      ext = ext.split(' ')[0];
      ext = ext ? ',' + ext : '';
      if (button){
        result = $('<a class="btn rad-all phone notranslate" translate="no" role="button"></a>')
          .attr('href', 'tel:' + phone + ext);
      }else{
        result = $('<span></span>');
      }
      return result.html(phone + readable);
    }
  },
  phoneButton: function(){
    return this.phoneHtml(true);
  },
  detailsHtml: function(){
    var div = $('<div></div>');
    var phone = $('<div class="phone"><b>Phone:</b> </div>')
    return div.append(this.hoursHtml())
      .append(phone.append(this.phoneHtml()))
      .append(this.eligibilityHtml())
      .append(this.servicesHtml())
      .append(this.languagesHtml())
      .append(this.culturalHtml());
  },
  hoursHtml: function(){
    var hrs = $('<div class="hours"></div>');
    hrs.append('<div class="name">Hours of operation:</div>')
      .append('<div>' + this.get('MAIN_HOURS_OF_OPERATION') + '<div>');
    var wkend = this.get('WEEKEND_HOURS_OF_OPERATION');
    if (wkend){
      hrs.append(' (' + wkend + ')');
    }
    return hrs;
  },
  eligibilityHtml: function(){
    var eligibility = this.get('ELIGIBILITY_CRITERIA');
    if (eligibility){
      return $('<div class="eligibility"></div>')
        .append('<div class="name">Eligibility criteria:</div>')
        .append(eligibility);
    }
  },
  servicesHtml: function(){
    var div = $('<div class="services"><div class="name">Services offered:</div></div>');
    return div.append(this.makeList(this.services, this.get('OTHER_SERVICE')));
  },
  languagesHtml: function(){
    var ul = this.makeList(this.languages, this.get('OTHER_LANGUAGE'));
    if (ul.children().length){
      var div = $('<div class="languages"><div class="name">Languages offered:</div></div>');
      if (ul.children().length == this.languages.length && this.get('INTERPRETATION_SERVICE_OFFERED')){
        return div.append('<div>Interpretation service offered</div>');
      }else{
        return div.append(ul);
      }
    }
  },
  culturalHtml: function(){
    var cultural = this.get('CULTURAL_COMPETENCIES_SPECIALIZATIONS');
    if (cultural){
      return $('<div class="cultural"><div class="name">Cultural competency specializations:</div></div>')
        .append('<div>' + cultural + '</div>');
    }
  },
  makeList: function(list, other){
    var me = this, ul = $('<ul></ul>');
    $.each(list, function(){
      if (me.get(this)){
        var li = $('<li></li>').html(this.toLowerCase().replace(/_/g, ' ').replace(/-/g, ' '));
        ul.append(li);
      }
    });
    if (other){
      ul.append('<li>' + other + '</li>');
    }
    return ul;
  }
};

finderDecorations.countByLocation = {};
finderDecorations.culturalCompetencies = {};