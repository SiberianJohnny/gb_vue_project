import Vue from "vue"
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName:"Login" */'../pages/Login'),
      name: 'Login'
    },
    {
      path: '/dashboard',
      component: () => import(/* webpackChunkName:"Dashboard" */'../pages/Dashboard'),
      name: 'Dashboard'
    },
    {
      path: '/dashboard/:page',
      component: () => import(/* webpackChunkName:"Dashboard" */'../pages/Dashboard'),
      name: 'Dashboard'
    },
    {
      path: '/:add/payment/:category',
      component: () => import(/* webpackChunkName:"Dashboard" */'../pages/Dashboard'),
      name: 'Dashboard'
    },
    {
      path: '/:add/payment/*',
      component: () => import(/* webpackChunkName:"Dashboard" */'../pages/Dashboard'),
      name: 'Dashboard'
    },
    {
      path: '/about*',
      component: () => import(/* webpackChunkName:"About" */'../pages/About'),
      name: 'About'
    },
    {
      path: '/calc*',
      component: () => import(/* webpackChunkName:"Calculator" */'../pages/Calc'),
      name: 'Calculator'
    },
    {
      path: '/404',
      component: () => import(/* webpackChunkName:"404" */'../pages/Page404'),
      name: '404'
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName:"404" */'../pages/Page404'),
    }
  ]
})

const isAuth = true;

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuth) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

const getTitleByRouteName = routeName => {
  return {
    'Dashboard': 'Dashboard',
    'About': 'About',
    'Login': 'Login',
    '404': '404 Not Found'
  }[routeName]
}

router.afterEach((to) => {
  document.title = getTitleByRouteName(to.name)

})

export default router


