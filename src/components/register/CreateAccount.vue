<template>
  <div class="main-wrapper py-2">
    <v-form class="full-width mt-4 mx-2"
    v-model="valid"
    :lazy-validation="lazy"
    ref="form">
      <p class="backg d-flex justify-center heading">
        Create An Account
      </p>
      <div class="mx-2 px-4">
        <v-text-field 
        hint="The username is intended just for the eyes only. It is not neccessary that is unique to you. Kazibin shall assign you a unique code that shall be your identifier on the platform."
        outlined
        clearable
        v-model="user.username"
        type="name"
        label="user name"
        :rules="rules.UserNameRules"
        required
        > </v-text-field>  
      </div>
      <div class="mx-2 px-4">
        <v-text-field 
        outlined
        hint="The phone number must be a safaricom number. Your payments will be withdrawn only through this number. You can, however, deposit to pay for your tasks using whatever number you fancy."
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
        hint="You must have access to this email address. You shall need to verify it at some point. Password resets will be done through this email and other comminication from Kazibin may be dispensed through this email as well."
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
          :rules="[matchpasswordRule]"
          :disabled="!user.pass"
          required
          > </v-text-field>  
      </div>

      <div class="d-flex text-center mx-2">
        <span>by registering you agree to our  <a href="http://192.168.61.51:8000/storage/Kazibin terms and conditions.pdf"> terms and conditions </a></span>
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
      <div class="d-flex justify-center mt-2">
        <v-btn 
        small 
        @click="goHelp" 
        class="rounded grey red--text submit-button">
          learn more
        </v-btn>
      </div>

      <div class="mx-2 mt-2 d-flex align-center text-center">
        <v-spacer />
        Already have an account? 
        <v-spacer />
          <v-btn small @click="goLogin" class="success">
            login
          </v-btn>
        <v-spacer />
      </div>
    </v-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'CreateAccount',
  computed:{
    matchpasswordRule(){
      return  this.user.password === this.user.c_password  || 'Your Passwords Do NOT Match!'
    }
  },
  data () {
    return {
      valid: true,
      lazy: false,
      user: {},
      rules: {
        UserNameRules: [
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
      console.log(this.user)
    },
    goLogin () {
      this.$router.push('/Login')
    },
    goHelp () {
      this.$router.push('/Help/Register')
    },
    submit(){
      alert(task)
    }
  }
}
</script>
<style lang="css" scoped>
  .main-wrapper{
    align-items: center;
  }
</style>
