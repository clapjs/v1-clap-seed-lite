import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    user
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters:{
    platform: state => state.app.platform,
    color: state => state.app.color,
    multiTab: state => state.app.multiTab,
    lang: state => state.app.lang,
    menu: state => state.app.menu,
    user: state => state.user.user,
    userOrgan: state => state.user.userOrgan,
    group: state => state.user.group,
    organ: state => state.user.organ,
  }
})
