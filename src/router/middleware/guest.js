import router from "../"
import store from '../../store'
import Cookies from 'js-cookie'


export default function({ next, from, store, dispatch }){
  if(JSON.parse(Cookies.get('KAZIBIN_TOKEN')).auth.token){
    store.dispatch('openAlert', {message: 'You are already logged in as ' + store.getters.getUser.code + " : " + store.getters.getUser.username + ". Logout first to access this page", code: 'error'})
    router.push('/dashboard')
    return next(false)

  } else {
    return next()
  }
}