<template>
  <div class="about grey lighten-3">
    <v-row class="no-gutters d-flex align-center">
      <v-col class="col-12 d-flex justify-center">
        <h3 class="ml-2 active">ABOUT </h3>
      </v-col>
    </v-row>
    <div class="container d-flex justify-center">
      Kazibin is a freelance academic and article writing platform, which provides clients with the perfect opportunities and jobs.
      We are a dependable platform and partner for professional freelance academic and article writers looking for a trusted and sustainable long-term partnership. We also provide multiple intriguing projects through our other platforms for clients seeking to expand their portfolio. Furthermore, we provide clients with a support team, available round the clock, ready to help you as you continue to work.
      Regardless of the kind of paper or article you need, Kazibin provides you with the best and highest-rated writers. Securing a writer is a simple process and clients can find the writers best suited for their price range. Our price-friendly services work to serve students, SMEs and big firms. We understand students’ needs and requirements as well as SMEs and firms’ marketing needs. Our writers are seasoned professionals who have already helped many other students and written articles for companies depending on the requirements provided by the clients. Regardless of the clients’ location, Kazibin is capable of providing you with the highest quality services. 
      With Kazibin, you can complete all your assignments in your Kazibin account. We provide you with a platform where you can manage all your orders in a private account, communicate with clients directly through a Kazibin chat system and get perfect, plagiarism-free papers by just a few clicks. Let us provide with our services as your dependable partner and enjoy all of our benefits today. 
    </div>
    <v-row class="no-gutters d-flex align-center">
      <v-col class="col-12 d-flex justify-center">
        <h3 class="ml-2 active">FAQs</h3>
      </v-col>
    </v-row>
    <div class="container  pa-0" v-for="(faq, i) in faqs" :key="i">
      <div class="bold pointer px-4" @click="openFaq(i)" :id="faq.id ? faq.id : null">{{faq.question}}</div>
      <div class="pa-4 white rounded mx-2" v-if="open_faq == i">{{faq.answer}}</div>
    </div> <br>
    <span class="bold mx-4 mt-4">Not answered? </span> <br>

    <div class="container d-flex justify-end align-center">
      <textarea class="send-bar d-flex pa-2" :placeholder="`ask us here`"></textarea>
      <div class=" ml-2 green--text">
        <v-icon class="white--text green pa-2">
          mdi-send
        </v-icon>
      </div>
    </div>
    <div class="d-flex justify-center">
      <h3 class="bold active" id="faqs">
        OUR NUMBERS
      </h3>
    </div>
    <div class="d-flex justify-center" style="font-size: 3rem;">
      {{getAboutStatistics.words_written | formatToReadable}}
    </div>
    <div class="d-flex justify-center">
      words writen  
    </div>
    <div class="d-flex justify-center" style="font-size: 3rem;">
      {{getAboutStatistics.tasks_completed | formatToReadable}}  
    </div>
    <div class="d-flex justify-center pb-4">
      tasks completed  
    </div>
    <footer-strip />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import FooterStrip from '../components/widgets/FooterStrip.vue'
export default {
    name: "About",

    metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'About Us',
      // all titles will be injected into this template
      titleTemplate: '%s | kazibin',
      meta: [
        // { 'og:title' : 'now' },
        { property: 'og:title', content: 'An example Vue application with vue-meta.' },
      ]
    },

    filters:{
      formatToReadable(number){
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    computed: {
      ...mapGetters(['getAboutStatistics']),
        options() {
            return {
                duration: 500,
                offset: 0,
                easing: "easeInOutCubic",
            };
        },
    },
    data() {
        return {
          
          faqs: [
            {
              question: 'who can join?',
              answer: 'We are a dependable platform and partner for professional freelance academic and article writers looking for a trusted and sustainable long-term partnership. We also provide multiple intriguing projects through our other platforms for clients seeking to expand their portfolio. Furthermore, we provide clients with a support team, available round the clock, ready to help you as you continue to work',
              id: 'who_can_join'
            },
            
            {
              question: 'how can I join?',
              answer: 'We are a dependable platform and partner for professional freelance academic and article writers looking for a trusted and sustainable long-term partnership. We also provide multiple intriguing projects through our other platforms for clients seeking to expand their portfolio. Furthermore, we provide clients with a support team, available round the clock, ready to help you as you continue to work.',
              id: 'how_to_join'
            },
            
            {
              question: 'why should I join?',
              answer: 'We are a dependable platform and partner for professional freelance academic and article writers looking for a trusted and sustainable long-term partnership. We also provide multiple intriguing projects through our other platforms for clients seeking to expand their portfolio. Furthermore, we provide clients with a support team, available round the clock, ready to help you as you continue to work.',
              id: 'why_join'
            },
            
            {
              question: 'why should I verify my account?',
              answer: 'We are a dependable platform and partner for professional freelance academic and article writers looking for a trusted and sustainable long-term partnership. We also provide multiple intriguing projects through our other platforms for clients seeking to expand their portfolio. Furthermore, we provide clients with a support team, available round the clock, ready to help you as you continue to work.',
              id: 'why_verify'
            },
            
            {
              question: 'who is a broker?',
              answer: 'We are a dependable platform and partner for professional freelance academic and article writers looking for a trusted and sustainable long-term partnership. We also provide multiple intriguing projects through our other platforms for clients seeking to expand their portfolio. Furthermore, we provide clients with a support team, available round the clock, ready to help you as you continue to work.',
              id: 'who_is_a_broker'
            },
            
            {
              question: 'who is a writer?',
              answer: 'We are a dependable platform and partner for professional freelance academic and article writers looking for a trusted and sustainable long-term partnership. We also provide multiple intriguing projects through our other platforms for clients seeking to expand their portfolio. Furthermore, we provide clients with a support team, available round the clock, ready to help you as you continue to work.',
              id: 'who_is_a_writer'
            },
            
            {
              question: "why can't I decide whether to be either?",
              answer: 'We are a dependable platform and partner for professional freelance academic and article writers looking for a trusted and sustainable long-term partnership. We also provide multiple intriguing projects through our other platforms for clients seeking to expand their portfolio. Furthermore, we provide clients with a support team, available round the clock, ready to help you as you continue to work.',
              id: 'why_can_t_I_decide'
            },
            
            {
              question: "do we offer captioning jobs?",
              answer: 'We are a dependable platform and partner for professional freelance academic and article writers looking for a trusted and sustainable long-term partnership. We also provide multiple intriguing projects through our other platforms for clients seeking to expand their portfolio. Furthermore, we provide clients with a support team, available round the clock, ready to help you as you continue to work.',
              id: 'do_we_offer_captioning_jobs'
            },
            
            {
              question: "other processes I need to know of? ",
              answer: 'We are a dependable platform and partner for professional freelance academic and article writers looking for a trusted and sustainable long-term partnership. We also provide multiple intriguing projects through our other platforms for clients seeking to expand their portfolio. Furthermore, we provide clients with a support team, available round the clock, ready to help you as you continue to work.',
              id: 'any_other_processes'
            }
          ],
          open_faq: null
        };
    },
    methods: {
      ...mapActions(['fetchAboutStatistics']),
        tofaqs() {
          this.$nextTick(() => {
            document.getElementById('faqs').scrollIntoView({
              behavior: 'smooth'
            })
          })
        },
        testimonials() {
          this.$vuetify.goTo("#testimonials", this.options);
        },
        openFaq(i){
          if(this.open_faq == i){
            this.open_faq = null
          } else {
            this.open_faq = i
          }
        },
        objectWithIdSimilarToRouterHash(hash) {
          return this.faqs
        }
    },

    created() {
      for (let index = 0; index < this.faqs.length; index++) {
        if((`#${this.faqs[index].id}`) === this.$router.history.current.hash){
          this.openFaq(index)
        }
      }
    },

    components: { FooterStrip },
    mounted(){
      this.fetchAboutStatistics()
    }
}
</script>
<style lang="css" scoped>

  .back{
    background-color: rgb(15,14,56);
  }
  .backg{
    position: relative;
  }
  .active{
    border-bottom: solid 2px #18ffff;
  }
  .backg::after{
    content: '';
    display: inline;
    border-bottom: solid 1px rgb(15,14,56);
    position: absolute;
    bottom: 0;
    width: 80%;
    left: 10%;
  }
  .half{
    border-right: solid 1px white;
  }
 .send-bar{
    height: 3rem;
    /* position: fixed; 
    bottom: 0;  */
    width: 100%;
    background-color: white;
  }
  .send-bar:focus{
    height: 5rem; 
    border: rgb(26, 224, 26) solid 1px;
  }
</style>