import router from "../"
import Cookies from 'js-cookie'


export default function({ next, from, store, dispatch }){
  if(JSON.parse(Cookies.get('KAZIBIN_TOKEN')).auth.token){
    if(!store.state.auth.user.email_verification){
      return next()
    } else {
      store.dispatch('openAlert', {message: 'You have not verified your email, please verify.', code: 'error'})
      store.dispatch('inputRegistrationStep', 2, {root: true})
      router.push('/register')
      return next(false)
    }
  } else {
    return next(false)
  }

  
}