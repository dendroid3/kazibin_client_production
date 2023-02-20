<template>
    <div class="pa-2">
        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr class="grey white--text">
                    <th>{{ network_option == 'writers' ? "Writer "  : "Broker " + "Code" }}</th>
                    <th>Username</th>
                    <th>Contacts </th>
                    <th>Tasks</th>
                    <th>Total Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="network in networks" :key="network.id" class="odd text-center gradeX pa-2 wrapper pointer" @click="getNetwork(network)">
                    <td class="text-center">
                        <v-progress-circular
                        v-if="loading_writer"
                        :size="20"
                        :width="3"
                        color="rgb(15,14,56)"
                        indeterminate
                        class="ml-4"
                    ></v-progress-circular>
                        {{ network.code }}
                    </td>
                    <td class="text-center">{{ network.username }}</td>
                    <td class="text-center">
                        <ul>
                            <li>
                                {{ network.email }}
                            </li>
                            <li>
                                {{ "+254 " + network.phone_number }}
                            </li>
                        </ul>
                    </td>
                    <td class="text-center">{{ network.tasks_done ? network.tasks_done : 0 }}</td>
                    <td class="text-center"> <strong>{{ network.total_amount ? network.total_amount + ' KES': 0 }}</strong></td>
                    
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
    name: 'DNetwordCard',

    created(){
        dayjs.extend(relativeTime)
    },

    filters: {
        diffForHumans: (date) => {
            
            let ex = dayjs(date).format('DD/M/YY @ hh:mm')
            let today = dayjs(Date.now()).format('DD/M/YY @ hh:mm')

            if(today > ex){return dayjs(date).format('DD/M/YY @ hh:mm') + ' ( Past Deadline! )'}
            return dayjs(date).format('DD/M/YY @ hh:mm') 
        }

    },

    props: ["network_option", "networks"],

    data: () => {
        return {
            loading_writer: false
        }
    },
    
    methods: {
        ...mapActions(['setViewMyBrokerDetails', 'getMyBroker']),
        getNetwork(network){
            this.loading_writer = true

            if(this.network_option == 'writers'){
                this.getMyWriter(network).then((res) => {
                    this.loading_writer = false
                })
            } else if(this.network_option == 'brokers') {
                this.setViewMyBrokerDetails(network)
                this.$router.push('/m/broker/' + network.code)
            } else {
                this.loading_writer = false
            }

       }
    },
}
</script>
<style lang="">
    
</style>