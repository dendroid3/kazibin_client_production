import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Cookies from 'js-cookie'

import store from '../store'
import auth from './middleware/auth'
import emailverified from './middleware/emailverified'
import guest from './middleware/guest'
import middlewarePipeline from './middlewarePipeline'

//This injects the api url removing the need for it to be changed in VueX modules everytime it changes
//the if statement checks whether the user is logged in in order to inject the "Authorization"/"Bearer" token to the HTTP request from the cookie
axios.defaults.baseURL = process.env.VUE_APP_API;

console.log('process.env.NODE_ENV')
console.log(process.env.NODE_ENV)

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
        auth, emailverified
      ]
    }

  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/auth/Register.vue'),
    meta:{
      middleware: [
        guest
      ]
    }
  },
  {
    path: '/email/:email/:email_verification',
    name: 'EmailVerification',
    component: () => import('../components/register/EmailVerification')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue'),
    meta:{
      middleware: [
        guest
      ]
    }
  },
  {
    path: '/Verify_email/:email_verification',
    name: 'VerifyEmail',
    component: () => import('../views/auth/VerifyEmail.vue')
  },
  {
    path: '/Password/Reset',
    name: 'PasswordResetApplication',
    component: () => import('../views/auth/PasswordResetApplication.vue')
  },
  {
    path: '/Password/Reset/:token',
    name: 'ResetPassword',
    component: () => import('../views/auth/ResetPassword.vue')
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Verify',
    name: 'Verify',
    component: () => import('../views/verifications/VerifyAccount.vue'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Transactions',
    name: 'Transactions',
    component: () => import('../views/transactions/Transactions.vue'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Task/Add',
    name: 'AddTask',
    component: () => import('../views/task/Add/Index.vue'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Bid/Chat',
    name: 'BidChat',
    component: () => import('../views/bid/Chat.vue'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Task/Chat',
    name: 'TaskChat',
    component: () => import('../views/task/TaskChat.vue'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Invoice/Create',
    name: 'CreateInvoice',
    component: () => import('../views/CreateInvoice.vue'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Network',
    name: 'Network',
    component: () => import('../views/network/Network.vue'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Tasks/Posted',
    name: 'PostedTasks',
    component: () => import('../views/tasks/Posted'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Tasks/Posted/:filter',
    name: 'FilteredPostedTasks',
    component: () => import('../views/tasks/Posted'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Bids',
    name: 'Bids',
    component: () => import('../views/bid/Bids'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Offers',
    name: 'Offers',
    component: () => import('../views/offer/Offers'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Invoices',
    name: 'Invoice',
    component: () => import('../views/invoice/Invoices'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Invoice/View',
    name: 'InvoiceView',
    component: () => import('../views/invoice/ViewInvoice'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Tasks/Taken',
    name: 'TakenTasks',
    component: () => import('../views/tasks/Taken'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/t/:task_code',
    name: 'ViewTaskForBidding',
  component: () => import('../views/task/ViewTask.vue'),
  },
  {
    path: '/Explore/Task',
    name: 'ExploreTasks',
    component: () => import('../views/task/Explore.vue'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Task/Edit',
    name: 'EditTask',
    component: () => import('../views/task/Edit.vue'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Explore/:user_type',
    name: 'ExploreUsertype',
    component: () => import('../views/explore/Users.vue'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Writer/:id',
    name: 'Viewwriter',
    component: () => import('../views/liaison/ViewWriter.vue'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Myprofile',
    name: 'MyProfile',
    component: () => import('../views/profile/MyProfile.vue'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Broker/:id',
    name: 'ViewBroker',
    component: () => import('../views/liaison/ViewBroker.vue'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Invoices',
    name: 'Invoices',
    component: () => import('../views/dashboard/Invoice/View.vue'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Requests',
    name: 'Requests',
    component: () => import('../views/dashboard/Requests/ViewRequests.vue'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Request/Chat',
    name: 'RequestChat',
    component: () => import('../views/dashboard/Requests/Chat.vue'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Offer/Chat',
    name: 'OfferChat',
    component: () => import('../views/offer/Chat.vue'),
    meta:{
      middleware: [
        auth, emailverified
      ]
    }
  },
  {
    path: '/Logs',
    name: 'Logs',
    component: () => import('../views/log/Logs.vue'),
    meta:{
      middleware: [
        auth, emailverified
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
        auth, emailverified
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

