import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import CLayout from '@/components/CLayout'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login'),
            meta:{needLogin:false}
        },
        {
            path: '/',
            component: CLayout,
            redirect: () => {
                return 'dash'
            },
            children: [
                {name: 'dash', path: '/dash', component: () => import('@/views/dash'),meta:{needLogin:true}},
                {name: 'order', path: '/order', component: () => import('@/views/order'),meta:{needLogin:true}},
            ],
        },
        {
            path: '/404',
            name: '404',
            component: {
                template: `<a-result status="404" title="404" sub-title="抱歉，您访问的页面不存在。"><template #extra><a-button type="primary" @click="handleToHome">返回首页</a-button></template></a-result>`,
                methods: {
                    handleToHome () {
                        this.$router.push({ name: 'dash' })
                    }
                }
            },
            meta:{
                needLogin:false,
            }
        },
    ]
});

router.beforeEach(async (to, from, next) => {
    NProgress.start();
    if(!(Vue.prototype.$cookies?Vue.$cookies:Vue.ls).get('LOGIN_USER')&&to.meta.needLogin){
        Vue.ls.remove('MENU');
        router.replace({name: 'login'})
    }
    next();
});

router.afterEach((to, from) => {
    NProgress.done();
});

router.onReady(async () => {

});

export default router
