// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router/index'
import VueScroller from 'vue-scroller'
import  { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)
import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)

Vue.use(VueScroller)
Vue.use(VueRouter)


FastClick.attach(document.body);

Vue.config.productionTip = false;
let host;
if(process.env.NODE_ENV==='production'){
    host = 'http://123.207.64.210';
}else {
    host = 'http://127.0.0.1:8001';
}
Vue.prototype.host = host;
// router.beforeEach((from,to,next)=>{
//     if(to.name==="landfLunch"){
//         console.log(to)
//     }
//     next()
// })

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
