<template>
    <div class="pa-2">
        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr class="grey white--text">
                    <th>Task</th>
                    <th>Broker</th>
                    <th>Deadline</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Info</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in tasks" :key="task.id" class="odd gradeX pa-2 wrapper pointer" @click="startChat(task)" :class="{
                redlist: task.status == 1, 
                purplelist: task.status == 2, 
                greenlist: task.status == 3, 
                yellowlist: task.status == 4,
                blacklist: task.status == 5,
                orangelist: task.status == 6 || task.status == 8,
                }">
                    <td class="text-center">
                        {{ "code: " + task.code }} <br>
                        {{ "topic: " + task.topic }} <br>
                        {{ "unit: " + task.unit }} 
                    </td>
                    <td class="text-center">
                        {{ task.broker.user.code + ": " + task.broker.user.username  }} 
                    </td>
                    
                    <td class="text-center">{{ task.expiry_time | diffForHumans}}</td>
                    <td class="text-center">
                        <span class="text-center">
                            {{ task.full_pay + " KES" }}
                        </span>
                        <br>
                        <span class="text-center">
                            {{ task | full_pay }}

                        </span> 
                        <br>
                        <span class="text-center">
                            {{ task | mode_of_payment}}
                        </span>
                    </td>
                    <td class="text-center">{{ task.status | status}}</td>
                    <td class="text-center">
                        <span v-if="task.bids">
                            {{ task.bids.length + " Bids" }}
                            <br>
                        </span> 
                        <span v-if="task.offers">
                            {{ task.offers.length + " Offers" }}
                            <br>
                        </span> 
                        <span>
                            {{ task.unread_message ? "New Message" : "No New Message" }}
                        </span> 
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
    name: 'DTakenCard',

    props: ['tasks'],

    created(){
        dayjs.extend(relativeTime)
    },

    props: [
        'tasks'
    ],

    filters: {
        unread_message(task){
        let unread = 'No New Messages'
        if(task.status == 1){
            task.bids.forEach(bid => {
                if(bid.unread_message){
                    unread = 'New Message'
                }
            });
            task.offers.forEach(offer => {
                if(offer.unread_message){
                    unread = "New Message"
                }
            });
        }
        return unread
        },

        diffForHumans: (date) => {
            
            let ex = dayjs(date).format('DD/M/YY @ hh:mm')
            let today = dayjs(Date.now()).format('DD/M/YY @ hh:mm')

            if(today > ex){return dayjs(date).format('DD/M/YY @ hh:mm') + ' ( Past Deadline! )'}
            return dayjs(date).format('DD/M/YY @ hh:mm') 
        },

        status(status){
            switch (status) {
                case 1:
                return 'unassigned'
                break;

                case 2:
                return 'underway'
                break
                
                case 3:
                return 'complete'
                break

                case 4:
                return 'cancelled'
                break

                case 5:
                return 'invoiced'
                break

                case 6:
                return 'paid'
                break

                case 8:
                return 'paid (unconfirmed)'
                break

                default:
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
                return  '( for whole task )'

            } else {
                return ' (' + task.pages + 'x' + task.page_cost + ')'
            }
        },

    },

    
  computed:{
   
  },

  methods: {
    ...mapActions(['setTaskChatHeader', 'deleteTask', 'fetchAllPostedByMe', 'fetchDashboardDetails']),
    startChat(task){
      if(task.difficulty){
        this.setTaskChatHeader(task)
        this.$router.push('/Task/Chat')
      } else {
        const confirmation = "You failed to complete the process of adding this task. If it was the last one that you added then go to post task to complete the process. Otherwise you must delete it. Press OK to delete it. \n Proceed?"
        if(!confirm(confirmation)){return}
        const data = {
          task_id: task.id
        }
        this.deleteTask(data).then(res => (
          this.fetchDashboardDetails(),
          this.fetchAllPostedByMe()
        ))
      }
     
    }
  }

}
</script>
<style lang="css" scoped>
    
</style>