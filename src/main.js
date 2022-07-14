import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/reset.scss'
import './styles/common.scss'

import './permission'

import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

Vue.use(ElementUI)
Vue.config.productionTip = false

/**
 * 动态添加路由没讲
 * 角色管理
 * 菜单管理
 */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
