<template>
    <div class="pa-2">
        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr class="grey white--text">
                    <th>Task Code</th>
                    <th>Topic</th>
                    <th>Unit </th>
                    <th>Deadline</th>
                    <th v-if="page =! 'TaskChat'">Payment</th>
                    <th>Status</th>
                    <th>Info</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="offer in offers" :key="offer.id" class="odd gradeX pa-2 wrapper pointer" @click="startOfferChat(offer)" :class="{
                    redlist: offer.status == 1 || offer.status == 3, 
                    blacklist: offer.status == 2, 
                    greenlist: offer.status == 4, 
                }">
                    <td class="text-center">{{ offer.task.code }}</td>
                    <td class="text-center">{{ offer.task.topic }}</td>
                    <td class="text-center">{{ offer.task.unit }}</td>
                    <td class="text-center">{{ offer.task.expiry_time | diffForHumans}}</td>
                    <td class="text-center"  v-if="page =! 'TaskChat'">
                        <span class="text-center">
                            {{ offer.task.full_pay + " KES" }}
                        </span>
                        <br>
                        <span class="text-center">
                            {{ offer.task | full_pay }}

                        </span> 
                        <br>
                        <span class="text-center">
                            {{ offer.task | mode_of_payment}}
                        </span>
                    </td>
                    <td class="text-center">{{ offer.status | statusName}}</td>
                    <td class="text-center">
                        {{offer.unread_message ? 'New Message' : 'No New Messages'}}
                       
                    </td>

                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { mapActions } from 'vuex'

export default {
    name: 'DOffersCard',

    props: ['offers'],

    filters: {
        diffForHumans: (date) => {
            
            let ex = dayjs(date).format('DD/M/YY @ hh:mm')
            let today = dayjs(Date.now()).format('DD/M/YY @ hh:mm')

            if(today > ex){return dayjs(date).format('DD/M/YY @ hh:mm') + ' ( Past Deadline! )'}
            return dayjs(date).format('DD/M/YY @ hh:mm') 
        },
        statusName: (code) => {
            switch(code) {
                case code = 1:
                    return 'unassigned'
                case code = 2:
                    return 'cancelled'
                case code = 3:
                    return 'rejected'
                case code = 4:
                    return 'accepted'
                default:
                    return null
            }
        },
        
        mode_of_payment(task){
            switch (task.pay_day) {
                case '1997-09-17 00:00:00':
                return ' On approval'
                break;
                
                case '1965-05-28 00:00:00':
                return ' On delivery'
                break;
            
                default:
                return ' In ' + dayjs(task.pay_day).fromNow(true)
                break;
            }
        },      

        full_pay(task){
            if(task.pages == null ){
                return  '( for whole task )'

            } else {
                return ' (' + task.pages + 'x' + task.page_cost + ')'
            }
        },

    },

    data: () => {
        return {
            page: null
        }
    },

    methods:{
        ...mapActions(['setTaskOfferChatHeader']),
    
        startOfferChat(offer){
            this.setTaskOfferChatHeader(offer)
            this.$router.push('/Offer/Chat')
        }
    },

    mounted(){
        console.log(this.page)
    },

    created(){
        dayjs.extend(relativeTime)
    },

}
</script>
<style lang="">
    
</style>