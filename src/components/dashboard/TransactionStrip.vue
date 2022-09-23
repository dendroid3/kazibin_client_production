<template>
    <div>
        <v-row class="no-gutters col-block pa-2" :class="{
            redlist: transaction.type == 'Credit', 
            greenlist: transaction.type == 'Debit',
        }">
            <v-col class="col-12">
                {{transaction.description}}
            </v-col>
            <v-col class="col-12 d-flex">
                <span class="tiny-bold">
                    {{"Amount " + transaction.type + "ed: " + transaction.amount + " KES"}}
                </span>
                    <v-spacer />
                {{date_created}}
            </v-col>
        </v-row>
    </div>
</template>
<script>

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export default {
    name: 'TransactionStrip',

    props:['transaction'],

    computed:{
        date_created(){
            return dayjs(this.transaction.created_at).format('hh:mm - DD/MM/YYYY')
        },
    },

    created(){
        dayjs.extend(relativeTime)
    }
}
</script>
<style lang="css" scoped>
    .tiny-bold{
        font-weight: 800;
    }
</style>
