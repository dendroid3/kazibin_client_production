<template>
    <div class="main-wrapper py-2">
        <v-row class="no-gutters">
            <v-col class="col-12 pa-4 d-flex justify-center">
            <span @click="goHome">
                <animated-icon style="height:70px;" />
            </span>
            </v-col>
        </v-row>
        <div class="d-flex justify-center">
        <v-form class=" mt-4 mx-2"
        v-model="valid"
        :lazy-validation="lazy"
        ref="form">
          <p class="backg d-flex justify-center heading">
            Enter New Password
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
          <div class="d-flex justify-center">
            <v-btn 
            :loading="loading"
            small 
            @click="changePassword"
            class="rounded success submit-button"
            :disabled="!valid">
              submit
            </v-btn>
          </div>
  
        </v-form>
      </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import AnimatedIcon from '../../components/widgets/AnimatedIcon.vue';

export default {
    name: 'ResetPassword',

    components:{
        AnimatedIcon
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
            passwordRules: [
                v => !!v || 'Password is required',
                v => (v && v.length >= 8 || 'Password is not long enough')
            ],
            c_passwordRules: [
                v => !!v || 'Please confirm password',
                v => (v === this.user.pass) || "Passwords do not match"
            ]
        }
      }
    },
    
    methods: {
        ...mapActions(['resetPassword']),
        goHome(){
            window.location.href="https://kazibin.adilirealestate.com"
        },

        changePassword(){
            this.loading = true
            const data = {
                email: this.user.email,
                password: this.user.pass,
                token: this.$router.history.current.params.token
            }

            this.resetPassword(data).then(() => (
                this.loading = false
            ))

        }
    }
}
</script>

<style lang="css" scoped>
.main-wrapper{
  align-items: center;
}
</style>
