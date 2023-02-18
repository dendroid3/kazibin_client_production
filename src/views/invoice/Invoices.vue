<template lang="html">
    <div class="main-wrapper grey lighten-3">
        
      <v-row class="d-flex grey lighten-2 align-center mb-0 no-gutters">
          <v-col class="col-8 pl-4 backg"> invoices
          </v-col>
          <v-col class="col-4 d-flex align-center justify-end px-4">
              <v-icon class="mx-2" @click="go('Invoice/Create')">
                  mdi-plus  
              </v-icon>
          </v-col>
      </v-row>
      
      <v-row class="d-flejx grey lighten-2 align-center mt-0  no-gutters">
        <v-col class="col-6 primary-color-text title d-flex justify-center pointer credited" @click="setInvoiceModel(`credited`)" :class="{
          'underline elevation-1': invoice_model === `credited`
        }"> 
          {{'credited'}}
        </v-col>
        <v-col class="col-6 primary-color-text title d-flex justify-center pointer debited" @click="setInvoiceModel(`debited`)" :class="{
          'underline elevation-1': invoice_model === `debited`
        }"> 
          {{'debited'}}
        </v-col>
      </v-row>

      <v-row class="pa-2 bold no-gutters">
        <v-col class="mb-1 col-4 px-1">
          <div class="grey lighten-2 rounded elevation-1 pointer  elevation-10" @click="filterModel(1)" :class="{
            'redtext': filter_model == 1
          }">
              <div class="d-flex justify-center bold" >
                {{'pending'}}
              </div>
              <v-divider inset/>
              <div class="d-flex justify-end align-center px-1">
                <span> 
                  {{invoice_model == 'credited' ? getDashboadDetails.invoices.credited.pending : getDashboadDetails.invoices.debited.pending }}
                </span>
              </div>
          </div>
        </v-col>
        <v-col class="mb-1 col-4 px-1">
          <div class="grey lighten-2 rounded elevation-1 pointer elevation-10" @click="filterModel(2)" :class="{
            'purpletext': filter_model == 2
          }">
              <div class="d-flex justify-center bold" >
                {{'paid (u)'}}
              </div>
              <v-divider inset/>
              <div class="d-flex justify-end align-center px-1">
                <span>
                  {{invoice_model == 'credited' ? getDashboadDetails.invoices.credited.unconfirmed : getDashboadDetails.invoices.debited.unconfirmed }}
                </span>
              </div>
          </div>
        </v-col>
        <v-col class="mb-1 col-4 px-1">
          <div class="grey lighten-2 rounded elevation-1 pointer elevation-10" @click="filterModel(3)" :class="{
            'greentext': filter_model == 3
          }">
              <div class="d-flex justify-center bold" >
                {{'paid'}}
              </div>
              <v-divider inset/>
              <div class="d-flex justify-end align-center px-1">
                <span>
                  {{invoice_model == 'credited' ? getDashboadDetails.invoices.credited.paid : getDashboadDetails.invoices.debited.paid }}
                </span>
              </div>
          </div>
        </v-col>
      </v-row>

      <fetching-items :message="`getting invoices`"  v-if="!pagination_links_set"/>

      <section v-if="getDebitedInvoices[0] && pagination_links_set && invoice_model == 'debited'">
          <!-- <invoice-strip v-for="invoice in getDebitedInvoices" :key="invoice.id" :invoice="invoice"/> -->
          <div class="limiting_wrapper" v-if="getDebitedInvoices[0] && !($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
            <invoice-strip v-for="invoice in getDebitedInvoices" :key="invoice.id" :invoice="invoice"/>
          </div>

          <div v-if="getDebitedInvoices[0] && ($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
            <d-invoice-card :invoices="getDebitedInvoices" :debited="true"/>
          </div>
      </section>
      
      <section v-if="getCreditedInvoices[0] && pagination_links_set && invoice_model == 'credited'">
          <!-- <invoice-strip v-for="invoice in getCreditedInvoices" :key="invoice.id" :invoice="invoice"/> -->
          <div class="limiting_wrapper" v-if="getCreditedInvoices[0] && !($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
            <invoice-strip v-for="invoice in getCreditedInvoices" :key="invoice.id" :invoice="invoice"/>
          </div>

          <div v-if="getCreditedInvoices[0] && ($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
            <d-invoice-card :invoices="getCreditedInvoices" :debited="false"/>
          </div>
      </section>

      <section>
        <v-row class="padder  d-flex justify-center" v-if="
          (!getDebitedInvoices[0] && pagination_links_set && invoice_model == 'debited') ||
          (!getCreditedInvoices[0] && pagination_links_set && invoice_model == 'credited') 
        ">
          <div class="padded mb-4">
            <v-row class="no-gutters d-flex align-center">
              <v-col class="col-12 col-md-6">
                <EmptyHere />
              </v-col>
              <v-col class="col-12 col-md-6">
                You have no {{invoice_model}} invoices yet. You will be able to create an invoice once you have a task that is completed. To create an invoice click on the plus sign above
                and follow the process. You can create an invoice to either pay for a writer or get paid by a broker. Alternatively, you may go to the completed task's chat and click on 'create invoice',
                this method however allows you to create an invoice for that single task. If you wish to create for several tasks for the same writer or broker then use the former method. 
                We currently do not support payments therefore you will have to manually mark the invoice as paid. If you are the broker and mark an invoice as paid, the writer will have to 
                confirm that indeed it is paid. However, confirmation will not be required if you are the writer and mark it as paid.
              </v-col>
            </v-row>
          </div>
        </v-row>
      </section>

      <v-row class="d-flex justify-center mt-4" v-if="pagination_links_set && invoice_model == 'credited' && getCreditedInvoices[0] ">
        <v-col class="col-1 white--text mt-4 primary-color text-center" v-for="(link, i) in pagination_links" 
        :key="i" 
        :class="{
        'red': link.active,
        'grey': ((getCreditedInvoicesPaginatationDetails.current_page === getCreditedInvoicesPaginatationDetails.last_page) && link.next) ||
                (getCreditedInvoicesPaginatationDetails.current_page === 1) && link.previous
        }"
        @click="goToPage(link.url)">
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

      <v-row class="d-flex justify-center mt-4" v-if="pagination_links_set && invoice_model == 'debited' && getDebitedInvoices[0]">
        <v-col class="col-1 white--text mt-4 primary-color text-center" v-for="(link, i) in pagination_links" 
        :key="i" 
        :class="{
        'red': link.active,
        'grey': ((getDebitedInvoicesPaginatationDetails.current_page === getDebitedInvoicesPaginatationDetails.last_page) && link.next) ||
                (getDebitedInvoicesPaginatationDetails.current_page === 1) && link.previous
        }"
        @click="goToPage(link.url)">
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
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import TitleStrip from '../../components/dashboard/TitleStrip.vue';
import InvoiceStrip from '../../components/dashboard/InvoiceStrip.vue';
import EmptyHere from '../../components/widgets/EmptyHere.vue';
import FetchingItems from '../../components/widgets/FetchingItems.vue';
import DInvoiceCard from '../../components/dashboard/desktop/DInvoiceCard.vue';

export default {
    name: 'Invoices',

    components:{ TitleStrip, InvoiceStrip, EmptyHere, FetchingItems, DInvoiceCard },

    computed:{
        ...mapGetters(['getDebitedInvoices', 'getCreditedInvoices', 'getDashboadDetails', 'getCreditedInvoicesPaginatationDetails', 'getDebitedInvoicesPaginatationDetails']),
        pagination_links(){
          if(this.invoice_model == 'credited'){
            let links = []
            this.getCreditedInvoicesPaginatationDetails.links.forEach(link => {
              link.previous = link.label == "&laquo; Previous"
              link.next = link.label == "Next &raquo;"
              links.push(link)
            });
            return links
          } else {
            let links = []
            this.getDebitedInvoicesPaginatationDetails.links.forEach(link => {
              link.previous = link.label == "&laquo; Previous"
              link.next = link.label == "Next &raquo;"
              links.push(link)
            });
            return links
          }
        },
    },

    data(){
      return{
        invoice_model: 'credited',
        pagination_links_set: false,
        filter_model: null
      }
    },

    methods: {
      ...mapActions(['getInvoicesPaginated']),
      filterModel(status){
        this.pagination_links_set = false
        this.filter_model = status
        const data = {
          status: this.filter_model
        }
        if(this.invoice_model == 'credited'){
          data.credited = true
        }
        this.getInvoicesPaginated(data).then((res) => (
          this.pagination_links_set = true
        ))
      },
      goToPage(page_link){
        this.pagination_links_set = false
        if(this.invoice_model == 'credited'){
          const data = {
            link: page_link,
            credited: true
          }
          if(this.filter_model){
            data.status = this.filter_model
          }
          this.getInvoicesPaginated(data).then((res) => (
            this.pagination_links_set = true
          ))
        } else {
          const data = {
            link: page_link,
          }
          if(this.filter_model){
            data.status = this.filter_model
          }
          this.getInvoicesPaginated(data).then((res) => (
            this.pagination_links_set = true
          ))
        }
        
      },
      setInvoiceModel(code){
        if(this.invoice_model == code){return}
        this.filter_model = null
        if(code == 'credited'){
          const data = {
            credited: true
          }
          this.getInvoicesPaginated(data).then((res) => (
            this.pagination_links_set = true
          ))
        } else {
          const data = {}
          this.getInvoicesPaginated(data).then((res) => (
            this.pagination_links_set = true
          ))
        }
        this.invoice_model = code
      },

      go(code){
          this.$router.push('/' + code)
      },
    },

    mounted(){
      if(this.getCreditedInvoices.length < this.getDebitedInvoices.length){
        this.invoice_model = `debited`
        const data = {}
        this.getInvoicesPaginated(data).then((res) => (
          this.pagination_links_set = true
        ))
      } else {
        const data = {
          credited: true
        }
        this.getInvoicesPaginated(data).then((res) => (
          this.pagination_links_set = true
        ))
      }
      
    }
}
</script>
<style lang="css" scoped>
.main-wrapper{
  overflow-x: hidden;
  min-height: calc(100vh - 50px);
}
  .limiting_wrapper{
    max-height: 70vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .col-block{
    position: relative;
  }
  .col-block::after{
    content: '';
    border-bottom: solid 1px white;
    position: absolute;
    bottom: 0;
    width: 80%;
    left: 10%;
  }
  .backg{
    color: rgb(15,14,56);
    font-size: 2rem;
  }
   .username{
    font-weight: 900;
    font-size: 1.2rem;
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
  .backg{
    color: rgb(15,14,56);
    font-size: 2rem;
  }
  .backgs{
    background-color: rgb(15,14,56);
  }
  .bold{
    font-weight: 900;
  }
  
  .bold-tiny{
  font-weight: 900;
  font-size: 0.9rem;
}
  .list{
    background-color: rgb(231, 231, 231); 
    /* border-left: solid 20px red; */
  }
  .usn-block{
    position: relative;
  }
  .usn-block::after{
    content: '';
    border-bottom: solid 1px white;
    position: absolute;
    bottom: 0;
    width: 80%;
    left: 10%;
  }
  .redtext{
    color: red;
  }
  .purpletext{
    color: purple;
  }
  .greentext{
    color: green;
  }
  .yellowtext{
    color: yellow;
  }
  .credited{
    border-right: solid 1px white;
  }
  .debited{
    border-left: solid 1px white;
  }
  .underline{
    text-decoration: underline;
  }
</style>
