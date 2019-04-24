// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from '../node_modules/element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import VueResource from '../node_modules/vue-resource'

import i18n from './lang' // Internationalization
import '@/icons' // icon
// mport '@/permission' // permission control

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(VueResource)

Vue.config.productionTip = false

// 设置全局表单提交格式
Vue.http.options.emulateJSON = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 注册router
  store, // 使用store, 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  i18n,
  render: h => h(App)
})
