<template lang="">
    <div id="invoice" style="min-height: 50vh; font-family: dosis;" v-if="getTaskChatInvoice"
    class="pa-2 grey lighten-1 ma-2 rounded">
        <div class="d-flex justify-end">
            <v-icon
            class="red--text"
            @click="closeInvoice">
                mdi-close
            </v-icon>
        </div>  
        <v-row class="no-gutters">
            <v-col class="col-3">
                <v-img style="height:3rem; width:3rem;" src="https://api.kazibin.adilirealestate.com/icon.svg" contain />
            </v-col>
        </v-row>
        
        <div class="no-gutters d-flex justify-end">
            Mpesa Paybill: 333434  
        </div>
        <div class="no-gutters d-flex justify-end">
            Paypal: pay@kazib.in  
        </div>
        
        <div class="backgr px-2 py-1 rounded mx-3">
            <div class="bold">Invoice code: ##draft##</div>
            <div class="bold">{{"Invoice date: " + date_today}}</div>
        </div>
        <div class="bold px-2 mx-3" v-if="getTaskChatHeader.writer">
            writer: {{this.getTaskChatHeader.writer.user.code + ": " + this.getTaskChatHeader.writer.user.username}}
        </div>
        <div class="bold px-2 mx-3" v-else>
            broker: {{this.getTaskChatHeader.broker.user.code + ": " + this.getTaskChatHeader.broker.user.username}}
        </div>

        <div class="white rounded">
            <v-row class="px-2 no-gutters bold">
                <v-col class="col-3 d-flex justify-center align-center">
                    {{'date'}}
                </v-col>
                <v-col class="col-6 d-flex justify-center align-center">
                    {{'code: topic'}}
                </v-col>
                <v-col class="col-3 d-flex justify-center align-center">
                    {{'amount'}}
                </v-col>
            </v-row>
            
            <v-row class="pl-2 no-gutters">
                <v-col class="col-3 d-flex justify-center align-center">
                    {{task_date}}
                </v-col>
                <v-col class="col-6 d-flex justify-center align-center">
                    {{getTaskChatHeader.code + ": " + getTaskChatHeader.topic}}
                </v-col>
                <v-col class="col-3 d-flex justify-center align-center">
                    {{getTaskChatHeader.full_pay}}
                </v-col>
            </v-row>

            <hr v-if="bonuses[0] || fines[0]">

            <v-row class="pl-2 no-gutters" v-for="(bonus, i) in bonuses" :key="i">
                <v-col class="col-3 d-flex justify-end align-center bold">
                    {{"bonus"}}
                </v-col>
                <v-col class="col-6 d-flex justify-center align-center">
                    {{bonus.description}}
                </v-col>
                <v-col class="col-3 d-flex justify-center align-center">
                    {{bonus.amount}}
                </v-col>
            </v-row>

            <v-row class="pl-2 no-gutters" v-for="(fine, i) in fines" :key="i">
                <v-col class="col-3 d-flex justify-end align-center bold">
                    {{"fine"}}
                </v-col>
                <v-col class="col-6 d-flex justify-center align-center">
                    {{fine.description}}
                </v-col>
                <v-col class="col-3 d-flex justify-center align-center">
                    {{fine.amount}}
                </v-col>
            </v-row>
            
            <hr class="my-2">

            <v-row class="px-2 no-gutters">
            <v-col class="col-3 bold d-flex justify-end align-center">
                sub total
            </v-col>
            <v-col class="col-6 d-flex justify-center align-center">
                --
            </v-col>
            <v-col class="col-3 bold d-flex justify-center align-center">
                {{sub_total}}
            </v-col>
            </v-row>
            
            <v-row class="px-2 no-gutters">
            <v-col class="col-3 bold d-flex justify-end align-center">
                total
            </v-col>
            <v-col class="col-6 d-flex justify-center align-center">
                --
            </v-col>
            <v-col class="col-3 bold d-flex justify-center align-center">
                {{total_amount}}
                <v-menu 
                transition="slide-y-transition"
                bottom
                open-on-hover>
                <template v-slot:activator="{ on, attrs }">
                <v-icon 
                class="mr-1 "
                v-bind="attrs"
                v-on="on">
                    mdi-dots-vertical
                </v-icon>
                </template>
                <v-list>
                    <v-list-item
                    @click="openBonusForm"
                    class="pointer">
                    add bonus
                    </v-list-item>
                    <v-list-item
                    @click="openFineForm"
                    class="pointer">
                    add fine
                    </v-list-item>
                </v-list>
                </v-menu>
            </v-col>
            </v-row>

            <v-row class="pa-2 no-gutters" v-if="bonus_form">
            <v-col class="col-12 bold d-flex justify-center align-center">
                bonus
            </v-col>
            <v-col class="col-12 d-flex justify-center align-center">
                <v-text-field 
                outlined
                v-model="bonus_draft.description"
                clearable
                type="text"
                label="bonus description"
                required
                > </v-text-field>  
            </v-col>
            <v-col class="col-12 d-flex justify-center align-center">
                <v-text-field 
                outlined
                v-model="bonus_draft.amount"
                clearable
                type="number"
                label="amount"
                required
                > </v-text-field>  
            </v-col>
            <v-col class="col-12 d-flex justify-end align-center">
                <v-btn small class="red mr-2" @click="bonus_form = false">
                    cancel
                </v-btn>
                <v-btn small class="green" @click="addBonus">
                    add
                </v-btn>
            </v-col>
            </v-row>
            
            <v-row class="pa-2 no-gutters" v-if="fine_form">
            <v-col class="col-12 bold d-flex justify-center align-center">
                fine
            </v-col>
            <v-col class="col-12 d-flex justify-center align-center">
                <v-text-field 
                outlined
                v-model="fine_draft.description"
                clearable
                type="text"
                label="fine description"
                required
                > </v-text-field>  
            </v-col>
            <v-col class="col-12 d-flex justify-center align-center">
                <v-text-field 
                outlined
                v-model="fine_draft.amount"
                clearable
                type="number"
                label="amount"
                required
                > </v-text-field>  
            </v-col>
            <v-col class="col-12 d-flex justify-end align-center">
                <v-btn small class="red mr-2" @click="fine_form = false">
                    cancel
                </v-btn>
                <v-btn small class="green" @click="addFine">
                    add
                </v-btn>
            </v-col>
            </v-row>
            
        </div>
            
        <div class="d-flex justify-center">
            <v-btn 
            small 
            :loading="creating"
            @click="makeInvoice"
            class="mx-2 mt-3 success white--text">
                make invoice
            </v-btn>
        </div>
        <div class="transparent transparent--text bottom" id="bottom">
            <a href="#bottom" id="bottom_button"></a>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export default {
    name: "CreateInvoice",

    computed:{
        ...mapGetters(['getTaskChatInvoice', 'getTaskChatHeader']),

        task_date(){
            return dayjs(this.getTaskChatHeader.created_at).format('DD/MM/YYYY')
        },

        sub_total(){
            if(this.getTaskChatHeader){
                let total_amount = (this.getTaskChatHeader.full_pay)
                if(this.bonuses[0]){
                this.bonuses.forEach(bonus => {
                    total_amount += Number(bonus.amount)
                });
                }
                return total_amount
            } else {
                return 0
            }
        },
            
        total_amount(){
            if(this.getTaskChatHeader){
                let total_amount = 0
                total_amount += (this.getTaskChatHeader.full_pay)
                if(this.bonuses[0]){
                this.bonuses.forEach(bonus => {
                    total_amount += Number(bonus.amount)
                });
                }
                if(this.fines[0]){
                this.fines.forEach(fine => {
                    total_amount -= Number(fine.amount)
                });
                }
                return total_amount
            } else {
                return 0
            }
        },

        date_today(){
            return dayjs(Date.now()).format('DD/MM/YYYY')
        }
    },

    data(){
        return {
            bonuses: [],
            fines: [],
            bonus_form: false,
            fine_form: false,
            bonus_draft: {},
            fine_draft: {},
            creating: false
        }
    },

    methods: {
        ...mapActions(['toggleTaskChatInvoice', 'createInvoice', 'fetchTaskMessages']),
        closeInvoice(){
            this.toggleTaskChatInvoice(false)
        },

        openBonusForm(){
            this.bonus_form = true
            this.goBottom()
        },

        addBonus(){
            this.bonus_draft.amount = Number(this.bonus_draft.amount)
            this.bonuses.push(this.bonus_draft)
            this.bonus_draft = {}
            this.bonus_form = false
        },

        addFine(){
        this.fine_draft.amount = Number(this.fine_draft.amount)
        this.fines.push(this.fine_draft)
        this.fine_draft = {}
        this.fine_form = false
        },
    
        openFineForm(){
            this.fine_form = true
            this.goBottom()
        },

        goBottom(){
            // this.$vuetify.goTo('#bottom', this.options)
          //   this.$nextTick(() => {
    //     document.getElementById('bottom').scrollIntoView({
    //       behavior: 'smooth'
    //     })
    //   })

        },

        makeInvoice(){
            const confirmation = "You are about to create an invoice for one task \n\n ---" + this.getTaskChatHeader.code + ": " + this.getTaskChatHeader.topic + 
            "\n\nYou could otherwise create a single invoice for all (or a select few) complete tasks from the same writer in the invoices page. To create for this task alone, proceed."
            if(!confirm(confirmation)){
                return
            }
            this.creating = true
            const data = {
                tasks_signature: this.getTaskChatHeader.id + '_',
                bonuses: this.bonuses,
                fines: this.fines,
                writer_id: this.getTaskChatHeader.writer_id,
                broker_id: this.getTaskChatHeader.broker_id,
                amount: this.total_amount
            }
            this.createInvoice(data).then(response => {
                this.creating = false
                const data = {
                    task_id: this.getTaskChatHeader.id
                }
                this.closeInvoice()
                this.fetchTaskMessages(data)
            })
        },
    },

    mounted(){
    },

    
    created(){
        dayjs.extend(relativeTime)
    }
}
</script>
<style lang="css" scoped>
    
  
  .bottom{
    height: 0.1rem;
  }
</style>