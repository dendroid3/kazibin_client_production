import router from "../"
import store from '../../store'


export default function({ next, from, store, dispatch }){
    console.log(store.state.auth)

  if(!store.state.auth.user.email_verification){
      return next()
  } else {
    store.dispatch('openAlert', {message: 'You have not verified your email, please verify.', code: 'error'})
    store.dispatch('inputRegistrationStep', 2, {root: true})
    router.push('/register')
    return next(false)
  }
}