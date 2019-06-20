import Vue from 'vue'
import App from './App'

import store from './store'
import api from './api/api.js'
import HTTP from './common/http.js'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$http = HTTP

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
