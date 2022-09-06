import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Cookies from 'js-cookie'

import store from '../store'
import auth from './middleware/auth'
import middlewarePipeline from './middlewarePipeline'

//This injects the api url removing the need for it to be changed in VueX modules everytime it changes
//the if statement checks whether the user is logged in in order to inject the "Authorization"/"Bearer" token to the HTTP request from the cookie
axios.defaults.baseURL = process.env.VUE_APP_API;

if(Cookies.get('KAZIBIN_TOKEN')){
    
  const datum = JSON.parse(Cookies.get('KAZIBIN_TOKEN')).auth.token;
  let Authorization = "Bearer " + datum
  axios.defaults.headers.common['Authorization'] = Authorization;

} 

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta:{
      middleware: [
        auth
      ]
    }

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
    component: () => import('../views/Dashboard.vue'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Task/Add',
    name: 'AddTask',
    component: () => import('../views/task/Add/Index.vue'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Bid/Chat',
    name: 'BidChat',
    component: () => import('../views/bid/Chat.vue'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Task/Chat',
    name: 'TaskChat',
    component: () => import('../views/task/TaskChat.vue'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Invoice/Create',
    name: 'CreateInvoice',
    component: () => import('../views/CreateInvoice.vue'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Network',
    name: 'Network',
    component: () => import('../views/network/Network.vue'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Tasks/Posted',
    name: 'PostedTasks',
    component: () => import('../views/tasks/Posted'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Tasks/Posted/:filter',
    name: 'FilteredPostedTasks',
    component: () => import('../views/tasks/Posted'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Bids',
    name: 'Bids',
    component: () => import('../views/bid/Bids'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Offers',
    name: 'Offers',
    component: () => import('../views/offer/Offers'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Invoices',
    name: 'Invoice',
    component: () => import('../views/invoice/Invoices'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Invoice/View',
    name: 'InvoiceView',
    component: () => import('../views/invoice/ViewInvoice'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Tasks/Taken',
    name: 'TakenTasks',
    component: () => import('../views/tasks/Taken'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/t/:task_code',
    name: 'ViewTaskForBidding',
    component: () => import('../views/task/ViewTask.vue'),
    // meta:{
    //   middleware: [
    //     auth
    //   ]
    // }
  },
  {
    path: '/Explore/Task',
    name: 'ExploreTasks',
    component: () => import('../views/task/Explore.vue'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Task/Edit',
    name: 'EditTask',
    component: () => import('../views/task/Edit.vue'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Explore/:user_type',
    name: 'ExploreUsertype',
    component: () => import('../views/explore/Users.vue'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Writer/:id',
    name: 'Viewwriter',
    component: () => import('../views/liaison/ViewWriter.vue'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Myprofile',
    name: 'MyProfile',
    component: () => import('../views/profile/MyProfile.vue'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Broker/:id',
    name: 'ViewBroker',
    component: () => import('../views/liaison/ViewBroker.vue'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Invoices',
    name: 'Invoices',
    component: () => import('../views/dashboard/Invoice/View.vue'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Requests',
    name: 'Requests',
    component: () => import('../views/dashboard/Requests/ViewRequests.vue'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Request/Chat',
    name: 'RequestChat',
    component: () => import('../views/dashboard/Requests/Chat.vue'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Offer/Chat',
    name: 'OfferChat',
    component: () => import('../views/offer/Chat.vue'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/Logs',
    name: 'Logs',
    component: () => import('../views/log/Logs.vue'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
   
  {
    path: '/TermsAndConditions',
    name: 'TermsAndConditions',
    component: () => import('../views/TermsAndConditions.vue'),
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
  },

  
  {
    path: '*',
    name: 'PageNotFound',
    component: () => import('../views/PageNotFound.vue'),
    meta:{
      middleware: [
        auth
      ]
    }
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach(( to, from, next) => {
  if(!to.meta.middleware){
      return next()
  } else {
      const middleware = to.meta.middleware

      const context = {
          to, from, next, store
      }

      return middleware[0]({
          ...context,
          next: middlewarePipeline(context, middleware, 1)
      })
  }
})

export default router

