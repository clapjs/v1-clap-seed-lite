import Vue from 'vue'
import {updateTheme} from "@/components/ToggleColor";
import {loadLanguageAsync} from '@/i18n'
import router from '../../router'

const app = {
    state: {
        uid: '',
        theme: '',
        color: '',
        menu: {
            key: 'dash'
        },
        multiTab: true,
        lang: 'zh-CN',
        platform:'web'
    },
    mutations: {
        TOGGLE_LANG: (state, color) => {
            Vue.ls.set('LANG', color);
            state.lang = color;
        },
        TOGGLE_COLOR: (state, color) => {
            Vue.ls.set('COLOR', color);
            state.color = color;
        },
        TOGGLE_MULTI_TAB: (state, bool) => {
            Vue.ls.set('MULTI_TAB', bool);
            state.multiTab = bool
        },
        TOGGLE_MENU: (state, menu) => {
            Vue.ls.set('MENU', menu);
            state.menu = menu
        },
        TOGGLE_PLATFORM: (state, platform) => {
            Vue.ls.set('PLATFORM', platform);
            state.platform = platform
        }
    },
    actions: {
        ToggleColor({commit}, color) {
            commit('TOGGLE_COLOR', color);
            updateTheme(color);
        },
        ToggleMultiTab({commit}, bool) {
            commit('TOGGLE_MULTI_TAB', bool)
        },
        TogglePlatform({commit}, platform) {
            commit('TOGGLE_PLATFORM', platform)
        },
        ToggleMenu({commit}, menu) {
            if(menu){
                commit('TOGGLE_MENU', menu);
                document.title = 'clap.js-'+ menu.title
                router.push({
                    name: menu.routeName
                });
            }
        },
        ToggleLang({commit}, lang) {
            return new Promise((resolve, reject) => {
                commit('TOGGLE_LANG', lang)
                loadLanguageAsync(lang).then(() => {
                    resolve()
                }).catch((e) => {
                    reject(e)
                })
            })
        }
    }
};

export default app
