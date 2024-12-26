<template>
    <tr class="odd gradeX pa-2 wrapper pointer" :class="{
        redlist: account.status == 'pending', 
        greenlist: account.status == 'active', 
        blacklist: account.status == 'closed'
    }">
        <td class="text-center">{{ account.code }}</td>
        <td class="text-center">
            {{ account.provider }}
        </td>
        <td class="text-center">
            {{ account.proxy ? account.proxy : 'No Proxy' }}
        </td>
        <td class="text-center">
            {{ account.status }}
        </td>
        <td class="text-center">
            {{ account.total_revenue }}
        </td>
        <td class="text-center">
            <div class="d-flex justify-center">
                <v-icon class="blue--text" @click="goView">
                    mdi-eye
                </v-icon>
                <v-icon class="red--text" @click="intitializeDeleteAccount">
                    mdi-delete
                </v-icon>
            </div>
        </td>
    </tr>
</template>
<script>
export default{
    name: "DManagedAccountCard.vue",

    props: [
        'account',
        'index'
    ],


    methods: {
        formatMoney (cost) {
            let money_format = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });

            return money_format.format(cost)
        },

        // goView() {
        //     this.setCurrentAccountInView(this.account)
        //     this.$router.push(`/m/${this.account.code}`)
        // }
    },
}
</script>
