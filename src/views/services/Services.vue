<template>
    <div class="main-wrapper white">
        <div class="col-12 grey lighten-2">
            <span class="heading primary-color-text">
              {{"Services"}}
            </span> 
        </div>
        {{ getCartItems }}
        <section v-for="(services, category) in getServices" :key="category">
            <h3 class="px-4">
                {{ category }}
            </h3>
            <v-row class="limiting_wrapper no-gutters">
                <v-col class="col-12 col-md-6 py-2"  v-for="(service, i) in services" :key="i">
                    <service-card :service="service"/>
                </v-col>
            </v-row>
        </section>
        <div class="cart-button">
            <v-icon large class="white--text">
                mdi-cart
            </v-icon>
            <span class="cart-counter">
                {{ getCartItems.length }}
            </span>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex/dist/vuex.common.js';
import ServiceCard from './ServiceCard.vue'

export default {
    name: 'Services',

    components: {ServiceCard},

    computed: {
        ...mapGetters(['getServices', 'getCartItems'])
    },

    methods: {
        ...mapActions(['fetchServices'])
    },

    mounted() {
        this.fetchServices()
    }
}
</script>
<style lang="css" scoped>
  .backg{
      color: rgb(15,14,56);
      font-size: 2rem;
  }

  .main-wrapper{
      padding-bottom: 0.5rem; 
      position: relative;
  }

  .cart-button{
    position: fixed;
    bottom: 2rem;
    z-index: 9999;
    right: 2rem;
    background-color: rgb(15,14,56);
    color: white;
    border-radius: 50%;
    padding: 0.5rem;
    cursor: pointer;
  }

  .cart-counter{
    color: white;
    font-weight: 800;
    position: absolute;
    top: -0.25rem;
    right: -0.25rem;
    width: 1.5rem;
    height: 1.5rem;
    background-color: rgb(15,14,56);
    border-radius: 50%;
    text-align: center;
  }
</style>