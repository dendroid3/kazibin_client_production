<template>
    <div class="pa-2">
        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr class="grey white--text">
                    <th>Code</th>
                    <th>Name</th>
                    <th>Profile</th>
                    <th>Pending Orders</th>
                    <th>Total Orders</th>
                    <th>Total Earned</th>
                    <th>Cost</th>
                    <th>Terms</th>
                    <th>Display</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <d-account-card v-for="(account, index) in accounts" :key="account.id" :account="account" :index="index" />
            </tbody>
        </table>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import DAccountCard from './DAccountCard'
export default{
    name: "DAccountsCard",

    props: [
        'accounts'
    ],

    components: {DAccountCard},

}
</script>
<style lang="css" scoped>
.position-relative {
    position: relative;
    height: 100%;
}

.switch-wrapper {
    position: absolute;
    right: 50%;
    transform: translate(65%, 0%);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

