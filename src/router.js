import Vue from 'vue'
import Router from 'vue-router'
import CurrentUserService from './core/currentUser'

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
        if (!CurrentUserService.isLogin) {
          next('/login')
        }
        next()
      },
      component: () => import('@/views/dashboard/index')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index')
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   // ...
//   console.log('debug', to, from)
//   next()
// })

export default router
