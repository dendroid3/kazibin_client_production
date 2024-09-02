<template>
    <div class="pa-2 wrapper pointer" :class="{
    redlist: account.display == 0, 
    greenlist: account.display == 1, 
    }">
        <section>
            <span class="head pointer uppercase">
                {{ `${account.code}: ${account.title} Account` }}
            </span>
            <br>
            <br>
            <span class="uppercase">
                {{ `PROFILE: ${account.profile_origin} ( ${account.profile_gender} )` }}
            </span>
            <br>
            <span class="uppercase">
                {{ `PENDING ORDERS: ${account.pending_orders}` }}  
            </span>
            <br>
            <span class="uppercase">
                {{ `TOTAL ORDERS: ${account.total_orders}`}}
            </span>
            <br>
            <span class="uppercase">
                {{ `RATING: ${account.rating}%` }} 
            </span>
            <br>
            <span class="uppercase">
                {{ `COST: ${formatMoney(account.cost)} ( ` }}
                {{ account.negotiable ? 'Negotiable )' : 'Non-negotiable )' }}
            </span>
        </section>
    </div>
</template>
<script>
export default {
    name: "AccountsStrip",

    props: [
        'account'
    ],

    methods: {
        formatMoney (cost) {
            let money_format = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'KES',
            });

            return money_format.format(cost)
        }
    }
}
</script>
<style lang="css" scoped>
 .head{
    font-size: 1rem;
    font-weight: 800;
  }
 .head::after{
    font-size: 1rem;
    font-weight: 800;
  }
  .wrapper{
    position: relative;
  }
  .wrapper::after{
    content: '';
    border-bottom: solid 1px white;
    position: absolute;
    bottom: 0;
    width: 80%;
    left: 10%;
  }
</style>
