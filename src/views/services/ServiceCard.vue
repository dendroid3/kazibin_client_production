<template>
    <v-card class="grey lighten-4 wrapper pa-2 mt-1 relative mx-2 rounded">
        <!-- {{ service.name }}
        <br>
        {{ service.cost }} -->

        <v-img
        src="https://kazibin.nyc3.cdn.digitaloceanspaces.com/Accounts/PK-AZX/NedX6Xq02ZAowvTHHYo9b09bHDpOY1eNP7c1fUVi.png"
        class="align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        cover
      >
      </v-img>

      <v-card-title class="text-white py-0" v-text="`${service.name}`"></v-card-title>
      <v-card-title class="text-white py-0" v-text="`KES ${service.cost}`"></v-card-title>

      <v-card-actions class="py-0">
        <v-spacer></v-spacer>
        <v-btn
          color="blue"
          icon="mdi-share-variant"
          size="large"
          @click="addService"
        >
            <v-icon large>
                mdi-cart
            </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
</template>
<script>
import { mapActions } from 'vuex/dist/vuex.common.js';

export default {
    name: "ServicesCard",

    props: ['service'],

    methods: {
        ...mapActions(['addItemToCart']),
        addService() {
            const confirmation = `You are about to add ${this.service.name} to your cart.\nProceed?`
            if(!confirm(confirmation)) {return}
            this.addItemToCart(this.service)
        }
    }
}
</script>
<style lang="css" scoped>
    .head{
        font-size: 1rem;
        font-weight: 800;
    }
</style>

