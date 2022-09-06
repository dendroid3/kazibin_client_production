<template>
  <div class="main-wrapper py-2">
    <v-form class="full-width mt-4 mx-2"
    v-model="valid"
    :lazy-validation="lazy"
    ref="form">
      <p class="backg d-flex justify-center heading">
        Login
      </p>
      <div class="mx-2 px-4">
        <v-text-field 
        outlined
        clearable
        v-model="user.email"
        type="name"
        label="email"
        :rules="rules.emailRules"
        required
        > </v-text-field>  
      </div>
      <div class="mx-2 px-4">
        <v-text-field 
        outlined
        clearable
        v-model="user.pass"
        type="password"
        label="password"
        :disabled="!user.email"
        :rules="rules.passwordRules"
        required
        > </v-text-field>  
      </div>
      <div class="d-flex mb-2 justify-center align-center" v-if="getLoginError">
        <v-icon large class="red--text">
          mdi-alert
        </v-icon>
        {{getLoginError}}
      </div>
      <div class="d-flex justify-center">
        <v-btn 
        :loading="loading"
        small 
        @click="loginUser" 
        class="rounded success submit-button"
        :disabled="!valid">
          login
        </v-btn>
      </div>

      <div class="mx-2 mt-2 d-flex align-center text-center">
        <v-spacer />
        Do not have an account? 
        <v-spacer />
          <v-btn small @click="goRegister" class="success">
            sign up
          </v-btn>
        <v-spacer />
      </div>
    </v-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Login',
  computed:{
    ...mapGetters(['getLoginError'])
  },
  data () {
    return {
      valid: true,
      lazy: false,
      user: {},
      loading: false,
      rules: {
        emailRules: [
          v => !!v || 'Email is required',
          v =>(
            ( (v == null) || (v.length < 6) ) || 
            ( 
              (v.indexOf('@') > 1) && 
              (v.lastIndexOf('.') > v.indexOf('@')) &&
              (v.lastIndexOf('.') < (v.length - 1)) 
            )
          ) || 'Enter valid email'
        ],
      }
    }
  },
  methods: {
    ...mapActions(['login', 'setLoginError']),
    loginUser(){
      this.loading = true
      this.login(this.user).then(res => {
        this.loading = false
      })
    },
    goRegister(){
      this.$router.push('/register')
    }
  },
  mounted(){
    this.setLoginError(null)
  }
}
</script>
<style lang="css" scoped>
  .main-wrapper{
    align-items: center;
  }
</style>