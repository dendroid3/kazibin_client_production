import router from "../"
// import store from '../../store'
import Cookies from 'js-cookie'


export default function({ next, from, store, dispatch }){
  if(Cookies.get('KAZIBIN_TOKEN')){
      return next()
  } else {
    store.dispatch('openAlert', {message: 'You are logged out. You need to log in to perform this action, please log in', code: 'error'})
    router.push('/login')
      return next(false)
  }
}