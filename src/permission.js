import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login', '/404'] // no redirect whitelist

router.beforeEach((to, from, next) => { // 跳转之前执行 to 即将进入的路由对象； from 当前导航即将离开的路由； next :function,进行管道中的一个钩子,如果执行完,则导航状态是confirmed; 否则为false, 终止导航
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({path: '/redirect'})
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('Verification failed, please login again' || err)
            next()
          })
        })
      } else {
        next()
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      Message.error('登陆失败或未登录.')
      console.log('No token,' + to.path)
      NProgress.done()
    }
  }
})

router.afterEach(() => { // 跳转之后判断
  NProgress.done() // 结束Progress
})
