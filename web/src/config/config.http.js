import Vue from 'vue'
import axios from "axios/index";
import NProgress from 'nprogress'
import config from '@/config/config.default'
import store from '../store/index'

axios.defaults.baseURL=config.host;

axios.defaults.withCredentials = true;

axios.defaults.xsrfHeaderName = 'x-csrf-token';

axios.defaults.xsrfCookieName = 'csrfToken';

axios.interceptors.request.use((config) => {

    NProgress.start();

    const LOGIN_USER = store.getters.user === undefined ? '' : store.getters.user;

    if (config.method === 'post') {
        if (LOGIN_USER) {
            if (Array.isArray(config.data)) {
                for (const d of config.data) {
                    d.createdUser = LOGIN_USER
                }
            } else {
                if (config.data) {
                    config.data.createdUser = LOGIN_USER
                }
            }
        }
    } else if (config.method === 'patch' || config.method === 'put') {
        if (LOGIN_USER && config.data) {
            config.data.updateUser = LOGIN_USER
        }
    }

    return config;

}, (error) => {

    return Promise.reject(error);

});

axios.interceptors.response.use((response) => {

    NProgress.done();

    if (response.data.error.code !== '0') {
        Vue.prototype.$notification.error({
            message: response.data.error.code,
            description: response.data.error.message
        });
    }
    return response;

}, (error) => {

    NProgress.done();

    Vue.prototype.$notification.error({
        message: 'error',
        description: error.toString()
    });

    return Promise.reject(error);
});

export default axios;
