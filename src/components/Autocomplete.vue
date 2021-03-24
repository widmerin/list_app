var country_list = _.map(["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"], _.unescape);

class Autocomplete {
  constructor (data) {
    this.data = data;
  }
  
  highlight (string, term) {
    if (term.length === 0) return {name: string, hl: string};
    var regex = new RegExp( '(' + term + ')', 'gi' );
    return {name: string, hl: string.replace(regex, "<span class='hl'>$1</span>" )};
  }
  
  findOccurances(string, term) {
    return string.toLowerCase().split(term.toLowerCase()).length - 1;
  }
  
  get(term, do_highlight, startswith) {
    if (term.length === 0) {
      var sorted = this.data;
    } else {
      var term = term.toLowerCase();
      if (startswith) {
        var data = _.filter(this.data, o => {return o.toLowerCase().startsWith(term)});
      } else {
        var data = _.filter(this.data, o => {return o.toLowerCase().indexOf(term) !== -1});
      }
      var sorted = _.sortBy(data, o => { return -this.findOccurances(o, term) });
    }
    
    if (do_highlight) {
      return _.map(sorted, o => {return this.highlight(o, term)})
    } else {
      return sorted;
    }
  }
  
  setData(data) {
    this.data = data;
  }
  
  getData() {
    return this.data;
  }
}

Vue.component('autocomplete', {
  props: ['cl'],
  template: '<div class="autocomplete"><span>startswith?</span><input type="checkbox"  v-model="startswith"/><span class="input-wrapper autocomplete-search-wrapper placeholder-wrapper"><input class="autocomplete-search placeholder-input" v-model="search" /><span class="placeholder autocomplete-search" v-if="startswith">{{hover}}</span></span><ul class="autocomplete-list"><li v-if="list.length===0">No results found. Try again, asshole.</li><li class="autocomplete-list-element" v-for="elem in list" v-html="elem.hl" @click="e => {search = elem.name;}" @mouseover="e => {if(startswith){search = elem.name.slice(0, search.length);}hover = elem.name;}" @mouseleave="e => {hover = null;}"></li></ul></div>',
  data: function() {
    return {
      search: '',
      placeholder: 'placeholder',
      startswith: true,
      hover: ''
    }
  },
  computed: {
    list: function () {
      this.hover = '';
      return this.cl.get(this.search, true, this.startswith);
    }
  }
});

var country_ac = new Autocomplete(country_list);

var autocomplete = new Vue({
  el: '#autocomplete'
});