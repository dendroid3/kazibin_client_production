import router from "../"
import store from '../../store'
import Cookies from 'js-cookie'


export default function({ next, from, store, dispatch }){
  if(Cookies.get('KAZIBIN_TOKEN') && store.getters.getUser.code){
  //   store.dispatch('openAlert', {message: 'You are already logged in as ' + store.getters.getUser.code + " : " + store.getters.getUser.username + ". Logout first to access this page", code: 'error'})
  //   router.push('/dashboard')
  //   console.log(store.getters.getUser)
  //   return next(false)
    return next()

  } else {
    return next()
  }
}