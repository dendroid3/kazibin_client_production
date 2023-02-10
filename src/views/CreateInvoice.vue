<template lang="html">
    <div class="main-wrapper grey lighten-3">
        <v-row class="d-flex grey lighten-2 align-center no-gutters">
            <v-col class="col-12 pl-4 backg"> Create Invoice
            </v-col>
        </v-row>
        <fetching-items :message="`getting ready`"  v-if="fetching"/>
        
        <div  style="align-items: center;" v-else>
            <v-form class="mt-4 px-2"
            :class="{
                'full-width': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs,
                'medium-width':  $vuetify.breakpoint.md,
                'large-width':  $vuetify.breakpoint.lg,
            }"
            v-model="valid"
            :lazy-validation="lazy"
            ref="form">
                <v-select
                :items="toPayOrBePaid"
                label="Purpose of invoice"
                outlined
                @change="recipient = null"
                v-model="liaison_base"
                ></v-select>
                <v-select
                v-if="to_broker && (brokers_names.length > 0)"
                :items="brokers_names"
                label="select broker"
                v-model="recipient"
                @change="fetchTasks"
                outlined
                ></v-select>
                <v-select
                v-if="to_writer && (writers_names.length > 0)"
                :items="writers_names"
                label="select writer"
                v-model="recipient"
                @change="fetchTasks"
                outlined
                ></v-select>
            </v-form>
        </div>

        <v-row class="padder" v-if="(to_writer && (writers_names.length < 1)) || (to_broker && (brokers_names.length < 1))">
            <div class="padded mb-4">
                <v-row class="no-gutters d-flex align-center">
                    <v-col class="col-12 col-md-6">
                        <emptyHere />
                    </v-col>
                    <v-col class="col-12 col-md-6 text-center" v-if="(to_writer && (writers_names.length < 1))">
                        You owe no writer. Make sure that the tasks you intend to pay are marked complete.
                    </v-col>
                    <v-col class="col-12 col-md-6 text-center" v-else>
                        No broker owes you a thing. Make sure that the tasks you intend to get paid are marked complete.
                    </v-col>
                </v-row>
            </div>
        </v-row>
        
        <section v-if="recipient">
            <section  v-if="to_writer">
                <div class="text-center bold">
                    {{"COMPLETED TASKS BY " + recipient}}
                </div>
                <div class="text-muted text-center">
                    {{"select the tasks you intend to pay"}}
                </div>
            </section>
            <section  v-else>
                <div class="text-center bold">
                    {{"COMPLETED TASKS FROM " + recipient}}
                </div>
                <div class="text-muted text-center">
                    {{"select the tasks you intend to get paid"}}
                </div>
            </section>

            <v-row class="tiger mb-0 pl-2 mt-4 no-gutters bold border-bottom border-top">
                <v-col class="col-3 d-flex justify-center align-center border-right">
                    {{"date"}}
                </v-col>
                <v-col class="col-4 d-flex justify-center align-center border-right">
                    {{"code : topic"}}
                </v-col>
                <v-col class="col-2 d-flex justify-center align-center border-right">
                    {{'KES'}}
                </v-col>
                <v-col class="col-3 pr-2 d-flex justify-center align-center">
                    {{"action"}}
                </v-col>
            </v-row>

            <fetching-items :message="`fetching completed tasks`"  v-if="fetching_tasks"/>

            <v-row class="tiger mt-0 pl-2 no-gutters border-bottom" v-for="(task, i) in tasks" :key="i">
                <v-col class="col-3 d-flex justify-center align-center border-right">
                    <v-icon small class="green--text bold" v-if="isSelected(task.id)">
                        mdi-check
                    </v-icon>
                    {{taskDate(task.created_at)}}
                </v-col>
                <v-col class="col-4 d-flex justify-center align-center text-center px-1 border-right">
                    {{task.code + ": " + task.topic}}
                </v-col>
                <v-col class="col-2 d-flex justify-center align-center border-right">
                    {{task.full_pay}}
                </v-col>
                <v-col class="col-3 d-flex justify-center align-center">
                    <v-btn x-small class="white--text mr-2 success" @click="addTask(task.id)" v-if="!isSelected(task.id)">
                        select
                    </v-btn>
                    <v-btn x-small class="white--text mr-2" style="background-color: tomato;" @click="removeTask(task.id)" v-if="isSelected(task.id)">
                        remove
                    </v-btn>
                </v-col>
            </v-row>
        </section>

        <div class="d-flex justify-end" v-if="selected_tasks_id.length > 0">
            <v-btn small class="success mt-2 mr-4" @click="selectTasks" :disabled="applied || (selected_tasks_id.length < 1)">
                {{applied ? 'applied' : 'apply'}}
                <v-icon small class="green--text" v-if="applied">
                    mdi-check
                </v-icon>
            </v-btn>
        </div>

        <section v-if="applied">
            <div id="invoice" style="min-height: 50vh; font-family: dosis;"
            class="pa-2 grey lighten-1 ma-2 rounded">
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

                <div class="white rounded">
                    <v-row class="tiger px-2 no-gutters bold">
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
                            
                    <v-row class="tiger pl-2 no-gutters" v-for="(task, i) in selected_tasks" :key="i">
                        <v-col class="col-3 d-flex justify-center align-center">
                            {{taskDate(task.created_at)}}
                        </v-col>
                        <v-col class="col-6 d-flex justify-center text-center align-center">
                            {{task.code + ": " + task.topic}}
                        </v-col>
                        <v-col class="col-3 d-flex justify-center align-center">
                            {{task.full_pay}}
                        </v-col>
                    </v-row>
                    
                    <v-row class="tiger px-2 no-gutters">
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

                    <hr v-if="bonuses[0] || deductions[0]">

                    <v-row class="tiger pl-2 no-gutters" v-for="(bonus, i) in bonuses" :key="i">
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

                    <v-row class="tiger pl-2 no-gutters" v-for="(deduction, i) in deductions" :key="i">
                        <v-col class="col-3 d-flex justify-end align-center bold">
                            {{"deduction"}}
                        </v-col>
                        <v-col class="col-6 d-flex justify-center align-center">
                            {{deduction.description}}
                        </v-col>
                        <v-col class="col-3 d-flex justify-center align-center">
                            {{"-" + deduction.amount}}
                        </v-col>
                    </v-row>
                    
                    <hr class="my-2">
                    
                    <v-row class="tiger px-2 no-gutters">
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
                                @click="opendeductionForm"
                                class="pointer">
                                add deduction
                                </v-list-item>
                            </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                    
                    <v-row class="tiger pa-2 no-gutters" v-if="bonus_form">
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
                            <v-btn small class="red mr-2 white--text" @click="bonus_form = false">
                                cancel
                            </v-btn>
                            <v-btn small class="green white--text" @click="addBonus">
                                add
                            </v-btn>
                        </v-col>
                    </v-row>
                        
                    <v-row class="tiger pa-2 no-gutters" v-if="deduction_form">
                        <v-col class="col-12 bold d-flex justify-center align-center">
                            deduction
                        </v-col>
                        <v-col class="col-12 d-flex justify-center align-center">
                            <v-text-field 
                            outlined
                            v-model="deduction_draft.description"
                            clearable
                            type="text"
                            label="deduction description"
                            required
                            > </v-text-field>  
                        </v-col>
                        <v-col class="col-12 d-flex justify-center align-center">
                            <v-text-field 
                            outlined
                            v-model="deduction_draft.amount"
                            clearable
                            type="number"
                            label="amount"
                            required
                            > </v-text-field>  
                        </v-col>
                        <v-col class="col-12 d-flex justify-end align-center">
                            <v-btn small class="red mr-2 white--text" @click="deduction_form = false">
                                cancel
                            </v-btn>
                            <v-btn small class="green white--text" @click="adddeduction">
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
            </div>
        </section>

        <div class="transparent transparent--text bottom" id="bottom">
            <a href="#bottom" id="bottom_button"></a>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import FetchingItems from '../components/widgets/FetchingItems.vue'
import EmptyHere from '../components/widgets/EmptyHere.vue'

export default {
    name: "CreateInvoice",
    computed: {
        ...mapGetters(["getMyBrokers", "getMyWriters", "getAllTasksPostedByMe", "getAllTasksDoneByMe", "getNetworkInDeficit"]),
        total_amount() {
            if (this.sub_total > 0) {
                let total_amount = this.sub_total;
                if (this.bonuses[0]) {
                    this.bonuses.forEach(bonus => {
                        total_amount += Number(bonus.amount);
                    });
                }
                if (this.deductions[0]) {
                    this.deductions.forEach(deduction => {
                        total_amount -= Number(deduction.amount);
                    });
                }
                return total_amount;
            }
            else {
                return 0;
            }
        },
        sub_total() {
            let amount = 0;
            this.selected_tasks.forEach(task => {
                amount = amount + task.full_pay;
            });
            return amount;
        },
        date_today() {
            return dayjs(Date.now()).format("DD/MM/YYYY");
        },
        writers_names() {
            const names = [];
            this.getNetworkInDeficit.writers_i_owe.forEach(writer => {
                names.push(writer.code + ": " + writer.username);
            });
            return names;
        },
        brokers_names() {
            const names = [];
            this.getNetworkInDeficit.brokers_that_owe_me.forEach(broker => {
                names.push(broker.code + ": " + broker.username);
            });
            return names;
        },
        to_broker() {
            if (this.liaison_base == "to be paid by a broker") {
                return true;
            }
            else {
                return false;
            }
        },
        to_writer() {
            if (this.liaison_base == "to pay a writer") {
                return true;
            }
            else {
                return false;
            }
        },
        selected_tasks() {
            if (this.selected_tasks_id.length < 1) {
                return null;
            }
            let selected_tasks = [];
            if (this.liaison_base == "to be paid by a broker") {
                const tasks_ready_for_payment = this.tasks
                tasks_ready_for_payment.forEach(task => {
                    this.selected_tasks_id.forEach(id => {
                        if (task.id == id) {
                            selected_tasks.push(task);
                        }
                    });
                });
            }
            else {
                const tasks_ready_for_payment = this.tasks
                tasks_ready_for_payment.forEach(task => {
                    this.selected_tasks_id.forEach(id => {
                        if (task.id == id) {
                            selected_tasks.push(task);
                        }
                    });
                });
            }
            return selected_tasks;
        }
    },
    data() {
        return {
            fetching_tasks: true,
            creating: false,
            toPayOrBePaid: [
                "to pay a writer",
                "to be paid by a broker"
            ],
            bonuses: [],
            deductions: [],
            applied: false,
            valid: true,
            lazy: false,
            liaison_base: "",
            recipient: null,
            bonus_form: false,
            bonus_draft: {},
            bonuses: [],
            deduction_form: false,
            deduction_draft: {},
            deductions: [],
            tasks: [],
            selected_tasks_id: [],
            tasks_signature: null,
            fetching: true
        };
    },
    methods: {
        ...mapActions(["createInvoice", "fetchNetworkThatAreInDeficit","fetchAllDoneFromBrokerToCreateInvoice", "fetchAllDoneByWriterToCreateInvoice"]),
        boot() {
            this.fetchNetworkThatAreInDeficit().then((res) => (this.fetching = false));
        },
        makeInvoice() {
            let tasks = "";
            this.selected_tasks.forEach(task => {
                tasks = tasks + "\n ---" + task.code + ": " + task.topic;
            });
            let tasks_number = this.selected_tasks.length > 1 ? this.selected_tasks.length + " tasks " : " one task ";
            const confirmation = "You are about to create an invoice for " + tasks_number + "\n" + tasks + "\n\n Proceed?";
            if (!confirm(confirmation)) {
                return;
            }
            this.creating = true;
            const data = {
                tasks_signature: this.tasks_signature,
                bonuses: this.bonuses,
                deductions: this.deductions,
                writer_id: this.selected_tasks[0].writer_id,
                broker_id: this.selected_tasks[0].broker_id,
                amount: this.total_amount
            };
            this.createInvoice(data).then(response => {
                this.creating = false;
            });
        },
        goBottom() {
            document.getElementById("bottom_button").click();
        },
        openBonusForm() {
            this.bonus_form = true;
            this.goBottom();
        },
        addBonus() {
            this.bonus_draft.amount = Number(this.bonus_draft.amount);
            this.bonuses.push(this.bonus_draft);
            this.bonus_draft = {};
            this.bonus_form = false;
        },
        adddeduction() {
            this.deduction_draft.amount = Number(this.deduction_draft.amount);
            this.deductions.push(this.deduction_draft);
            this.deduction_draft = {};
            this.deduction_form = false;
        },
        opendeductionForm() {
            this.deduction_form = true;
            this.goBottom();
        },
        taskDate(date) {
            return dayjs(date).format("DD/MM");
        },
        addTask(task_id) {
            this.applied = false;
            this.selected_tasks_id.push(task_id);
        },
        removeTask(writer_id) {
            this.applied = false;
            this.selected_tasks_id = this.selected_tasks_id.filter(id => (id != writer_id));
        },
        selectTasks() {
            this.applied = true;
            let tasks_signature = "";
            this.selected_tasks_id.forEach(id => {
                tasks_signature += id + "_";
            });
            this.tasks_signature = tasks_signature;
            this.goBottom()
        },
        goBottom(){
            document.getElementById('bottom_button').click()
        },
        isSelected(task_id) {
            if (this.selected_tasks_id.length > 0) {
                return this.selected_tasks_id.filter(id => (id == task_id)).length;
            }
            else {
                return false;
            }
        },
        fetchTasks() {
            let recipient_code = this.recipient.split(":")[0];
            if (this.liaison_base == "to be paid by a broker") {
                const data = {
                    code: recipient_code
                }
                this.fetchAllDoneFromBrokerToCreateInvoice(data).then((res) => (
                    this.fetching_tasks = false,
                    this.tasks = res
                ))
            }
            else {
                const data = {
                    code: recipient_code
                }
                this.fetchAllDoneByWriterToCreateInvoice(data).then((res) => (
                    this.fetching_tasks = false,
                    this.tasks = res
                ))
                // let tasks = this.getAllTasksPostedByMe.filter(task => (task.status == 3 &&
                //     task.writer.user.code == recipient_code));
                // this.tasks = tasks;
            }
        }
    },
   
    created() {
        this.boot()

        dayjs.extend(relativeTime);
    },
    components: { FetchingItems, EmptyHere }
}
</script>
<style lang="css" scoped>
.backg{
    color: rgb(15,14,56);
    font-size: 2rem;
}
.main-wrapper{
  overflow-x: hidden;
  min-height: calc(100vh - 50px);
  padding-bottom: 5rem;
}

  .padder{
    margin: 1rem 2rem;
    padding: 1rem 0;
    animation: tada; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 2s;
    animation-delay: 2s;
    animation-iteration-count: 3;
  }
  .padded{
    background-color: rgb(228, 227, 227);
    padding: 1rem 1rem;
    font-size: 0.8rem;
    border-radius: 3%;
  }

  .border-right{
    border-right: 1px solid black;
  }

  .border-bottom{
    border-bottom: 1px solid black;
  }
  .border-top{
    border-top: 1px solid black;
  }

</style>