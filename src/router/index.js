/*
 * @Author      : Mr.bin
 * @Date        : 2022-07-27 10:39:06
 * @LastEditTime: 2022-12-23 15:27:49
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
      // 导出所选用户的数据（测试、训练、......）
      {
        path: 'user-data-output',
        name: 'user-data-output',
        component: () => import('@/views/user-data-output'),
        meta: ['导出所选用户的数据']
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
      // 数据迁移
      {
        path: 'set-data-migration',
        name: 'set-data-migration',
        component: () => import('@/views/set/set-data-migration'),
        meta: ['数据迁移']
      },

      /* 测试模块 */
      // 测试-项目选择
      {
        path: 'test-select',
        name: 'test-select',
        component: () => import('@/views/test-mode/select'),
        meta: ['测试项目选择']
      },
      // 测试-具体测量
      {
        path: 'test-measure',
        name: 'test-measure',
        component: () => import('@/views/test-mode/measure'),
        meta: ['测试具体测量']
      },
      // 测试-项目介绍
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
      },

      /* 训练模块 */
      // 训练-部位选择
      {
        path: 'train-position',
        name: 'test-position',
        component: () => import('@/views/train-mode/position'),
        meta: ['训练-部位选择']
      },
      // 训练-项目介绍
      {
        path: 'train-cvRearProtraction',
        name: 'train-cvRearProtraction',
        component: () =>
          import('@/views/train-mode/introduce/cvRearProtraction'),
        meta: ['颈椎后伸']
      },
      {
        path: 'train-cvAnteflexion',
        name: 'train-cvAnteflexion',
        component: () => import('@/views/train-mode/introduce/cvAnteflexion'),
        meta: ['颈椎前屈']
      },
      {
        path: 'train-cvRightSide',
        name: 'train-cvRightSide',
        component: () => import('@/views/train-mode/introduce/cvRightSide'),
        meta: ['颈椎右侧屈']
      },
      {
        path: 'train-cvLeftSide',
        name: 'train-cvLeftSide',
        component: () => import('@/views/train-mode/introduce/cvLeftSide'),
        meta: ['颈椎左侧屈']
      },
      {
        path: 'train-tRearProtraction',
        name: 'train-tRearProtraction',
        component: () =>
          import('@/views/train-mode/introduce/tRearProtraction'),
        meta: ['躯干后伸']
      },
      {
        path: 'train-tAnteflexion',
        name: 'train-tAnteflexion',
        component: () => import('@/views/train-mode/introduce/tAnteflexion'),
        meta: ['躯干前屈']
      },
      {
        path: 'train-tLeftSide',
        name: 'train-tLeftSide',
        component: () => import('@/views/train-mode/introduce/tLeftSide'),
        meta: ['躯干左侧屈']
      },
      {
        path: 'train-tRightSide',
        name: 'train-tRightSide',
        component: () => import('@/views/train-mode/introduce/tRightSide'),
        meta: ['躯干右侧屈']
      },
      {
        path: 'train-ulPush',
        name: 'train-ulPush',
        component: () => import('@/views/train-mode/introduce/ulPush'),
        meta: ['上肢推']
      },
      {
        path: 'train-ulPull',
        name: 'train-ulPull',
        component: () => import('@/views/train-mode/introduce/ulPull'),
        meta: ['上肢拉']
      },
      {
        path: 'train-ulLeftAbducent',
        name: 'train-ulLeftAbducent',
        component: () => import('@/views/train-mode/introduce/ulLeftAbducent'),
        meta: ['上肢左外展']
      },
      {
        path: 'train-ulRightAbducent',
        name: 'train-ulRightAbducent',
        component: () => import('@/views/train-mode/introduce/ulRightAbducent'),
        meta: ['上肢右外展']
      },
      {
        path: 'train-llAfterLeftOut',
        name: 'train-llAfterLeftOut',
        component: () => import('@/views/train-mode/introduce/llAfterLeftOut'),
        meta: ['下肢左后伸']
      },
      {
        path: 'train-llAfterRightOut',
        name: 'train-llAfterRightOut',
        component: () => import('@/views/train-mode/introduce/llAfterRightOut'),
        meta: ['下肢右后伸']
      },
      {
        path: 'train-llLeftAbducent',
        name: 'train-llLeftAbducent',
        component: () => import('@/views/train-mode/introduce/llLeftAbducent'),
        meta: ['下肢左外展']
      },
      {
        path: 'train-llRightAbducent',
        name: 'train-llRightAbducent',
        component: () => import('@/views/train-mode/introduce/llRightAbducent'),
        meta: ['下肢右外展']
      },
      {
        path: 'train-llLeftInsideCollect',
        name: 'train-llLeftInsideCollect',
        component: () =>
          import('@/views/train-mode/introduce/llLeftInsideCollect'),
        meta: ['下肢左内收']
      },
      {
        path: 'train-llRightInsideCollect',
        name: 'train-llRightInsideCollect',
        component: () =>
          import('@/views/train-mode/introduce/llRightInsideCollect'),
        meta: ['下肢右内收']
      },
      // 训练-类型选择
      {
        path: 'train-select',
        name: 'train-select',
        component: () => import('@/views/train-mode/select'),
        meta: ['训练-类型选择'],
        redirect: '/train-select/feedback-set',
        children: [
          // 反馈训练
          {
            path: 'feedback-set',
            name: 'feedback-set',
            component: () => import('@/views/train-mode/select/feedback'),
            meta: ['反馈训练']
          },
          // 肌耐力训练
          {
            path: 'muscular-endurance-set',
            name: 'muscular-endurance-set',
            component: () =>
              import('@/views/train-mode/select/muscular-endurance'),
            meta: ['肌耐力训练']
          },
          // 肌肥大训练
          {
            path: 'muscular-hypertrophy-set',
            name: 'muscular-hypertrophy-set',
            component: () =>
              import('@/views/train-mode/select/muscular-hypertrophy'),
            meta: ['肌肥大训练']
          }
        ]
      },
      // 训练-具体测量
      {
        path: 'train-measure',
        name: 'train-measure',
        component: () => import('@/views/train-mode/measure'),
        meta: ['训练-具体测量']
      },

      /* 数据记录 */
      // 测试
      {
        path: 'test-record',
        name: 'test-record',
        component: () => import('@/views/record/test'),
        meta: ['测试-数据记录']
      },

      // 训练
      {
        path: 'train-record',
        name: 'train-record',
        component: () => import('@/views/record/train'),
        meta: ['训练-数据记录'],
        redirect: '/train-record/feedback-record',
        children: [
          // 反馈训练
          {
            path: 'feedback-record',
            name: 'feedback-record',
            component: () => import('@/views/record/train/feedback'),
            meta: ['反馈训练']
          },
          // 肌耐力训练
          {
            path: 'muscular-endurance-record',
            name: 'muscular-endurance-record',
            component: () => import('@/views/record/train/muscular-endurance'),
            meta: ['肌耐力训练']
          },
          // 肌肥大训练
          {
            path: 'muscle-hypertrophy-record',
            name: 'muscle-hypertrophy-record',
            component: () => import('@/views/record/train/muscle-hypertrophy'),
            meta: ['肌肥大训练']
          }
        ]
      }
    ]
  },

  /* 测试报告 */
  // 测试报告-打印
  {
    path: '/test-print',
    name: 'test-print',
    component: () => import('@/views/test-mode/print'),
    meta: ['测试报告-打印']
  },
  // 长期趋势测试报告-打印
  {
    path: '/secular-trend-print',
    name: 'secular-trend-print',
    component: () => import('@/views/test-mode/secular-trend-print'),
    meta: ['长期趋势测试报告-打印']
  },

  /* 训练报告 */
  // 训练报告-导出PDF
  {
    path: '/train-pdf',
    name: 'train-pdf',
    component: () => import('@/views/train-mode/pdf'),
    meta: ['训练-导出PDF']
  },

  {
    path: '/refresh',
    name: 'refresh',
    component: () => import('@/views/refresh'),
    meta: ['刷新中转页']
  },
  {
    path: '/refresh-special',
    name: 'refresh-special',
    component: () => import('@/views/refresh-special'),
    meta: ['刷新中转页-测试模块专用']
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
