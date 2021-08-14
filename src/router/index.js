import Vue from "vue"
import Router from 'vue-router'
import Dashboard from '../pages/Dashboard'
import About from '../pages/About'
import Page404 from '../pages/Page404'
import Login from '../pages/Login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Dashboard,
      name: 'Dashboard'
    },
    {
      path: '/dashboard',
      component: Dashboard,
      name: 'Dashboard'
    },
    {
      path: '/dashboard/:page',
      component: Dashboard,
      name: 'Dashboard'
    },
    {
      path: '/:add/payment/:category',
      component: Dashboard,
      name: 'Dashboard'
    },
    {
      path: '/:add/payment/*',
      component: Dashboard,
      name: 'Dashboard'
    },
    {
      path: '/about*',
      component: About,
      name: 'About'
    },
    {
      path: '/404',
      component: Page404,
      name: '404'
    },
    {
      path: '/auth*',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      redirect: '/404'
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


