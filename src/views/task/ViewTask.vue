<template lang="html">
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
            <section v-if="getTaskForBidding.broker">
                <v-toolbar 
                    class="pb-4"
                    flat
                    style="padding-bottom: 5rem; position: fixed; top: 50px; right: 0; left: 0;">
                    
                    <div class="d-flex bold">
                        <v-toolbar-title>{{"Broker: " + getTaskForBidding.broker.user.code + ": "}}</v-toolbar-title>
                        <v-toolbar-title class="ml-1">{{getTaskForBidding.broker.user.username}}</v-toolbar-title>
                    </div>

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
                        <v-col class="col-2 d-flex align-center">
                            {{"Instructions: "}}
                        </v-col>
                    </v-row>
                    <div class="px-2">
                        <v-card class="d-flex mx-4 white instructions elevated-20 py-4 px-2"> 
                            {{getTaskForBidding.instructions }}
                        </v-card> 
                    </div>
                    
                    <v-row class="d-flex mx-4 no-gutters bold">
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
                                    <v-icon x-small class="white--text green rounded pa-1">mdi-arrow-collapse-down</v-icon>
                                </v-col>
                            </v-row>
                        </v-card>
                    </div>

                    <v-row class="d-flex mx-4 no-gutters bold">
                        <v-col class="col-4">
                            {{"Deadline: " }}
                        </v-col>
                        <v-col class="col-8 d-flex align-center">
                        {{getTaskForBidding.expiry_time | diffForHumans}}
                        </v-col>
                        </v-row>

                        <v-row class="d-flex mx-4 no-gutters bold" v-if="getTaskForBidding.page_cost">
                        <v-col class="col-4">
                            {{"Pages: " }}
                        </v-col>
                        <v-col class="col-8">
                        {{page_count}}
                        </v-col>
                    </v-row>

                    <v-row class="d-flex mx-4 no-gutters bold" v-if="getTaskForBidding.page_cost">
                        <v-col class="col-4">
                            {{"CPP: " }}
                        </v-col>
                        <v-col class="col-8">
                            {{"KES " + getTaskForBidding.page_cost}}
                        </v-col>
                    </v-row>

                    <v-row class="d-flex mx-4 no-gutters bold">
                        <v-col class="col-4">
                            {{"Full pay: " }}
                        </v-col>
                        <v-col class="col-8">
                            {{"KES " + getTaskForBidding.full_pay}}
                        </v-col>
                    </v-row>

                    <v-row class="d-flex mx-4 no-gutters bold">
                        <v-col class="col-4">
                            {{"Pay mode: " }}
                        </v-col>
                        <v-col class="col-8">
                            {{pay_mode}}
                        </v-col>
                    </v-row>

                    <div class="d-flex red--text justify-center text-center mt-4">
                        <h1 style="font-size: 1.5rem;">
                            {{time_left}}
                        </h1>
                    </div>

                    <div class="d-flex justify-center mx-4 my-1" >
                        <v-btn small class="elevation-15 submit-button red lighten-2 white--text" style="font-weight: 900;" @click="initiateBid" :loading="bidding">
                            Bid Now!
                        </v-btn>
                    </div>

                </section>

            </section>

            <section v-else>
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
                    <v-col class="my-2 px-4 d-flex justify-center ">
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
            if(date > Date.now()){return 'past deadline'}
            return dayjs(date).format('DD/M/YY @ hh:mm') 
        },
        refineFileNameMessage: (name) => {
            if(name.length > 10 ){
                return name.substring(0, 10) + '...'
            } else {
                return name.substring(0, name.lastIndexOf('.'))
            }
        },
    },

    computed:{
        ...mapGetters(['getTaskForBidding']),

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

    methods:{
        ...mapActions(['fetchTaskForBidding', 'createBid']),

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
            let prompt_message = "You are about to bid on " + this.getTaskForBidding.unit + " " + this.getTaskForBidding.type +
            " task, code: " + this.getTaskForBidding.code + " worth " + this.getTaskForBidding.full_pay + " KES. Proceed?"
            if(!confirm(prompt_message)){
                return
            }
            this.bidding = true
            const data = {
                task_id: this.getTaskForBidding.id
            }
            this.createBid(data).then(() => {
                this.bidding = false
            })
            // this.bidding = false
        }
    
    },

    data(){
        return {
            fetching: true,
            bidding: false,
            time_left: null
        }
    },

    
    created(){
        dayjs.extend(relativeTime)
    },

    mounted(){
        this.fetch()
    }
}
</script>
<style lang="css" scoped>
    .main-wrapper{
        height: calc(100vh - 50px);
        overflow-x: scroll;
        padding-bottom: 5rem;
    }
</style>