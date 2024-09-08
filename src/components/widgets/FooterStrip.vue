<template lang="html">
  <div>
    <div class="primary-color white--text px-4 main-wrapper-local">
      <div class="d-flex">
        <div class="half col-6 d-flex justify-end">
          <ul>
            <li @click="call">+254 705 715 099</li>
            <li @click="sendEmail">admin@kazibin.com</li>
            <li>PAYBILL #: 4115361</li>
          </ul>
        </div>
        <div class="col-6">
          <ul>
            <li>226-10103</li>
            <li>El Shaddai Building</li>
            <li>Mukurwe-ini, Nyeri</li>
          </ul>
        </div>
      </div>
      <div class="d-flex justify-center">
        <a class="link" @click="goToYouTube">
          tutorials
        </a>
        <a class="link" @click="goToAbout">
          about us
        </a>
        <a class="link" @click="goToWhatsApp">
          contact us
        </a>
      </div>
      
      <div class="d-flex justify-center">
        <span class="" >
          made with 
          <v-icon small class="red--text">
            mdi-heart
          </v-icon>
          by
          <a class="white px-1 rounded bold" style="font-size: 0.8rem;" href="http://dehub.dkut.ac.ke">{{`WAZO TANK`}}</a>
        </span>
      </div>
      <div class="d-flex align-center justify-center">
        <span class="mx-4 d-flex align-center" >
          <v-icon small class="white--text">
            mdi-copyright
          </v-icon>
            {{ year }} 
        <router-link to="/TermsAndConditions" class="text mx-4"> T&C apply </router-link>
        </span>
      </div>
      
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FooterStrip',
  computed:{
    ...mapGetters([]),
    year(){
      let date = new Date()
      return date.getFullYear()
      // return '2024'
    }
  },
  methods: {
    alert(){
      alert('hey')
    },
    call(){
        const phone_number = '+254705715099'
        window.location.href = 'tel:' + phone_number;
    },

    sendEmail() {
      let mailtoUri = `mailto:admin@kazibin.com`;

      // Open the email client with the pre-filled information
      window.location.href = mailtoUri;
    },

    goToWhatsApp() {
        // Construct the WhatsApp URL with the phone number and message
        let whatsappUrl = `https://wa.me/+254705715099`;

        // Open WhatsApp with the pre-filled message
        window.open(whatsappUrl);
    },

    goToAbout() {
      this.$router.push('/about')
    },

    goToYouTube() {
      let youTubeURL = 'https://youtube.com/shorts/6dpQwBkc-eY'
        window.open(youTubeURL);
    }
  }
}
</script>
<style lang="css" scoped>
.link{
  text-decoration: underline;
  margin-left:0.3rem;
  margin-right:0.3rem;
}

.half{
  border-right: solid 3px white;
}

.main-wrapper-local{
  padding-bottom: 5rem;
  padding-top: 2rem;
}
</style>
