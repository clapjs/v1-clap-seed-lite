import Vue from 'vue'
import store from '@/store/'
import config from '@/config/config.default'
export default ()=> {
    store.dispatch('ToggleColor', Vue.ls.get('COLOR', config.primaryColor))
    store.dispatch('ToggleLang', Vue.ls.get('LANG', config.lang))
    store.dispatch('TogglePlatform', Vue.ls.get('PLATFORM', config.platform))
    store.dispatch('ToggleMultiTab', Vue.ls.get('MULTI_TAB', config.multiTab))
    store.dispatch('ToggleMenu', Vue.ls.get('MENU'), undefined)

    store.commit('SET_USER', (Vue.prototype.$cookies?Vue.$cookies:Vue.ls).get('LOGIN_USER'))
    store.commit('SET_ORGAN', (Vue.prototype.$cookies?Vue.$cookies:Vue.ls).get('LOGIN_ORGAN'))
    store.commit('SET_USER_ORGAN', (Vue.prototype.$cookies?Vue.$cookies:Vue.ls).get('LOGIN_USER_ORGAN'))
}
