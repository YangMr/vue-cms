/**
 * @author YangLing
 * @date 2022/7/13 09:02
 */

const getters = {
  token: state => state.user.token,
  hasUserInfo: (state) => {
    return state.user.userInfo || ''
  },
  hasPermission: (state) => {
    return (state.user.permission && state.user.menus) || ''
  },
  menus: state => state.user.menus
}

export default getters
