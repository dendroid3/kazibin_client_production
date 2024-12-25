<template>
    <div class="pa-2 wrapper pointer" :class="{
        redlist: account.status == 'pending', 
        greenlist: account.status == 'active', 
        blacklist: account.status == 'closed'
    }"
    @click="goView">
        <section>
            <span class="head pointer uppercase">
                {{ `${account.code}: ${account.provider} Account` }}
            </span>
            <br>
            <br>
            <span class="uppercase">
                {{ `PROXY: ` }}
                {{ account.proxy ? account.proxy : 'No Proxy' }}
            </span>
            <br>
            <span class="uppercase">
                {{ `STATUS: ${account.status}` }}  
            </span>
            <br>
            <span class="uppercase">
                {{ `TOTAL EARNED: ${formatMoney(account.total_revenue)}`}}
            </span>
        </section>
    </div>
</template>

<script>
export default {
    name: "ManagedAccountsStrip",

    props: [
        'account'
    ],

    methods: {
        formatMoney (cost) {
            let money_format = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });

            return money_format.format(cost)
        },
    }
}
</script>
