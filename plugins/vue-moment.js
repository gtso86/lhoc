import Vue from 'vue'
const moment = require('moment')
require('moment/locale/pt')
require('moment/locale/en-gb')

Vue.use(require('vue-moment'), {
  moment
})
