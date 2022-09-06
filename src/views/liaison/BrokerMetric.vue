<template lang="html">
    <div>
    
        <v-row class="d-flex grey lighten-2 px-2 py-4" >
            <v-col class="col-7 primary-color-text title d-flex justify-start pointer"> 
            {{'Broker Metrics '}}
            </v-col>
            <v-col class="col-5 title d-flex justify-end">
                {{getBrokerMetrics.broker.broker.average_rating}}
                <v-icon small class="yellow--text" v-for="star in Math.round(getBrokerMetrics.broker.broker.average_rating)" :key="star">
                    mdi-star
                </v-icon>
                <v-icon small class="white--text" v-for="star in (5-Math.round(getBrokerMetrics.broker.broker.average_rating))" :key="star">
                    mdi-star
                </v-icon>
            </v-col>
        </v-row>

        <v-row class="no-gutters grey lighten-3 mt-2">
            <content-tab
            :title="`writers`"
            :count="getBrokerMetrics.writers_count"
            />
            <content-tab
            :title="`posted`"
            :count="getBrokerMetrics.total_tasks"
            />
            <content-tab
            :title="`available`"
            :count="getBrokerMetrics.available_tasks.length"
            />
            <content-tab
            :title="`cancelled`"
            :count="getBrokerMetrics.cancelled_tasks"
            />
            <content-tab
            :title="`paid`"
            :count="getBrokerMetrics.paid_tasks"
            />
            <content-tab
            :title="`invoices`"
            :count="getBrokerMetrics.invoices_count"
            />
        </v-row>
            
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import ContentTab from '../../components/dashboard/ContentTab.vue';

export default {
    name: 'BrokerMetric',

    components:{ContentTab},

    computed:{
        ...mapGetters(['getBrokerMetrics'])
    },

    // data(){
    //     return{
    //     }
    // },

    // methods:{
    //     ...mapActions(['fetchBrokerMetrics']),
    //     boot(){
    //         try{
    //             this.getBrokerMetricsMetrics
    //         } catch(e){

    //         }
    //     }
    // }
}
</script>
<style lang="">
    
</style>