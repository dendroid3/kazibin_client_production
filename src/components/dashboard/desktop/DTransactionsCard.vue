<template>
    <div class="pa-2">
        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr class="grey white--text">
                    <th>Transaction Date</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in transactions" :key="transaction.id" class="odd gradeX pa-2 wrapper pointer"  :class="{
                    redlist: transaction.type == 'Credit', 
                    greenlist: transaction.type == 'Debit',
                }">
                    <td class="text-center">
                        {{ transaction.created_at | date_created }} 
                    </td>
                    <td> {{ transaction.description }} </td>
                    <td class="text-center">{{ transaction.type }}</td>
                    <td class="text-center">{{ transaction.amount }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export default {
    name: 'DTransactionsCard',

    props: ['transactions'],

    filters: {
        date_created(created_at){
            return dayjs(created_at).format('hh:mm - DD/MM/YYYY')
        },
    },
    
    created(){
        dayjs.extend(relativeTime)
    }
}
</script>
<style lang="">
    
</style>