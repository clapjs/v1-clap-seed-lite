import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './i18n'
import moment from 'moment'

import './core/uses'
import bootstrap from './core/bootstrap'
import config from './config/config.default'
import http from './config/config.http'
import url from './config/config.url'

import * as helper from './utils/helper'

Vue.prototype.$config = config;
Vue.prototype.$http = http;
Vue.prototype.$url = url;
Vue.prototype.$moment = moment;
Vue.prototype.$helper = helper;
Vue.prototype.$electron=undefined;
// Vue.prototype.$electron=require('electron');

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    created: bootstrap,
    render: h => h(App),
}).$mount('#app');
