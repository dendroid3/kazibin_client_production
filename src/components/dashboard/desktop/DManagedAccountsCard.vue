<template>
    <div class="pa-2">
        <table class="table table-striped table-bordered table-hover">
            <thead>
                <tr class="grey white--text">
                    <th>Code</th>
                    <th>Provider</th>
                    <th>Proxy</th>
                    <th>Status</th>
                    <th>Payday</th>
                    <th>Total Earned</th>
                    <th>Total Owing</th>
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
import DAccountCard from './DManagedAccountCard'
export default{
    name: "DManagedAccountsCard.vue",

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

