<template lang="html">
  <div class="grey lighten-3">
    <create-account v-if="getRegistrationStep == 1"/>
    <email-verification  v-if="getRegistrationStep == 2"/>
    <create-profile  v-if="getRegistrationStep == 3"/>
  </div>
</template>
<script>
import CreateAccount from '../../components/register/CreateAccount.vue'
import EmailVerification from '../../components/register/EmailVerification.vue'
import CreateProfile from '../../components/register/CreateProfile.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Register',
  components: {CreateAccount, EmailVerification, CreateProfile},
  computed:{
    ...mapGetters(['getRegistrationStep'])
  }
}
</script>
