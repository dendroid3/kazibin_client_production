<template>
    <div>
        <table class="table table-striped table-bordered table-hover" v-if="bids.length > 0">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Time </th>
                    <th>Status</th>
                    <th>Info</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="bid in bids" :key="bid.id" class="odd gradeX pa-2 wrapper pointer" :class="{
                    'redlist': bid.status === 1 || bid.status === 3,
                    'greenlist': bid.status === 4,
                    'blacklist': bid.status === 2 || bid.status === 5
                }"
                @click="startBidChat(bid)">
                    <td class="text-center">{{ bid.writer.user.code }}</td>
                    <td class="text-center">{{ bid.writer.user.username }}</td>
                    <td class="text-center">{{ bid.writer.user.writer_score }}</td>
                    <td class="text-center">{{ bid.created_at | diffForHumans }}</td>
                    <td class="text-center">{{ bid.status | status}}</td> 
                    <td class="text-center">{{ bid.last_message[0].read_at ? "No New Message" : "New Message"}}</td> 
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
 name: 'DBidsTable',
 created(){
        dayjs.extend(relativeTime)
    },

    filters: {
        diffForHumans: (date) => {
            
            let ex = dayjs(date).format('DD/M/YY @ hh:mm')
            let today = dayjs(Date.now()).format('DD/M/YY @ hh:mm')

            if(today > ex){return dayjs(date).format('DD/M/YY @ hh:mm')}
            return dayjs(date).format('DD/M/YY @ hh:mm') 
        },
        status(status){
            switch (status) {
                case 1:
                return 'Unassigned'
                break;

                case 2:
                return 'Pulled'
                break
                
                case 3:
                return 'Rejected'
                break

                case 4:
                return 'Won'
                break

                case 5:
                return 'Lost'
                break
                break

                default:
                return 'Unassigned'
                break;
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
                return task.full_pay + ' KES for whole task'

            } else {
                return '( ' + task.pages + 'x' + task.page_cost + ' )'
            }
        },

    },

    props: ["bids"],
    
    methods: {
        ...mapActions(['setBidChatHeader']),
        startBidChat(bid){
        this.setBidChatHeader(bid)
        this.$router.push('/Bid/Chat')
        }
    },   
}
</script>
<style lang="">
    
</style>