// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router/index'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.use(VueRouter)


FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.host = 'http://localhost:8081'
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
