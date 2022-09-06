<template lang="html">
    <div class="pt-4">
        <v-row class="no-gutters pt-4 mt-4">
            <v-col class="col-8 offset-2 pa-4">
                <v-img class="" :src="require(`../assets/pageNotFound.svg`)" contain />
            </v-col>
            <v-col class="col-8 offset-2 px-4 d-flex justify-center tomato-text bold">
                {{"Ooops! Page Not Found!"}}
            </v-col>
            <v-col class="col-8 offset-2 px-4 d-flex justify-center primary-color-text">
                {{"Go to either of these pages instead:"}}
            </v-col>
            <v-col class="col-8 offset-2 px-4 d-flex justify-center ">
                <v-btn class="mx-1 white--text" @click="go('/')" style="background-color: tomato;">Home</v-btn>
                <v-btn class="mx-1 white--text" @click="go('/Dashboard')" style="background-color: tomato;">Dashboard</v-btn>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    name: 'PageNotFound',

    methods:{
        go(code){
            this.$router.push(code)
        }
    }
}
</script>
<style lang="css" scoped>
    
</style>