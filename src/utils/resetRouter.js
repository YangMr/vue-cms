/**
 * @author YangLing
 * @date 2022/7/15 15:18
 */

import Router from 'vue-router'
import router, { routes } from '../router'

// 传入当前router
export function resetRouter () {
  const createRouter = () =>
    new Router({
      mode: 'hash',
      routes
    })
  console.log('--', createRouter())
  console.log('---', router)
  // 用初始化的matcher替换当前router的matcher
  router.matcher = createRouter().matcher
}
