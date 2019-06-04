import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import firebase from 'firebase/app';
import Home from './views/Home.vue'

import store from './store'

import SignIn from '@/components/SignIn.vue'

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
          requiresAuth: false,
      }
    },
     {
      path: '/start',
      name: 'start',
      component: SignIn,
      props: {view: true, app: true},
      meta:{
          requiresAuth: false,
      }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})



router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(to.path == '/signout'){
    store.dispatch('userSignOut')
  }
  else if(to.name == 'start' && currentUser ){
    next('/home')
  }
  
  if (requiresAuth && !currentUser) {  
   next('/start')
  } else if (requiresAuth && currentUser) {
   next()
  } else {
    next()
  // if(to.name == 'root' && this.isAuthenticated){
  //   next('/start'); 
  // }

  }
})

export default router