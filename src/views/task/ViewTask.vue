<template>
    <div class="main-wrapper">
        
        <section v-if="fetching">

            <div style="margin-top: 50px;" class="center">
            </div>

            <v-row class="no-gutters">
                <v-col class="col-4 offset-4">
                <v-progress-linear
                    indeterminate
                    rounded
                    color="blue darken-2"
                    height="5"
                ></v-progress-linear>
                </v-col>
            </v-row>
            <v-row class="no-gutters">
                <v-col class="col-12 blue--text d-flex justify-center darken-2">
                getting task
                </v-col>
            </v-row>

        </section>

        <section v-else>
            <iframe :src="download_url" frameborder="0" class="d-none" v-for="(download_url, i) in download_urls" ::key="i"></iframe>

            <section v-if="getTaskForBidding.broker">
                <v-toolbar 
                    class="pb-4 top-toolbar"
                    text
                    >
                    
                    <div class="d-flex bold pointer" @click="viewBroker">
                        <v-toolbar-title>{{"Broker: " + getTaskForBidding.broker.user.code + ": "}}</v-toolbar-title>
                        <v-toolbar-title class="ml-1">{{getTaskForBidding.broker.user.username}}</v-toolbar-title>
                        <span v-if="getTaskForBidding.broker.user.credential_verification">
                            <v-icon small class="rounded-circle primary-color pa-1 ml-2 white--text">
                                <!-- mdi-check -->
                                mdi-checkbox-marked-circle-outline
                            </v-icon>
                        </span>
                    </div>
                    <v-progress-circular
                        v-if="loading_broker"
                        :size="20"
                        :width="3"
                        color="rgb(15,14,56)"
                        indeterminate
                        class="ml-4"
                    ></v-progress-circular>
                        
                </v-toolbar>

                <section style="margin-top: 4rem;">
                    <v-row class="d-flex mx-4 no-gutters bold">
                        <v-col class="col-12">
                            {{getTaskForBidding.topic}}
                        </v-col>
                    </v-row>

                    <v-row class="d-flex mx-4 no-gutters bold">
                        <v-col class="col-2">
                            {{"Code:  " }}
                        </v-col>
                        <v-col class="col-10">
                            {{getTaskForBidding.code}}
                        </v-col>
                    </v-row>
                    
                    <v-row class="d-flex mx-4 no-gutters bold">
                        <v-col class="col-2">
                            {{"Unit: " }}
                        </v-col>
                        <v-col class="col-10">
                            {{getTaskForBidding.unit}}
                        </v-col>
                    </v-row>
                    
                    <v-row class="d-flex mx-4 no-gutters bold">
                        <v-col class="col-2">
                            {{"Type: " }}
                        </v-col>
                        <v-col class="col-10">
                            {{getTaskForBidding.type}}
                        </v-col>
                    </v-row>

                    <v-row class="d-flex mx-4 no-gutters bold">
                        <v-col class="col-2">
                            {{"Deadline: " }}
                        </v-col>
                        <v-col class="col-10 d-flex align-center">
                        {{getTaskForBidding.expiry_time | diffForHumans}}
                        </v-col>
                        </v-row>

                        <v-row class="d-flex mx-4 no-gutters bold" v-if="getTaskForBidding.page_cost">
                        <v-col class="col-2">
                            {{"Pages: " }}
                        </v-col>
                        <v-col class="col-10">
                        {{page_count}}
                        </v-col>
                    </v-row>

                    <v-row class="d-flex mx-4 no-gutters bold" v-if="getTaskForBidding.page_cost">
                        <v-col class="col-2">
                            {{"CPP: " }}
                        </v-col>
                        <v-col class="col-10">
                            {{"KES " + getTaskForBidding.page_cost}}
                        </v-col>
                    </v-row>

                    <v-row class="d-flex mx-4 no-gutters bold">
                        <v-col class="col-2">
                            {{"Full pay: " }}
                        </v-col>
                        <v-col class="col-10">
                            {{"KES " + getTaskForBidding.full_pay}}
                        </v-col>
                    </v-row>

                    <v-row class="d-flex mx-4 no-gutters bold">
                        <v-col class="col-2">
                            {{"Pay mode: " }}
                        </v-col>
                        <v-col class="col-10">
                            {{pay_mode}}
                        </v-col>
                    </v-row>

                    <v-row class="d-flex mx-4 no-gutters bold">
                        <v-col class="col-2 d-flex align-center">
                            {{"Instructions: "}}
                        </v-col>
                    </v-row>
                    <div class="px-2">
                        <v-card class="d-flex mx-4 white instructions elevated-20 py-4 px-2"> 
                            {{getTaskForBidding.instructions }}
                        </v-card> 
                    </div>
                    
                    <v-row class="d-flex mx-4 no-gutters bold" v-if="getTaskForBidding.files.length > 0">
                        <v-col class="col-2 d-flex align-center">
                            {{"Files: "}}
                        </v-col>
                    </v-row>
                    <div>
                        <v-card class="mx-4 pa-1 rounded mb-1" v-for="file in getTaskForBidding.files" :key="file.id">
                            <v-row class="no-gutters">
                                <v-col class="col-1 d-flex align-center">
                                    <v-icon x-small class="white--text green rounded pa-1">mdi-image</v-icon>
                                </v-col>
                                <v-col class="col-10 d-flex align-center justify-center">
                                {{file.name | refineFileName}}
                                </v-col>
                                <v-col class="col-1 d-flex align-center justify-center">
                                    <v-icon x-small class="white--text green rounded pa-1" @click="download(file)">mdi-arrow-collapse-down</v-icon>
                                </v-col>
                            </v-row>
                        </v-card>
                    </div>

                    <section v-if="getTaskForBidding.broker.id !== getUser.broker.id">

                        <div class="d-flex red--text justify-center text-center mt-4">
                            <h1 style="font-size: 1.5rem;">
                                {{time_left}}
                            </h1>
                        </div>

                        <div class="d-flex justify-center mx-4 my-1">
                            <v-btn small class="elevation-15 submit-button red lighten-2 white--text" style="font-weight: 900;" @click="initiateBid" :loading="bidding" :disabled="bidded">
                                {{ bidded ? 'bid sent' : 'bid'}}
                                {{ getTaskForBidding.verified_only ? '(Verified Only)' : "(Any Writer)" }}
                            </v-btn>
                        </div>

                    </section>

                </section>

            </section>

            <section v-if="!getTaskForBidding.broker">
                <v-row class="no-gutters pt-4 mt-4">
                    <v-col class="col-8 offset-2 pa-4">
                        <v-img class="" :src="require(`../../assets/pageNotFound.svg`)" contain />
                    </v-col>
                    <v-col class="col-8 offset-2 px-4 d-flex justify-center tomato-text bold">
                        {{"Task Unavailable!"}}
                    </v-col>
                    <v-col class="col-8 offset-2 px-4 d-flex text-center justify-center primary-color-text">
                        {{"Go to this page instead to look for other available tasks:"}}
                    </v-col>
                    <v-col class="my-2 px-4 d-flex justify-center col-12">
                        <v-btn small class="mx-1 submit-button white--text" @click="go('/')" style="background-color: tomato;">Home</v-btn>
                    </v-col>
                </v-row>
            </section>

        </section>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export default {
    name: 'ViewTask',
    
    filters:{
        diffForHumans: (date) => {
            
            let ex = dayjs(date).format('DD/M/YY @ hh:mm')
            let today = dayjs(Date.now()).format('DD/M/YY @ hh:mm')

            if(today > ex){return dayjs(date).format('DD/M/YY @ hh:mm') + ' ( Past Deadline! )'}
            return dayjs(date).format('DD/M/YY @ hh:mm') 
        },

        refineFileName: (name) => {
            if(name.length > 10 ){
                return name.substring(0, 10) + '...'
            } else {
                return name.substring(0, name.lastIndexOf('.'))
            }
        },
    },

    computed:{
        ...mapGetters(['getTaskForBidding', 'getUser']),

        page_count(){
            if(this.getTaskForBidding.pages){
                return this.getTaskForBidding.pages + " pages"
            } else {
                return " the whole task"
            }
        },

        pay_mode() {
        switch (this.getTaskForBidding.pay_day) {
            case '1965-05-28 00:00:00':
            return 'paid on delivery.'
            break;
            case '1997-09-17 00:00:00':
            return 'paid on approval'
            break;
        
            default:
            return 'paid on ' + dayjs(this.getTaskForBidding.pay_day).format('DD/MM') + " ( in " +
            dayjs(this.getTaskForBidding.pay_day).fromNow(true) +" ) "

            break;
        }
        },

    },

    data(){
        return {
            fetching: true,
            bidding: false,
            time_left: null,
            bidded: false,
            download_urls: [],
            loading_broker: false
        }
    },
    
    methods:{
        ...mapActions(['fetchTaskForBidding', 'createBid', 'openAlert', 'fetchOneBroker']),
        viewBroker(){
            this.loading_broker = true
            const data = {
                code: this.getTaskForBidding.broker.user.code
            }
            this.fetchOneBroker(data)
        },

        download(file){
            const text = {
                code: 'info',
                message: file.name + " will download soon. If it the download does not start in 10 seconds then you might have slow internet. Please try again. If this persists then call us right away!"
            }

            this.openAlert(text)

            const download_url = process.env.VUE_APP_API + "download?type=task&file_id=" + file.id 
            this.download_urls.push(download_url)

        },

        calculateTimeLeft(){
            
                var countDownDate = new Date(this.getTaskForBidding.expiry_time).getTime();
                var now = new Date().getTime();
                var distance = countDownDate - now;
                
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / (1000));


                var stub_1 = (days > 0) ? days + "d " : ''
                var stub_2 = (hours > 0) ? hours + "h " : ''
                var stub_3 = (minutes > 0) ? minutes + "m " : ''
                var stub_4 = (seconds > 0) ? seconds + "s " :''
                this.time_left = stub_1 + stub_2 +stub_3 +stub_4
        },
        
        go(code){
            this.$router.push(code)
        },

        fetch(){
            const data = {
                task_code: this.$router.history.current.params.task_code
            }
            this.fetchTaskForBidding(data).then((res) => {
                this.fetching = false
                setInterval(() => {
                    this.calculateTimeLeft()
                }, 1000);
            })
        },

        initiateBid(){
            if(this.getTaskForBidding.verified_only) {
                if(!this.getUser.credential_verification){
                const confirmation_to_start_verification_process = "The task owner requires account verification to bid on this task. Please go to your profile settings and complete the verification process. Thank you!"

                if(confirm(confirmation_to_start_verification_process)){
                    this.$router.push('/Verify')
                } 
                return
                }
            }

            let bid_cost = null
            if(parseInt(this.getTaskForBidding.full_pay) <= 1000){
                bid_cost = 10
            } else if((parseInt(this.getTaskForBidding.full_pay) > 1000) && (parseInt(this.getTaskForBidding.full_pay) <= 5000)){
                bid_cost = 20
            } else {
                bid_cost = 30
            }

            let caution = ''
            
            let ex = dayjs(this.getTaskForBidding.expiry_time).format('DD/M/YY @ hh:mm')
            let today = dayjs(Date.now()).format('DD/M/YY @ hh:mm')

            if(ex < today){
                caution = ' You are risking this for the task is already past the deadline.'
            }

            let prompt_message = "You are about to bid on a " + this.getTaskForBidding.unit + " " + this.getTaskForBidding.type +
            " task, code: " + this.getTaskForBidding.code + " worth " + this.getTaskForBidding.full_pay + " KES. This bid costs " + bid_cost +" KES." + caution + " Proceed?"
            if(!confirm(prompt_message)){
                return
            }
            this.bidding = true
            const data = {
                bid_cost: bid_cost,
                task_id: this.getTaskForBidding.id,
                broker_id: this.getTaskForBidding.broker_id
            }
            this.createBid(data).then((res) => {
                this.bidding = false,
                this.bidded = res
            })
        }
    
    },

    created(){
        dayjs.extend(relativeTime)
        this.fetch()

    },
}
</script>
<style lang="css" scoped>
    .main-wrapper{
        height: calc(100vh - 50px);
        overflow-x: scroll;
        position: relative;
        padding-bottom: 5rem;
    }
    .top-toolbar{
        padding-bottom: 5rem; 
        position: absolute; 
        top: 0; 
        right: 0; 
        left: 0;
        z-index: 1;
  }
</style>
