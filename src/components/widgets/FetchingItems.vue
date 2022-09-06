<template lang="html">
    <div>
        <div style="margin-top: 50px;" class="center">
        </div>

        <v-row class="no-gutters">
            <v-col class="col-4 offset-4">
            <v-progress-linear
                indeterminate
                rounded
                color="blue darken-2"
                height="5"
            ></v-progress-linear>
            </v-col>
        </v-row>
        <v-row class="no-gutters">
            <v-col class="col-12 blue--text d-flex justify-center darken-2">
            {{message}}
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    name: 'FetchingItems',

    props: ['message']
}
</script>
