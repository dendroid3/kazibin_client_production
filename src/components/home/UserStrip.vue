<template>
    <div>
        <v-card class="grey lighten-3 my-1 mx-2 pointer" @click="view">
            <v-row class="no-gutters">
                <v-col class="col-12 px-4 username d-flex justify-center primary-color-text">
                    {{broker ? broker.code + ": " + upperCase(broker.username) : writer.code + ": " + upperCase(writer.username)}}
                    <span class="ml-4" v-if="writer">
                        <span v-if="writer.credential_verification">
                            <v-icon class="rounded ml-4 white primary-color--text">
                                mdi-check
                            </v-icon>
                        </span>
                    </span>
                    <span v-else class="ml-4">
                            <span v-if="broker.credential_verification">
                                <v-icon class="rounded ml-4 white primary-color--text">
                                    mdi-check
                                </v-icon>
                            </span>
                        </span>
                </v-col>
                <v-col class="col-4 px-4">
                    <v-list-item-avatar
                        tile
                        size="80"
                        color="tomato"
                        class="align-center justify-center"
                    >
                        <div class="white--text">
                            <span class="d-flex initials">
                                {{broker ? initials(broker.username) : initials(writer.username)}}
                            </span>
                            <v-divider dark/>
                            <span v-if="broker">
                                {{'broker'}}
                            </span>
                            <span v-if="writer">
                                {{'writer'}}
                            </span>
                        </div>
                    </v-list-item-avatar>
                </v-col>

                <v-col class="col-8 metrics">
                    <div>
                    {{broker ? 'Posted :: ' + broker.total_tasks : 'Taken :: ' + writer.total_tasks}}
                    </div>
                    <div>
                    {{broker ? 'Available :: ' + broker.available_tasks : 'Underway :: ' + writer.underway_tasks }}
                    </div>
                    <div>
                    {{broker ? 'Cancelled :: ' + broker.cancelled_tasks : 'Cancelled :: ' + writer.cancelled_tasks}}
                    </div>
                    <div>
                    {{broker ? 'Writers :: ' + broker.writers : "Brokers :: " + writer.brokers}}
                    </div>
                    <div>
                        {{broker ? 'Member Since :: ' + memberSince(broker.created_at) : 'Member Since :: ' + memberSince(writer.created_at)}}
                    </div>
                </v-col>
            </v-row>
            <v-row class="px-4 mx-4 py-2" v-if="broker && broker.interests">
                <div class="px-4 white rounded mx-2 my-1" style="font-size: 0.95rem;" v-for="(interest, i) in split(broker.interests)" :key="i">
                    {{interest}}
                </div>
            </v-row>
            <v-row class="px-4 mx-4 py-2" v-if="writer && writer.interests">
                <div class="px-4 white rounded mx-2 my-1" style="font-size: 0.95rem;" v-for="(interest, i) in split(broker.interests)" :key="i">
                    {{interest}}
                </div>
            </v-row>
        </v-card>
    </div>
</template>
<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { mapActions } from 'vuex'
export default {
    name:'UserStrip',

    props:['broker', 'writer'],

    methods: {
        ...mapActions(['setViewBroker', 'setViewWriter']),

        initials(username){
            let matches = username.match( /\b(\w)/g )
            return matches.join('').substring(0,2)
        },

        memberSince(created_at){
            if(!created_at){return 'over'}
            return dayjs(created_at).format('MMM   YYYY')
        },
        view(){
            if(this.broker){
                this.setViewBroker(this.broker)
                this.$router.push('/Broker/' + this.broker.code)
            } else {
                // alert("writer" +this.user.code)
                this.setViewWriter(this.writer)
                this.$router.push('/Writer/' + this.writer.code)
            }
        },

        upperCase(name){
            return name.toUpperCase()
        },

        split(string){
            return string.split(",")
        }

    },

    created(){
        dayjs.extend(relativeTime)
    }

}
</script>
<style lang="css" scoped>
    .metrics{
        font-weight: 900;
        font-size: 0.75rem;
    }
    .username{
        font-weight: 900;
        font-size: 1.2rem;
        text-decoration: underline;
    }
    .initials{
        font-size:3rem; 
        font-weight: 900;
    }
</style>