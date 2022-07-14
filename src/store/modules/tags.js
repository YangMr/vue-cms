/**
 * @author YangLing
 * @date 2022/7/13 17:08
 */
import { setItem, getItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    tags: getItem('tags') || [{ title: '控制台', path: '/index' }]
  },
  mutations: {
    addTag(state, tag) {
      const hasTag = state.tags.find(item => item.path === tag.path)
      if (!hasTag) {
        state.tags.push(tag)
        setItem('tags', state.tags)
      }
    },
    removeTag(state, index) {
      state.tags.splice(index, 1)
      setItem('tags', state.tags)
    },
    removeAllTag(state) {
      state.tags = [{ title: '控制台', path: '/index' }]
      setItem('tags', state.tags)
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
