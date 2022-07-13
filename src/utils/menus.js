/**
 * @author YangLing
 * @date 2022/7/13 10:34
 */

export const filterMenus = (menus) => {
  const newMenus = []

  menus.forEach(item => {
    if (item.children && item.children.length <= 0) {
      return newMenus.push({
        title: item.label,
        path: item.path,
        icon: item.icon
      })
    }

    if (item.children && item.children.length > 0) {
      const data = item.children.filter((child, index) => {
        if (child.children && child.children.length > 0) {
          if (!child.children[index].name) {
            delete child.children[index].children
          }
          return child
        }
      })

      const children = filterMenus(data)
      newMenus.push({
        title: item.label,
        path: item.path,
        icon: item.icon,
        children: children
      })
    }
  })

  return newMenus
}

/**
 * 动态路由添加 不在自定义路由表 --- 将后台返回的数据处理成动态路由所需要的数据
 * tagsview
 * 退出登录
 * 个人设置
 * 菜单的展开与收起
 */
