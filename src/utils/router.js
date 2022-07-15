/**
 * @author YangLing
 * @date 2022/7/15 14:08
 */

export const filterRoutes = (menus) => {
  const newRoutes = []
  menus.forEach(item => {
    if (item.children && item.children.length > 0) {
      item.children.forEach(child => {
        const routes = menuRoutes(child)
        newRoutes.push(routes)
      })
    }
  })
  newRoutes.push({
    path: '*',
    redirect: '/404'
  })
  return newRoutes
}

const menuRoutes = (item) => {
  if (!item.component) {
    return null
  }
  const route = {
    path: item.path,
    name: item.name,
    meta: {
      title: item.label,
      icon: 'el-icon-' + item.icon
    }
  }
  const path = filterFolder(item.component)
  route.component = () => import('../views/' + path + '/index.vue')
  return route
}

const filterFolder = (item) => {
  const index = item.indexOf('/')
  return item.substring(index + 1).toLowerCase()
}
