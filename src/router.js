import Vue from 'vue'
import Router from 'vue-router'
// import CurrentUserService from './core/currentUser'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      beforeEnter: (to, form, next) => {
        if (!store.state.isLogin) {
          next('/login')
        }
        next()
      },
      component: () => import('@/views/dashboard/index')
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: (to, form, next) => {
        if (store.state.isLogin) {
          next('/dashboard')
        }
        next()
      },
      component: () => import('@/views/login/index')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/error-page/404'),
      hidden: true
    },
    {
      path: '/401',
      name: '401',
      component: () => import('@/views/error-page/401'),
      hidden: true
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
  ]
})

// router.beforeEach((to, from, next) => {
//   // ...
//   console.log('debug', to, from)
//   next()
// })

export default router
