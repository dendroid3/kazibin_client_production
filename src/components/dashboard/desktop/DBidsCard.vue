<template>
    <div class="pa-2">
        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr class="grey white--text">
                    <th>Task Code</th>
                    <th>Topic</th>
                    <th>Broker </th>
                    <th>Deadline</th>
                    <th>Payment</th>
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
                    <td class="text-center">{{ bid.task.code }}</td>
                    <td class="text-center">{{ bid.task.topic }}</td>
                    <td class="text-center">{{ bid.task.broker.user.username }}</td>
                    <td class="text-center">{{ bid.task.expiry_time | diffForHumans }}</td>
                    <td class="text-center">
                        <span>
                            {{ bid.task.full_pay + " KES"}} 
                        </span>
                        <br>
                        <span>
                            {{ bid.task | full_pay }}
                        </span> 
                        <br>
                        <span>
                            {{ bid.task | mode_of_payment}}

                        </span>
                    </td>
                    <td class="text-center">{{ bid.status | status}}</td> 
                    <td class="text-center">{{ bid.unread_message ? "New Message" : "No New Message"}}</td> 
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
    name: 'DBidsCard',

    created(){
        dayjs.extend(relativeTime)
    },

    filters: {
        diffForHumans: (date) => {
            
            let ex = dayjs(date).format('DD/M/YY @ hh:mm')
            let today = dayjs(Date.now()).format('DD/M/YY @ hh:mm')

            if(today > ex){return dayjs(date).format('DD/M/YY @ hh:mm') + ' ( Past Deadline! )'}
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
        ...mapActions(['setBidChatHeader', 'setCurrentBidTask']),
        startBidChat(bid){
        this.setBidChatHeader(bid)
        this.setCurrentBidTask({
            topic: bid.task.topic,
            code: bid.task.code
        })
        this.$router.push('/Bid/Chat')
        }
    },
}
</script>
<style lang="">
    
</style>