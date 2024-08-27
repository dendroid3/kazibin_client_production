<template>
    <div class="main-wrapper white">
        <div class="col-12 grey lighten-2">
            <span class="heading primary-color-text">
              {{"Accounts Marketplace"}}
            </span> 
        </div>
        <div>
        <v-row class="limiting_wrapper no-gutters">
            <v-col class="col-12 col-md-6 mb-2"  v-for="(task, i) in 10" :key="i">
                <account-card />
            </v-col>
        </v-row>
        </div>
    </div>
</template>
<script>
import AccountCard from '../../components/marketplace/AccountCard.vue';
export default {
    name: "Marketplace",

    components: {
        AccountCard
    }
}
</script>
<style lang="css" scoped>
    .backg{
        color: rgb(15,14,56);
        font-size: 2rem;
    }

    .main-wrapper{
        padding-bottom: 5rem;
    }
</style>
