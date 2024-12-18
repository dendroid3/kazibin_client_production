<template>
    <div class=" lighten-4 d-flex align-center my-4 justify-center" 
    style="position: fixed; z-index: 999; top: 0; right: 0; bottom: 0; min-width: 25rem; left: 0;">
        <div class="grey px-4 py-2 -2 rounded">
            <div class="d-flex justify-end">
                <v-icon class="py-4 red--text" @click="$emit('closePopUp')">
                    mdi-close
                </v-icon>
            </div>
            <div class="subtitle primary-color-text d-flex">
                {{ title }}
            </div>

            <section v-if="why_is_pop_up_open == 'extend_deadline'">
                <div class="mb-1 subtitle primary-color-text d-flex justify-center"
                v-if="!due_date">
                    Select Date
                </div>
                <v-text-field 
                clearable
                v-if="due_date && due_time"
                outlined
                type="name"
                :value="due_refined"
                @change="clearEntries"
                label="due time"
                required
                > </v-text-field>  
                <div class="mb-4 d-flex justify-center">
                    <v-date-picker
                    v-if="!due_date"
                    color="green lighten-1"
                    format="24hr"
                    v-model="due_date"
                    ></v-date-picker>
                </div>
                <div class="mb-4 d-flex justify-center subtitle primary-color-text"
                v-if="!due_time && due_date">
                    Select Time
                </div>
                <div class="mb-4 d-flex justify-center">
                    <v-time-picker
                    v-if="!due_time && due_date"
                    color="green lighten-1"
                    format="24hr"
                    v-model="due_time"
                    ></v-time-picker>
                </div>
            </section>

            <section v-if="why_is_pop_up_open == 'change_payment'">
                <v-form class="mt-4 px-4"
                v-model="valid"
                :lazy-validation="lazy"
                ref="form">
                    <div>
                        <v-text-field 
                        v-if="task.pages"
                        clearable
                        :placeholder="task.pages"
                        outlined
                        type="number"
                        v-model="pages"
                        :label="`number of pages`"
                        required
                        > </v-text-field>  
                    </div>
                    <div>
                        <v-text-field 
                        v-if="task.pages"
                        clearable
                        outlined
                        :placeholder="task.page_cost"
                        type="number"
                        v-model="page_cost"
                        :label="`Amount Per Page`"
                        required
                        > </v-text-field>  
                    </div>
                    <div>
                        <v-text-field 
                        v-if="!task.pages"
                        clearable
                        outlined
                        :placeholder="task.full_pay"
                        type="number"
                        v-model="full_pay"
                        :label="`Full Amount`"
                        required
                        > </v-text-field>  
                    </div>
                    <div class="mb-4 bold">
                        {{(page_cost && pages) ? 'Full Amount Payable: ' + page_cost * pages + ' KES': null}}
                    </div>
                </v-form>
            </section>

            <div class="d-flex justify-end">
                <v-btn 
                class="success"
                small 
                :loading="loading" 
                @click="submit" 
                :disabled="!can_submit">
                    Submit
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import {mapActions} from 'vuex'

    export default{
        name: 'changeTaskDetails',

        props: [
            'why_is_pop_up_open', 'task'
        ],

        computed:{
            title(){
                let title
                switch (this.why_is_pop_up_open) {
                    case 'extend_deadline':
                        title = 'Enter New Deadline:'
                        break;

                    case 'change_payment':
                        title = 'Enter New Payment Details:'
                        break;
                } 
                return title
            },
            due_refined(){
                let refined_time = ' ( ' + dayjs(this.due_date + ' ' + this.due_time + ':00').fromNow(true) + ' from now )'
                let formated_time = dayjs(this.due_date + ' ' + this.due_time + ':00').format('DD/MM/YYYY')
                return formated_time + refined_time
            },
            can_submit(){
                if(
                    this.why_is_pop_up_open == 'extend_deadline' &&
                    this.due_date &&
                    this.due_time
                ){
                    return true
                }
                if(
                    this.why_is_pop_up_open == 'change_payment'
                ){
                    if(
                        this.task.pages &&
                        this.task.pages &&
                        this.page_cost
                    ){
                        return true
                    } else if(this.full_pay){
                        return true
                    }
                }
                return false
            }
        },

        data: () => {
            return {
                due_date: null,
                due_time: null,
                pages: null,
                page_cost: null,
                full_pay: null,

                loading: false,
                valid: false
            }
        },

        methods: {
            ...mapActions(['changeDeadline', 'changePayment']),
            
            clearEntries(){
                this.due_date = null
                this.due_time = null
                this.pages = null
                this.page_cost = null
            },

            submit(){
                this.loading = true
                if(this.why_is_pop_up_open == 'extend_deadline'){
                    const prompt_message = "You are about to change the deadline to " + this.due_time + " - " + this.due_refined + ',\nProcced?'
                    if(!confirm(prompt_message)) {
                        this.loading = false
                        this.clearEntries()
                        return
                    }
                    const data = {
                        expiry_time: this.due_date + ' ' + this.due_time,
                        task_id: this.task.id
                    }
                    this.changeDeadline(data).then(() => {
                        this.loading = false,
                        this.$emit('closePopUp')
                    })
                } else if(this.why_is_pop_up_open == 'change_payment'){
                    let data;
                    let prompt_message;
                    if(this.task.pages){
                        prompt_message = "You are about to change the the payment terms to " + this.pages + " pages at " + this.page_cost + "KES. Totaling " 
                        + (this.pages * this.page_cost) + "KES, \nProcced?"
                        
                        data = {
                            status: this.getTaskChatHeader.status,
                            pages: this.pages,
                            page_cost: this.page_cost,
                            task_id: this.task.id
                        }
                    } else {
                        prompt_message = "You are about to change the the payment terms to " + this.full_pay + " KES for the whole task, "
                        + "\nProcced?"
                        
                        data = {
                            status: this.getTaskChatHeader.status,
                            full_pay: this.full_pay,
                            task_id: this.task.id
                        }

                    }
                    if(!confirm(prompt_message)) {
                        this.loading = false
                        this.clearEntries()
                        return
                    }  
                    this.changePayment(data).then(() => {
                        this.loading = false,
                        this.$emit('closePopUp')
                    })
                }

            },
            
        },
  
        created(){
            dayjs.extend(relativeTime)
            console.log(this.task);
        }

    }
</script>
