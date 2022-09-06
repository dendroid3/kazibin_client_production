<template lang="html">
    <div>
        <v-row class="d-flex grey lighten-2 px-2 py-4" >
            <v-col class="col-7 primary-color-text title d-flex justify-start pointer"> 
            {{'Writer Metrics '}}
            </v-col>
            <v-col class="col-5 title d-flex justify-end">
                {{getWriterMetrics.writer.average_rating}}
                <v-icon small class="yellow--text" v-for="star in Math.round(getWriterMetrics.writer.average_rating)" :key="star">
                    mdi-star
                </v-icon>
                <v-icon small class="white--text" v-for="star in (5-Math.round(getWriterMetrics.writer.average_rating))" :key="star">
                    mdi-star
                </v-icon>
            </v-col>
        </v-row>
        
        <v-row class="no-gutters grey lighten-3 mt-2">
            <content-tab
            :title="`brokers`"
            :count="getWriterMetrics.brokers_count ? getWriterMetrics.brokers_count : 0"
            />
            <content-tab
            :title="`taken`"
            :count="getWriterMetrics.total_tasks ? getWriterMetrics.total_tasks : 0"
            />
            <content-tab
            :title="`underway`"
            :count="getWriterMetrics.available_tasks ? getWriterMetrics.available_tasks : 0"
            />
            <content-tab
            :title="`cancelled`"
            :count="getWriterMetrics.cancelled_tasks ? getWriterMetrics.cancelled_tasks : 0"
            />
            <content-tab
            :title="`paid`"
            :count="getWriterMetrics.paid_tasks ? getWriterMetrics.paid_tasks : 0"
            />
            <content-tab
            :title="`invoices`"
            :count="getWriterMetrics.invoices_count ? getWriterMetrics.invoices_count : 0"
            />
        </v-row>

    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import ContentTab from '../../components/dashboard/ContentTab.vue';

export default {
    name: 'WriterMetric',
    
    components:{ContentTab},

    computed:{
        ...mapGetters(['getWriterMetrics'])
    },

}
</script>
<style lang="">
    
</style>