import Vue from 'vue'
import config from '@/config/config.default'
import 'nprogress/nprogress.css'
import '@/components/global.less'

import '@/core/uses/antd_use';
import VueCookies from 'vue-cookies'

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import VueStorage from 'vue-ls'
Vue.use(VueStorage, config.storageOptions);

import { IconPark } from '@icon-park/vue/es/all'

Vue.component('c-icon', IconPark)

if(config.platform==='web'){
    Vue.use(VueCookies)
}
