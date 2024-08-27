<template>
    <div>
        <v-row class="limiting_wrapper no-gutters">
            <v-col class="col-12 col-md-6 mb-2"  v-for="(task, i) in 10" :key="i">
                <account-card />
            </v-col>
        </v-row>
    </div>
</template>
<script>
import AccountCard from './AccountCard.vue';
export default{
    name: "AccountsStrip"
}
</script>
