import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Cookies from 'js-cookie'
import store from '../store'


//This injects the api url removing the need for it to be changed in VueX modules everytime it changes
//the if statement checks whether the user is logged in in order to inject the "Authorization"/"Bearer" token to the HTTP request from the cookie

axios.defaults.baseURL = process.env.VUE_APP_API;

if (store.getters.getUser.code) {
  const datum = JSON.parse(Cookies.get('KAZIBIN_TOKEN')).auth.token;
  let Authorization = "Bearer " + datum
  console.log(Authorization)
  axios.defaults.headers.common['Authorization'] = Authorization;
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')

  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/auth/Register.vue')
  },
  {
    path: '/email/:email/:email_verification',
    name: 'EmailVerification',
    component: () => import('../components/register/EmailVerification')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/Task/Add',
    name: 'AddTask',
    component: () => import('../views/task/Add/Index.vue')
  },
  {
    path: '/Explore/Task',
    name: 'ExploreTasks',
    component: () => import('../views/task/Explore.vue')
  },
  {
    path: '/Task/Edit',
    name: 'EditTask',
    component: () => import('../views/task/Edit.vue')
  },
  {
    path: '/Explore/Brokers',
    name: 'ExploreBrokers',
    component: () => import('../views/explore/Users.vue')
  },
  {
    path: '/Explore/Writers',
    name: 'ExploreWriters',
    component: () => import('../views/explore/Users.vue')
  },
  {
    path: '/Writer/:id',
    name: 'Viewwriter',
    component: () => import('../views/liaison/ViewWriter.vue')
  },
  {
    path: '/Invoices',
    name: 'Invoices',
    component: () => import('../views/dashboard/Invoice/View.vue')
  },
  {
    path: '/Requests',
    name: 'Requests',
    component: () => import('../views/dashboard/Requests/View.vue')
  },
  {
    path: '/Request/Chat',
    name: 'RequestChat',
    component: () => import('../views/dashboard/Requests/Chat.vue')
  },
  {
    path: '/Logs',
    name: 'Logs',
    component: () => import('../views/dashboard/Log/View.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
