import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify';
import mavonEditor from 'mavon-editor'
import 'font-awesome/css/font-awesome.min.css'
import 'mavon-editor/dist/css/index.css'
var SocialSharing = require('vue-social-sharing');

axios.defaults.baseURL = "https://www.lublog.cn:8002/api"
Vue.use(mavonEditor)
Vue.use(VueAxios, axios)
Vue.use(SocialSharing)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
