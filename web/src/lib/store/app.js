import Vue from 'vue'
const app = {
    state: {
        test: {},
    },
    mutations: {
        TEST: (state, test) => {
            Vue.ls.set('TEST', test);
            state.test = test;
        },
    },
    actions: {
        Test({commit}, test) {
            commit('TEST', test)
        }
    }
};

export default app
