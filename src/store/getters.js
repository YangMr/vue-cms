/**
 * @author YangLing
 * @date 2022/7/13 09:02
 */

const getters = {
  token: state => state.user.token,
  hasUserInfo: state => {
    return state.user.userInfo || ''
  },
  hasPermission: state => {
    return (state.user.permission && state.user.menus) || ''
  },
  userInfo: state => state.user.userInfo,
  menus: state => state.user.menus,
  isCollapse: state => state.menu.collapse,
  tags: state => state.tags.tags,
  permission: state => state.user.permission
}

export default getters
