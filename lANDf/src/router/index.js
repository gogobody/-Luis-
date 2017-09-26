import Vue from 'vue'
import Router from 'vue-router'
import lanf from '@/components/LandF/router/index'
import PageTransition from '@/components/LandF/PageTransition'
import axios from 'axios'

Vue.use(Router)
Router.prototype.goBack = function () {
    this.isBack = true
    window.history.go(-1)
}
Vue.prototype.$ajax = axios;
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'PageTransition',
            component: PageTransition,
            children: [
                ...lanf
            ]
        }]
})
