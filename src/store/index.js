import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import menu from './modules/menu'
import tags from './modules/tags'
Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    user,
    menu,
    tags
  }
})
