import Vue from 'vue';
import axios from 'axios';
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'
import App from './App';
import store from './store';

Vue.component('icon', Icon)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  template: '<App/>',
}).$mount('#app');
