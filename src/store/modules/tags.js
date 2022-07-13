/**
 * @author YangLing
 * @date 2022/7/13 17:08
 */
export default {
  namespaced: true,
  state: {
    tags: [{ title: '控制台', path: '/index' }]
  },
  mutations: {
    addTag(state, tag) {
      state.tags.push(tag)
    },
    removeTag(state, index) {
      state.tags = state.tags.splice(index, 1)
    },
    removeAllTag(state) {
      state.tags = [{ title: '控制台', path: '/index' }]
    }
  },
  actions: {
    addTag({ commit }, tag) {
      commit('addTag', tag)
    },
    removeTag({ commit }, index) {
      commit('removeTag', index)
    },
    removeAllTag({ commit }) {
      commit('removeAllTag')
    }
  }
}
