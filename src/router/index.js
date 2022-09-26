/*
 * @Author      : Mr.bin
 * @Date        : 2022-07-27 10:39:06
 * @LastEditTime: 2022-09-26 09:58:26
 * @Description : 路由
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  /*
   * 前面加"/"表示绝对路径，不加"/"表示相对路径
   * 一般嵌套路由中的子路由不需要加"/"，它会在父路由后自动加上"/子路由"
   * 比如父 "/father"，子 "child"，要想访问子路由，跳转链接需要写成 "/father/child"
   */

  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout'),
    redirect: '/home',
    children: [
      // 首页
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home'),
        meta: ['首页']
      },
      // 用户
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user'),
        meta: ['用户']
      },
      // 添加用户
      {
        path: 'user-add',
        name: 'user-add',
        component: () => import('@/views/user-add'),
        meta: ['添加用户']
      },
      // 用户信息修改
      {
        path: 'user-edit',
        name: 'user-edit',
        component: () => import('@/views/user-edit'),
        meta: ['用户信息修改']
      },
      // 设置医院名称
      {
        path: 'set-hospital',
        name: 'set-hospital',
        component: () => import('@/views/set/set-hospital'),
        meta: ['设置医院名称']
      },
      // 调零
      {
        path: 'set-zero',
        name: 'set-zero',
        component: () => import('@/views/set/set-zero'),
        meta: ['调零']
      },
      // 设置K
      {
        path: 'set-k',
        name: 'set-k',
        component: () => import('@/views/set/set-k'),
        meta: ['设置K']
      },
      // 开发者
      {
        path: 'set-developer',
        name: 'set-developer',
        component: () => import('@/views/set/set-developer'),
        meta: ['开发者']
      },

      /* 测试模块 */
      // 测试项目选择
      {
        path: 'test-select',
        name: 'test-select',
        component: () => import('@/views/test-mode/select'),
        meta: ['测试项目选择']
      },
      // 测试具体测量
      {
        path: 'test-measure',
        name: 'test-measure',
        component: () => import('@/views/test-mode/measure'),
        meta: ['测试具体测量']
      },
      // 测试项目介绍
      {
        path: 'cvRearProtraction',
        name: 'cvRearProtraction',
        component: () =>
          import('@/views/test-mode/introduce/cvRearProtraction'),
        meta: ['颈椎后伸']
      },
      {
        path: 'cvAnteflexion',
        name: 'cvAnteflexion',
        component: () => import('@/views/test-mode/introduce/cvAnteflexion'),
        meta: ['颈椎前屈']
      },
      {
        path: 'cvRightSide',
        name: 'cvRightSide',
        component: () => import('@/views/test-mode/introduce/cvRightSide'),
        meta: ['颈椎右侧屈']
      },
      {
        path: 'cvLeftSide',
        name: 'cvLeftSide',
        component: () => import('@/views/test-mode/introduce/cvLeftSide'),
        meta: ['颈椎左侧屈']
      },
      {
        path: 'tRearProtraction',
        name: 'tRearProtraction',
        component: () => import('@/views/test-mode/introduce/tRearProtraction'),
        meta: ['躯干后伸']
      },
      {
        path: 'tAnteflexion',
        name: 'tAnteflexion',
        component: () => import('@/views/test-mode/introduce/tAnteflexion'),
        meta: ['躯干前屈']
      },
      {
        path: 'tLeftSide',
        name: 'tLeftSide',
        component: () => import('@/views/test-mode/introduce/tLeftSide'),
        meta: ['躯干左侧屈']
      },
      {
        path: 'tRightSide',
        name: 'tRightSide',
        component: () => import('@/views/test-mode/introduce/tRightSide'),
        meta: ['躯干右侧屈']
      },
      {
        path: 'ulPush',
        name: 'ulPush',
        component: () => import('@/views/test-mode/introduce/ulPush'),
        meta: ['上肢推']
      },
      {
        path: 'ulPull',
        name: 'ulPull',
        component: () => import('@/views/test-mode/introduce/ulPull'),
        meta: ['上肢拉']
      },
      {
        path: 'ulLeftAbducent',
        name: 'ulLeftAbducent',
        component: () => import('@/views/test-mode/introduce/ulLeftAbducent'),
        meta: ['上肢左外展']
      },
      {
        path: 'ulRightAbducent',
        name: 'ulRightAbducent',
        component: () => import('@/views/test-mode/introduce/ulRightAbducent'),
        meta: ['上肢右外展']
      },
      {
        path: 'llAfterLeftOut',
        name: 'llAfterLeftOut',
        component: () => import('@/views/test-mode/introduce/llAfterLeftOut'),
        meta: ['下肢左后伸']
      },
      {
        path: 'llAfterRightOut',
        name: 'llAfterRightOut',
        component: () => import('@/views/test-mode/introduce/llAfterRightOut'),
        meta: ['下肢右后伸']
      },
      {
        path: 'llLeftAbducent',
        name: 'llLeftAbducent',
        component: () => import('@/views/test-mode/introduce/llLeftAbducent'),
        meta: ['下肢左外展']
      },
      {
        path: 'llRightAbducent',
        name: 'llRightAbducent',
        component: () => import('@/views/test-mode/introduce/llRightAbducent'),
        meta: ['下肢右外展']
      },
      {
        path: 'llLeftInsideCollect',
        name: 'llLeftInsideCollect',
        component: () =>
          import('@/views/test-mode/introduce/llLeftInsideCollect'),
        meta: ['下肢左内收']
      },
      {
        path: 'llRightInsideCollect',
        name: 'llRightInsideCollect',
        component: () =>
          import('@/views/test-mode/introduce/llRightInsideCollect'),
        meta: ['下肢右内收']
      }
    ]
  },

  {
    path: '/refresh',
    name: 'refresh',
    component: () => import('@/views/refresh')
  },

  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes,
  /* 自定义路由切换时页面如何滚动 */
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 } // 回到顶部
  }
})
export default router
