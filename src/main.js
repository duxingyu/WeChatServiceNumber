// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import VueAwesomeSwiper from 'vue-awesome-swiper' //swiper
Vue.use(VueAwesomeSwiper)
import ECharts from 'vue-echarts/components/ECharts.vue' //echarts
Vue.component('chart', ECharts)
import VueScroller from 'vue-scroller' //scroller
Vue.use(VueScroller)

import router from './router' //路由
import store from './store' //vuex
import App from './App'
import './assets/css/main.less'

Vue.config.productionTip = false

/* eslint-disable no-new */
let vm = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})

export default vm