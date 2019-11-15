import Vue from 'vue'
import Router from 'vue-router'
import CurrentUserService from './core/currentUser'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/chartRoom',
      name: 'chartRoom',
      beforeEnter: (to, form, next) => {
        if (!CurrentUserService.isLogin) {
          next('/login')
        } else {
          next()
        }
      },
      component: () => import('@/views/chartRoom/chartRoom')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login')
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   // ...
//   console.log('debug', to, from)
//   next()
// })

export default router
