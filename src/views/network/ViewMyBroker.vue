<template>
    <div>
        <user-card :user="getViewMyBrokerDetails"/>
        
        <section v-if="!fetching_tasks">
            <v-row class="d-flex grey lighten-2 px-2 py-4" >
                <v-col class="col-7 primary-color-text title d-flex justify-start pointer"> 
                {{'Mutual Tasks'}}
                </v-col>
            </v-row>
            <section>
                
                <v-row class="no-gutters grey lighten-3 mt-2">
                    <v-col class="col-4 px-1 mb-1 white--text">
                        <div class="tomato pointer rounded elevation-10" @click="alert">
                        <div class="d-flex justify-center bold">
                            {{'total'}}
                        </div>
                        <v-divider inset class="red--text dark" dark/>
                        <div class="d-flex justify-end align-center px-1">
                            <v-spacer />
                            <span> {{getViewMyBroker.data.broker_writer_metrics['total']}} </span>
                        </div>
                        <v-progress-linear
                            v-if="loading"
                            indeterminate
                            rounded
                            color="rgb(15,14,56)"
                            height="3"
                        ></v-progress-linear>
                        </div>
                    </v-col>

                    <v-col class="col-4 px-1 mb-1 white--text">
                        <div class="tomato pointer rounded elevation-10" @click="alert">
                        <div class="d-flex justify-center bold">
                            {{'available'}}
                        </div>
                        <v-divider inset class="red--text dark" dark/>
                        <div class="d-flex justify-end align-center px-1">
                            <v-spacer />
                            <span> {{getViewMyBroker.data.broker_writer_metrics['available']}} </span>
                        </div>
                        <v-progress-linear
                            v-if="loading"
                            indeterminate
                            rounded
                            color="rgb(15,14,56)"
                            height="3"
                        ></v-progress-linear>
                        </div>
                    </v-col>
                    
                    <v-col class="col-4 px-1 mb-1 white--text">
                        <div class="tomato pointer rounded elevation-10" @click="alert">
                        <div class="d-flex justify-center bold">
                            {{'underway'}}
                        </div>
                        <v-divider inset class="red--text dark" dark/>
                        <div class="d-flex justify-end align-center px-1">
                            <v-spacer />
                            <span> {{getViewMyBroker.data.broker_writer_metrics['underway']}} </span>
                        </div>
                        <v-progress-linear
                            v-if="loading"
                            indeterminate
                            rounded
                            color="rgb(15,14,56)"
                            height="3"
                        ></v-progress-linear>
                        </div>
                    </v-col>

                    <v-col class="col-4 px-1 mb-1 white--text">
                        <div class="tomato pointer rounded elevation-10" @click="alert">
                        <div class="d-flex justify-center bold">
                            {{'complete'}}
                        </div>
                        <v-divider inset class="red--text dark" dark/>
                        <div class="d-flex justify-end align-center px-1">
                            <v-spacer />
                            <span> {{getViewMyBroker.data.broker_writer_metrics['complete']}} </span>
                        </div>
                        <v-progress-linear
                            v-if="loading"
                            indeterminate
                            rounded
                            color="rgb(15,14,56)"
                            height="3"
                        ></v-progress-linear>
                        </div>
                    </v-col>
                    
                    <v-col class="col-4 px-1 mb-1 white--text">
                        <div class="tomato pointer rounded elevation-10" @click="alert">
                        <div class="d-flex justify-center bold">
                            {{'cancelled'}}
                        </div>
                        <v-divider inset class="red--text dark" dark/>
                        <div class="d-flex justify-end align-center px-1">
                            <v-spacer />
                            <span> {{getViewMyBroker.data.broker_writer_metrics['cancelled']}} </span>
                        </div>
                        <v-progress-linear
                            v-if="loading"
                            indeterminate
                            rounded
                            color="rgb(15,14,56)"
                            height="3"
                        ></v-progress-linear>
                        </div>
                    </v-col>
                    
                    <v-col class="col-4 px-1 mb-1 white--text">
                        <div class="tomato pointer rounded elevation-10" @click="alert">
                        <div class="d-flex justify-center bold">
                            {{'paid'}}
                        </div>
                        <v-divider inset class="red--text dark" dark/>
                        <div class="d-flex justify-end align-center px-1">
                            <v-spacer />
                            <span> {{getViewMyBroker.data.broker_writer_metrics['paid']}} </span>
                        </div>
                        <v-progress-linear
                            v-if="loading"
                            indeterminate
                            rounded
                            color="rgb(15,14,56)"
                            height="3"
                        ></v-progress-linear>
                        </div>
                    </v-col>
                    
                </v-row>

                <section v-if="tasks[0]">
                    <div class="limiting_wrapper" v-if="!($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
                        <tasks-strip v-for="(task, i) in tasks" :key="i" :task="task" />
                    </div>

                    <div v-if="($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
                        <d-taken-card :tasks="tasks" />
                    </div>
                    
                    <v-row class="d-flex justify-center mb-4" v-if="tasks_pagination_links.length > 3">
                        <v-col class="col-1 white--text mb-4 primary-color text-center" v-for="(link, i) in tasks_pagination_links" 
                        :key="i" 
                        :class="{
                            'red': link.active,
                            'grey': ((getMyBrokerTasksPaginationDetails.current_page === getMyBrokerTasksPaginationDetails.last_page) && link.next) ||
                                    (getMyBrokerTasksPaginationDetails.current_page === 1) && link.previous
                            }">
                            <!-- @click="getTasksFromPage(link.url)"> -->
                            <span>
                            <span v-if="link.previous">
                            {{"<<"}}
                            </span>
                            <span v-if="!link.previous && !link.next">
                                {{link.label}}
                            </span>
                            <span v-if="(link.next)">
                                {{">>"}}
                            </span>
                            </span>
                        </v-col>
                    </v-row>
                </section> 

                <section v-else>
                    <div class="padded ma-4">
                        <v-row class="no-gutters d-flex align-center">
                            <v-col class="col-12 col-md-6">
                                <emptyHere />
                            </v-col>
                            <v-col class="col-md-6 col-12">
                                You do not have any mutual tasks with 
                                {{ getViewMyBrokerDetails.username }}
                                Tasks that you have done belonging to this broker will appear here. 
                            </v-col>
                        </v-row>
                    </div>
                </section>
  
            </section>
        </section>

        <section v-if="fetching_tasks">
            <fetching-items :message="`Fetching Mutual Tasks`" />
        </section>

        <section v-else>            
            

            <!-- offers section -->
            <section>
                <v-row class="d-flex grey lighten-2 px-2 py-4" >
                    <v-col class="col-7 primary-color-text title d-flex justify-start pointer"> 
                    {{'Offers'}}
                    </v-col>
                </v-row>
                <section v-if="fetching_offers">
                    <fetching-items :message="`Fetching Offers`" />
                </section>
                <section v-else>
                    <v-row class="no-gutters grey lighten-3 mt-2">
                        <v-col class="col-4 px-1 mb-1 white--text">
                            <div class="tomato pointer rounded elevation-10" @click="alert">
                                <div class="d-flex justify-center bold">
                                    {{'total'}}
                                </div>
                                <v-divider inset class="red--text dark" dark/>
                                <div class="d-flex justify-end align-center px-1">
                                    <v-spacer />
                                    <span> {{getViewMyBrokerOffers.data.broker_writer_offers['total']}} </span>
                                </div>
                            </div>
                        </v-col>
                        <v-col class="col-4 px-1 mb-1 white--text">
                            <div class="tomato pointer rounded elevation-10" @click="alert">
                                <div class="d-flex justify-center bold">
                                    {{'pending'}}
                                </div>
                                <v-divider inset class="red--text dark" dark/>
                                <div class="d-flex justify-end align-center px-1">
                                    <v-spacer />
                                    <span> {{getViewMyBrokerOffers.data.broker_writer_offers['pending']}} </span>
                                </div>
                            </div>
                        </v-col>
                        <v-col class="col-4 px-1 mb-1 white--text">
                            <div class="tomato pointer rounded elevation-10" @click="alert">
                                <div class="d-flex justify-center bold">
                                    {{'accepted'}}
                                </div>
                                <v-divider inset class="red--text dark" dark/>
                                <div class="d-flex justify-end align-center px-1">
                                    <v-spacer />
                                    <span> {{getViewMyBrokerOffers.data.broker_writer_offers['accepted']}} </span>
                                </div>
                            </div>
                        </v-col>
                        <v-col class="col-4 px-1 mb-1 white--text">
                            <div class="tomato pointer rounded elevation-10" @click="alert">
                                <div class="d-flex justify-center bold">
                                    {{'rejected'}}
                                </div>
                                <v-divider inset class="red--text dark" dark/>
                                <div class="d-flex justify-end align-center px-1">
                                    <v-spacer />
                                    <span> {{getViewMyBrokerOffers.data.broker_writer_offers['rejected']}} </span>
                                </div>
                            </div>
                        </v-col>
                        <v-col class="col-4 px-1 mb-1 white--text">
                            <div class="tomato pointer rounded elevation-10" @click="alert">
                                <div class="d-flex justify-center bold">
                                    {{'cancelled'}}
                                </div>
                                <v-divider inset class="red--text dark" dark/>
                                <div class="d-flex justify-end align-center px-1">
                                    <v-spacer />
                                    <span> {{getViewMyBrokerOffers.data.broker_writer_offers['cancelled']}} </span>
                                </div>
                            </div>
                        </v-col>
                        <v-col class="col-4 pa-1">
                            <div class="grey rounded elevation-1 pointer" style="color: transparent;" >
                                <div class="d-flex justify-center bold">
                                    pulled
                                </div>
                                <v-divider inset/>
                                <div class="d-flex justify-end align-center px-1 ">
                                    <span> {{'s'}}  </span>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </section>
                <section v-if="getViewMyBrokerOffers.data.offers.data[0]">

                </section>
                <section v-else>
                    <div class="padded ma-4">
                        <v-row class="no-gutters d-flex align-center">
                            <v-col class="col-12 col-md-6">
                                <emptyHere />
                            </v-col>
                            <v-col class="col-md-6 col-12">
                                {{ getViewMyBrokerDetails.username }}
                                has never offered you any task. If they do, then they will appear here.
                            </v-col>
                        </v-row>
                    </div>
                </section>
            </section>
            
            <!-- bids section -->
            <section>
                <v-row class="d-flex grey lighten-2 px-2 py-4" >
                    <v-col class="col-7 primary-color-text title d-flex justify-start pointer"> 
                    {{'Bids'}}
                    </v-col>
                </v-row>
                <section v-if="fetching_bids">
                    <fetching-items :message="`Fetching Bids`" />
                </section>
                <section v-else>
                    <v-row class="no-gutters grey lighten-3 mt-2">
                        <v-col class="col-4 px-1 mb-1 white--text">
                            <div class="tomato pointer rounded elevation-10" @click="alert">
                                <div class="d-flex justify-center bold">
                                    {{'total'}}
                                </div>
                                <v-divider inset class="red--text dark" dark/>
                                <div class="d-flex justify-end align-center px-1">
                                    <v-spacer />
                                    <span> {{getViewMyBrokerBids.data.broker_writer_bids['total']}} </span>
                                </div>
                            </div>
                        </v-col>
                        <v-col class="col-4 px-1 mb-1 white--text">
                            <div class="tomato pointer rounded elevation-10" @click="alert">
                                <div class="d-flex justify-center bold">
                                    {{'pending'}}
                                </div>
                                <v-divider inset class="red--text dark" dark/>
                                <div class="d-flex justify-end align-center px-1">
                                    <v-spacer />
                                    <span> {{getViewMyBrokerBids.data.broker_writer_bids['pending']}} </span>
                                </div>
                            </div>
                        </v-col>
                        <v-col class="col-4 px-1 mb-1 white--text">
                            <div class="tomato pointer rounded elevation-10" @click="alert">
                                <div class="d-flex justify-center bold">
                                    {{'won'}}
                                </div>
                                <v-divider inset class="red--text dark" dark/>
                                <div class="d-flex justify-end align-center px-1">
                                    <v-spacer />
                                    <span> {{getViewMyBrokerBids.data.broker_writer_bids['won']}} </span>
                                </div>
                            </div>
                        </v-col>
                        <v-col class="col-4 px-1 mb-1 white--text">
                            <div class="tomato pointer rounded elevation-10" @click="alert">
                                <div class="d-flex justify-center bold">
                                    {{'lost'}}
                                </div>
                                <v-divider inset class="red--text dark" dark/>
                                <div class="d-flex justify-end align-center px-1">
                                    <v-spacer />
                                    <span> {{getViewMyBrokerBids.data.broker_writer_bids['lost']}} </span>
                                </div>
                            </div>
                        </v-col>
                        <v-col class="col-4 px-1 mb-1 white--text">
                            <div class="tomato pointer rounded elevation-10" @click="alert">
                                <div class="d-flex justify-center bold">
                                    {{'pulled'}}
                                </div>
                                <v-divider inset class="red--text dark" dark/>
                                <div class="d-flex justify-end align-center px-1">
                                    <v-spacer />
                                    <span> {{getViewMyBrokerBids.data.broker_writer_bids['pulled']}} </span>
                                </div>
                            </div>
                        </v-col>
                        <v-col class="col-4 px-1 mb-1 white--text">
                            <div class="tomato pointer rounded elevation-10" @click="alert">
                                <div class="d-flex justify-center bold">
                                    {{'rejected'}}
                                </div>
                                <v-divider inset class="red--text dark" dark/>
                                <div class="d-flex justify-end align-center px-1">
                                    <v-spacer />
                                    <span> {{getViewMyBrokerBids.data.broker_writer_bids['rejected']}} </span>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                    <section v-if="bids[0]">
                        <div class="limiting_wrapper"  v-if="bids[0]  && !($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
                            <bids-strip v-for="(bid, i) in bids" :key="i" :bid="bid" />
                        </div>
                        
                        <div v-if="bids[0] && ($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
                            <d-bids-card :bids="bids" />
                        </div>

                        <v-row class="d-flex justify-center mb-4" v-if="bids_pagination_links.length > 3">
                            <v-col class="col-1 white--text mb-4 primary-color text-center" v-for="(link, i) in bids_pagination_links" 
                            :key="i" 
                            :class="{
                                'red': link.active,
                                'grey': ((getMyBrokerBidsPaginationDetails.current_page === getMyBrokerBidsPaginationDetails.last_page) && link.next) ||
                                        (getMyBrokerBidsPaginationDetails.current_page === 1) && link.previous
                                }">
                                <!-- @click="getTasksFromPage(link.url)"> -->
                                <span>
                                <span v-if="link.previous">
                                {{"<<"}}
                                </span>
                                <span v-if="!link.previous && !link.next">
                                    {{link.label}}
                                </span>
                                <span v-if="(link.next)">
                                    {{">>"}}
                                </span>
                                </span>
                            </v-col>
                        </v-row>
                    </section>
                    <section v-else>
                        <div class="padded ma-4">
                            <v-row class="no-gutters d-flex align-center">
                                <v-col class="col-12 col-md-6">
                                    <emptyHere />
                                </v-col>
                                <v-col class="col-md-6 col-12">
                                    You have never bid on any of
                                    {{ getViewMyBrokerDetails.username + "'" }}
                                    s tasks. Those bids will apper here once you do.
                                </v-col>
                            </v-row>
                        </div>
                    </section>
                </section>
            </section>
            <!-- invoices section -->
            <section>
                <v-row class="d-flex grey lighten-2 px-2 py-4" >
                    <v-col class="col-7 primary-color-text title d-flex justify-start pointer"> 
                    {{'Mutual Invoices'}}
                    </v-col>
                </v-row>
                <section v-if="fetching_invoices">
                    <fetching-items :message="`Fetching Mutual Invoices`" />
                </section>
                <section v-else>
                    <v-row class="no-gutters grey lighten-3 mt-2">
                        <v-col class="col-4 px-1 mb-1 white--text">
                            <div class="tomato pointer rounded elevation-10" @click="alert">
                            <div class="d-flex justify-center bold">
                                {{'total'}}
                            </div>
                            <v-divider inset class="red--text dark" dark/>
                            <div class="d-flex justify-end align-center px-1">
                                <v-spacer />
                                <span> {{getViewMyBrokerInvoices.data.broker_writer_invoices['total']}} </span>
                            </div>
                            <v-progress-linear
                                v-if="loading"
                                indeterminate
                                rounded
                                color="rgb(15,14,56)"
                                height="3"
                            ></v-progress-linear>
                            </div>
                        </v-col>

                        <v-col class="col-4 px-1 mb-1 white--text">
                            <div class="tomato pointer rounded elevation-10" @click="alert">
                            <div class="d-flex justify-center bold">
                                {{'pending'}}
                            </div>
                            <v-divider inset class="red--text dark" dark/>
                            <div class="d-flex justify-end align-center px-1">
                                <v-spacer />
                                <span> {{getViewMyBrokerInvoices.data.broker_writer_invoices['pending']}} </span>
                            </div>
                            <v-progress-linear
                                v-if="loading"
                                indeterminate
                                rounded
                                color="rgb(15,14,56)"
                                height="3"
                            ></v-progress-linear>
                            </div>
                        </v-col>
                        
                        <v-col class="col-4 px-1 mb-1 white--text">
                            <div class="tomato pointer rounded elevation-10" @click="alert">
                            <div class="d-flex justify-center bold">
                                {{'paid'}}
                            </div>
                            <v-divider inset class="red--text dark" dark/>
                            <div class="d-flex justify-end align-center px-1">
                                <v-spacer />
                                <span> {{getViewMyBrokerInvoices.data.broker_writer_invoices['paid']}} </span>
                            </div>
                            <v-progress-linear
                                v-if="loading"
                                indeterminate
                                rounded
                                color="rgb(15,14,56)"
                                height="3"
                            ></v-progress-linear>
                            </div>
                        </v-col>
                    </v-row>

                    <section v-if="invoices[0]">
                        <div class="limiting_wrapper" v-if="invoices[0] && !($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
                            <invoice-strip v-for="invoice in invoices" :key="invoice.id" :invoice="invoice"/>
                        </div>

                        <div v-if="invoices[0] && ($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
                            <d-invoice-card :invoices="invoices" :debited="true"/>
                        </div>
                        
                        <v-row class="d-flex justify-center mb-4" v-if="invoices_pagination_links.length > 3">
                            <v-col class="col-1 white--text mb-4 primary-color text-center" v-for="(link, i) in invoices_pagination_links" 
                            :key="i" 
                            :class="{
                                'red': link.active,
                                'grey': ((getMyBrokerInvoicesPaginationDetails.current_page === getMyBrokerInvoicesPaginationDetails.last_page) && link.next) ||
                                        (getMyBrokerInvoicesPaginationDetails.current_page === 1) && link.previous
                                }">
                                <!-- @click="getTasksFromPage(link.url)"> -->
                                <span>
                                <span v-if="link.previous">
                                {{"<<"}}
                                </span>
                                <span v-if="!link.previous && !link.next">
                                    {{link.label}}
                                </span>
                                <span v-if="(link.next)">
                                    {{">>"}}
                                </span>
                                </span>
                            </v-col>
                        </v-row>
                    </section>
                    <section v-else>
                        <div class="padded ma-4">
                            <v-row class="no-gutters d-flex align-center">
                                <v-col class="col-12 col-md-6">
                                    <emptyHere />
                                </v-col>
                                <v-col class="col-md-6 col-12">
                                    You have no invoice where 
                                    {{ getViewMyBrokerDetails.username }}
                                    is the broker. These invoices will appear here once they are created.
                                </v-col>
                            </v-row>
                        </div>
                    </section>
                </section>
            </section>
            
        </section>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import UserCard from '../../components/dashboard/UserCard.vue';
import FetchingItems from '../../components/widgets/FetchingItems.vue';

import DTakenCard from '../../components/dashboard/desktop/DTakenCard.vue';
import TasksStrip from '../../components/dashboard/TasksStrip.vue';

import BidsStrip from '../../components/dashboard/BidsStrip.vue';
import DBidsCard from '../../components/dashboard/desktop/DBidsCard.vue';

import InvoiceStrip from '../../components/dashboard/InvoiceStrip.vue';
import DInvoiceCard from '../../components/dashboard/desktop/DInvoiceCard.vue';

import emptyHere from '../../components/svg/emptyHere.vue'

export default {
    name: 'ViewMyBroker',

    components:{
        UserCard, FetchingItems, DTakenCard, TasksStrip, BidsStrip, DBidsCard, InvoiceStrip, DInvoiceCard, emptyHere
    },

    computed:{
        ...mapGetters([
            'getViewMyBroker', 'getViewMyBrokerDetails', 'getViewMyBrokerInvoices', 'getViewMyBrokerOffers', 'getViewMyBrokerBids', 'getMyBrokerTasksPaginationDetails', 'getMyBrokerBidsPaginationDetails',
            'getMyBrokerInvoicesPaginationDetails'
        ]),

        tasks(){
            let tasks = this.getMyBrokerTasksPaginationDetails.data
            tasks.forEach(task => {
                task.broker = {}
                task.broker.user = {}
                task.broker.user.code = this.getViewMyBrokerDetails.code
                task.broker.user.username = this.getViewMyBrokerDetails.username
            });
            return tasks
        },

        tasks_pagination_links(){
            let links = []
            this.getMyBrokerTasksPaginationDetails.links.forEach(link => {
            link.previous = link.label == "&laquo; Previous"
            link.next = link.label == "Next &raquo;"
            links.push(link)
            });
            return links
        },

        bids(){
            return this.getMyBrokerBidsPaginationDetails.data
        },
        
        bids_pagination_links(){
            let links = []
            this.getMyBrokerBidsPaginationDetails.links.forEach(link => {
            link.previous = link.label == "&laquo; Previous"
            link.next = link.label == "Next &raquo;"
            links.push(link)
            });
            return links
        },

        invoices(){
            let invoices = this.getMyBrokerInvoicesPaginationDetails.data
            invoices.forEach(invoice => {
                invoice.broker = {}
                invoice.broker.user = this.getViewMyBrokerDetails
            });

            return invoices;
        },
        
        invoices_pagination_links(){
            let links = []
            this.getMyBrokerInvoicesPaginationDetails.links.forEach(link => {
            link.previous = link.label == "&laquo; Previous"
            link.next = link.label == "Next &raquo;"
            links.push(link)
            });
            return links
        },
        
    },

    data: () => {
        return {
            fetching_tasks: true,
            loading: false,
            fetching_invoices: true,
            fetching_offers: true,
            fetching_bids: true,
            fetching_tasks: true
        }
    },

    methods: {
        ...mapActions(['fetchMyBroker', 'fetchMyBrokerInvoices', 'fetchMyBrokerOffers', 'fetchMyBrokerBids']),
        alert() {
            console.log('message')
            // window.alert('message')
        }
    },

    created(){
        this.fetchMyBroker(this.getViewMyBrokerDetails).then(() => {
            this.fetching_tasks = false,

            this.fetchMyBrokerOffers(this.getViewMyBrokerDetails).then(() => {
                this.fetching_offers = false

                this.fetchMyBrokerBids(this.getViewMyBrokerDetails).then(() => {
                    this.fetching_bids = false

                    this.fetchMyBrokerInvoices(this.getViewMyBrokerDetails).then(() => {
                        this.fetching_invoices = false
                    })
                
                })
                
            })
            
        })
    },

    mounted(){
        console.log(this.getViewMyBroker);
    }
}
</script>
<style scoped>
 .padded{
    background-color: rgb(228, 227, 227);
    /* background-color: red; */
    padding: 0.1rem 0.1rem;
    font-size: 0.8rem;
    border-radius: 0.5rem;
  }
</style>
