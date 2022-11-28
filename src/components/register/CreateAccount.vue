<template>
  <div class="main-wrapper py-2">
    <v-row class="no-gutters">
      <v-col class="col-12 pa-4 d-flex justify-center">
        <span @click="goHome">
          <animated-icon style="height:70px;" />
        </span>
      </v-col>
    </v-row>
    <div class="d-flex justify-center pb-4">
      <v-form class="mt-4 mx-2 mb-4 pb-4"
     
      v-model="valid"
      :lazy-validation="lazy"
      ref="form">
        <p class="backg d-flex justify-center heading">
          Create An Account
        </p>
        <div class="mx-2 px-4">
          <v-text-field 
          hint="The username is intended just for the eyes only. It is not neccessary that is unique to you. Kazibin shall assign you a unique code that shall be your identifier on 
                the platform."
          outlined
          clearable
          v-model="user.username"
          type="name"
          label="user name"
          :rules="rules.userNameRules"
          required
          > </v-text-field>  
        </div>
        <div class="mx-2 px-4">
          <v-text-field 
          outlined
          hint="The phone number must be a safaricom number. Your payments will be withdrawn only through this number. You can, however, deposit to pay for your tasks 
                using whatever number you fancy."
          clearable
          v-model="user.phone_number"
          type="number"
          label="phone number"
          :disabled="!user.username"
          :rules="rules.phoneRules"
          required
          >
            <span slot="prepend">
              +254
            </span>
          </v-text-field>  
        </div>
        <div class="mx-2 px-4">
          <v-text-field 
          hint="You must have access to this email address. You shall need to verify it at some point. Password resets will be done through this email and other comminication 
                from Kazibin may be dispensed through this email as well."
          outlined
          clearable
          v-model="user.email"
          type="name"
          label="email"
          :disabled="user.phone_number < 99999999"
          :rules="rules.emailRules"
          required
          > </v-text-field>  
        </div>
        <div class="mx-2 px-4">
          <v-text-field 
          hint="Password must contain at least 8 characters. Kazibin does not care much for this, but for your own security, include both Upper and Lowercases and special characters"
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
        <div class="mx-2 px-4">
            <v-text-field 
            outlined
            clearable
            v-model="user.c_password"
            type="password"
            label="confirm password"
            :rules="rules.c_passwordRules"
            :disabled="!user.pass"
            required
            > </v-text-field>  
        </div>

        <div class="d-flex text-center justify-center mx-2 my-2">
          <span>
            by registering you agree to our<router-link to="/TermsAndConditions" class="text mx-1">terms and conditions </router-link>
          </span>
        </div>

        <div class="d-flex justify-center">
          <v-btn 
          small 
          @click="registerUser" 
          :loading='loading'
          class="rounded success submit-button"
          :disabled="!valid">
            sign up
          </v-btn>
        </div>

        <div class="mx-2 mb-4 pb-4 mt-2 d-flex align-center text-center">
          <v-spacer />
            <span  @click="goLogin" class="pointer blue--text">
              Sign In
            </span>
          <v-spacer />
        </div>

      </v-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import AnimatedIcon from '../widgets/AnimatedIcon.vue'
export default {
  name: 'CreateAccount',
  components:{AnimatedIcon},
  computed:{  },
  data () {
    return {
      valid: true,
      lazy: false,
      user: {},
      rules: {
        userNameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        phoneRules: [
          v => !!v || 'Phone number is required',
          v => (v && v.length <= 15) || 'Name must be less than 15 characters',
        ],
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
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 8 || 'Password is not long enough')
        ],
        c_passwordRules: [
          v => !!v || 'Please confirm password',
          v => (v === this.user.pass) || "Passwords do not match"
        ]
      },
      loading: false
    }
  },
  methods: {
    ...mapActions(['register']),
    registerUser () {
      this.loading = true
      this.register(this.user).then((res) => {
        this.loading = res
      })
    },
    goLogin () {
      this.$router.push('/Login')
    },
    goHelp () {
      this.$router.push('/Help/Register')
    },
    submit(){
      alert(task)
    },
    goHome(){
      if(this.getUser){
        this.$router.push('/')
      } else {
        window.location.href="https://kazibin.adilirealestate.com"
      }
    },
  }
}
</script>
<style lang="css" scoped>
  .main-wrapper{
    padding-bottom: 5rem;
    align-items: center;
  }
</style>
