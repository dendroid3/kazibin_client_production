<template>
    <div class="wrapper d-flex align-center justify-center">
        <div>
            <v-row class="no-gutters">
                <v-col class="col-12 pa-4 d-flex justify-center">
                    <span >
                    <animated-icon style="height:70px;" />
                    </span>
                </v-col>
            </v-row>
            <fetching-items :message="`checking verification`" />
        </div>
    </div>
</template>
<script>
    import AnimatedIcon from '../../components/widgets/AnimatedIcon.vue';
    import FetchingItems from '../../components/widgets/FetchingItems.vue';
    import {mapActions} from 'vuex'
export default {
    name: 'VerifyEmail',

    components: {AnimatedIcon, FetchingItems},

    methods:{
        ...mapActions(['verifyEmail'])
    },

    mounted(){
        const email = this.$router.history.current.query.email
        const data = {
            email_verification: this.$router.history.current.params.email_verification,
            email: email
        }

        console.log(data)

        this.verifyEmail(data)

    }
}
</script>
<style lang="css" scoped>
    .wrapper{
        height: calc(100vh - 50px);
        overflow-y: hidden;
    }
</style>