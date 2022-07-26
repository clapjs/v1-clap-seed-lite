import Vue from 'vue'
import {Modal} from "ant-design-vue";
import i18n from '../../i18n'
import config from "../../config/config.default"

const UserStore=Vue.prototype.$cookies?Vue.$cookies:Vue.ls;

const user = {
    state: {
        user: undefined,
        userOrgan:undefined,
        group:undefined,
        organ: undefined,
    },

    mutations: {
        SET_USER: (state, user) => {
            state.user = user
        },
        SET_USER_ORGAN: (state, user) => {
            state.userOrgan = user
        },
        SET_GROUP: (state, group) => {
            state.group = group
        },
        SET_ORGAN: (state, organ) => {
            state.organ = organ
        },
    },
    actions: {
        Logout({commit}) {
            Modal.confirm({
                title: i18n.t('layouts.usermenu.dialog.title'),
                content: i18n.t('layouts.usermenu.dialog.content'),
                onOk: () => {
                    Vue.ls.remove('PACKAGE');
                    Vue.ls.remove('MENU');
                    (Vue.prototype.$cookies?Vue.$cookies:Vue.ls).remove("LOGIN_USER");
                    (Vue.prototype.$cookies?Vue.$cookies:Vue.ls).remove("LOGIN_ORGAN")
                    location.reload();
                }
            })
        },
        SetUser({commit}, user) {
            (Vue.prototype.$cookies?Vue.$cookies:Vue.ls).set('LOGIN_USER', user, config.expires)
            commit('SET_USER', user)
        },
        SetUserOrgan({commit}, userOrgan) {
            (Vue.prototype.$cookies?Vue.$cookies:Vue.ls).set('LOGIN_USER_ORGAN', userOrgan, config.expires)
            commit('SET_USER_ORGAN', userOrgan)
        },
        SetGroup({commit}, group) {
            (Vue.prototype.$cookies?Vue.$cookies:Vue.ls).set('LOGIN_GROUP', group, config.expires)
            commit('SET_GROUP', group)
        },
        SetOrgan({commit}, organ) {
            (Vue.prototype.$cookies?Vue.$cookies:Vue.ls).set('LOGIN_ORGAN', organ, config.expires)
            commit('SET_ORGAN', organ)
        }
    }
};

export default user
