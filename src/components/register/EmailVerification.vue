<template>
  <div class="pa-4">
    <p class="backg d-flex justify-center heading">
      Verify Email
    </p>
    <v-card
    color="green"
    class="mx-auto"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4 white--text">
          <v-icon large>
            mdi-mail
          </v-icon>
          You've got mail!
        </div>
        <v-list-item-subtitle class="white--text">{{'Email sent to '}}{{getUser.email}} {{'. Access it to go ahead with this process'}}</v-list-item-subtitle>
      </v-list-item-content>

    </v-list-item>

    <v-card-actions class="d-flex justify-space-between">
      <v-btn
        class="blue white--text"
        small
      >
        Already verified
      </v-btn>
      <v-btn
        class="red white--text"
        small
      >
        Resend Email
      </v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>
<script>
import LoaderWidget from '../widgets/LoaderWidget'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'EmailVerification',
  components:{LoaderWidget},
  computed:{
    ...mapGetters(['getUser'])
  },
  methods:{
    ...mapActions(['verifyEmail'])
  },
  mounted(){
    this.verifyEmail()
  }
}
</script>
