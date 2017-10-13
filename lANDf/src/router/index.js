import Vue from 'vue'
import Router from 'vue-router'
import lanf from '@/components/LandF/router/index'
import PageTransition from '@/components/LandF/PageTransition'
import axios from 'axios'

Vue.use(Router);
Router.prototype.goBack = function () {
    this.isBack = true;
    this.$router.go(-1)
};

let base = '/landf/';
// if(process.env.NODE_ENV === "production"){
//     base = "/landf/";
// }else {
//     base = "/"
// }
// console.log(base)
const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        return savedPosition
    } else {
        const position = {}
        if (to.hash) {
            position.selector = to.hash
        }
        if (to.matched.some(m => m.meta.scrollToTop)) {

            position.x = 0
            position.y = 0
        }
        return position
    }
}

Vue.prototype.$ajax = axios;
Vue.prototype.$is_login = false;

export default new Router({
    mode: 'history',
    base:base,
    scrollBehavior,
    routes: [
        {
            path: '/',
            name: 'PageTransition',
            component: PageTransition,
            children: [
                ...lanf
            ]
        }
    ]
})
