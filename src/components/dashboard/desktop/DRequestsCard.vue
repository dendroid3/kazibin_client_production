<template>
    <div class="pa-2">
        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr class="grey white--text">
                    <th>{{ "Request Time" }}</th>
                    <th>{{ (option == 'to writers' || option == 'from writers') ? "Writer " : "Broker "}} Code</th>
                    <th>{{ "Username" }}</th>
                    <th>{{ (option == 'to writers' || option == 'from writers') ? "Writer " : "Broker "}} Score</th>
                    <th>Last message </th>
                    <th>Status</th>
                    
                </tr>
            </thead>
            <tbody>

                <tr class="pointer" v-for="request in requests" :key="request.created_at" :class="{
                    'greenlist': request.status < 2,
                    'blacklist': request.status > 2
                }" @click="go(request)">
                    <td class="text-center">{{ request.created_at | diffForHumans  }}</td>
                    <td class="text-center">{{ (option == 'to writers' || option == 'from writers') ? request.writer.code : request.broker.code}}</td>
                    <td class="text-center">{{ (option == 'to writers' || option == 'from writers') ? request.writer.username : request.broker.username}}</td>
                    <td class="text-center">{{ (option == 'to writers' || option == 'from writers') ? request.writer.writer_score : request.broker.broker_score}}</td>
                    <td class="text-center">{{ request.last_message.message }}</td>
                    <td class="text-center">{{ request.status | status }}</td>
                    
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
    name: 'DrequestsCard',

    created(){
        dayjs.extend(relativeTime)
    },

    props: [
        'requests',
        'option'
    ],

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
                return 'unresolved'
                break;

                case 3:
                return 'rejected'
                break

                case 4:
                return 'accepted'
                break

                default:
                break;
            }
        },

    },

  methods: {
    ...mapActions(['setLiaisonRequestChat']),
    go(request){
      this.setLiaisonRequestChat(request)
      this.$router.push('/request/chat')
    },
  }

}
</script>
