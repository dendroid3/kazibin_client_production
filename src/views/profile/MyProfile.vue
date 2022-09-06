<template>
    <div>
        <v-row class="d-flex grey lighten-2 align-center no-gutters">
            <v-col class="col-8 pl-4 backg"> my profile
            </v-col>
        </v-row>
        <section class="pa-2">
            <v-row class="no-gutters bold">
                <v-col class="col-3">
                    {{"USERNAME:  " }}
                </v-col>
                <v-col class="col-9">
                    {{getUser.username}}
                </v-col>
            </v-row>
            <v-row class="no-gutters bold">
                <v-col class="col-3">
                    {{"CODE:  " }}
                </v-col>
                <v-col class="col-9">
                    {{getUser.code}}
                </v-col>
            </v-row>
            <v-row class="no-gutters bold">
                <v-col class="col-3">
                    {{"EMAIL:  " }}
                </v-col>
                <v-col class="col-9">
                    {{getUser.email}}
                </v-col>
            </v-row>
            <v-row class="no-gutters bold">
                <v-col class="col-5">
                    {{"PHONE NUMBER:  " }}
                </v-col>
                <v-col class="col-7 d-flex align-center">
                    {{"+254 " + getUser.phone_number}}
                </v-col>
            </v-row>
            <v-row class="no-gutters bold">
                <v-col class="col-3">
                    {{'AVAILABLE: '}}
                </v-col>
                <v-col class="col-9 align-center d-flex">
                    <span>
                        {{getUser.availabile ? "YES" : "NO"}}
                    </span>
                    <v-btn x-small class="red mx-4 white--text" v-if="available" @click="changeMyAvailability(false)">
                        change to no
                    </v-btn>
                    <v-btn x-small class="green mx-4 white--text"  v-if="!available" @click="changeMyAvailability(true)">
                        change to yes
                    </v-btn>
                </v-col>
            </v-row>
            <v-row class="no-gutters bold">
                <v-col class="col-2">
                    {{"BIO:  " }}
                </v-col>
                <v-col class="col-10 d-flex align-center" @click="is_bio_text_box_open = true" v-if="(is_bio_text_box_open == false && !bio_is_updated)">
                    {{getUser.bio ? getUser.bio + "Click this text to change bio" : "You have not set a bio yet click on this text to set your bio."}}
                </v-col>
                <v-col class="col-10 d-flex align-center" @click="is_bio_text_box_open = true" v-if="(is_bio_text_box_open == false && bio_is_updated)">
                    {{this.user.bio + ". Click to change bio"}}
                </v-col>
                <v-col class="col-10 offset-1" v-if="is_bio_text_box_open">
                    <v-textarea 
                    outlined
                    type="name"
                    hint="Be concise, most users don't have the time to read long paragraphs. This is a writing platform, prove that your writing is concise."
                    v-model="user.bio"
                    label="bio"
                    required
                    > </v-textarea>
                    <div class="d-flex justify-end" @click="is_bio_text_box_open = false">
                        <v-btn small class="red mr-1 white--text">
                            close
                        </v-btn>
                        <v-btn small class="green white--text" :loading="setting_bio" @click="changeMyBio">
                            send
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
            <v-row class="no-gutters bold">
                <v-col class="col-3">
                    {{"INTERESTS:  " }}
                </v-col>
                <v-col class="col-9" @click="is_interest_box_open = true" v-if="(is_interest_box_open == false && !interests_updated)">
                    {{getUser.interests ? getUser.interests : 'You have not set your interests.Click on this text to set your interests.'}}
                </v-col>
                <v-col class="col-9" @click="is_interest_box_open = true" v-if="(is_interest_box_open == false && interests_updated)">
                    {{this.user.interests+ '. Click on this text to change your interests.'}}
                </v-col>
                <v-col class="col-10 offset-1" v-if="is_interest_box_open">
                    <v-text-field 
                    clearable
                    outlined
                    hint="Write several of your interest areas (not more than 4, you'll seem insincere) separated by a comma like: civil engineering, AutoCard"
                    type="name"
                    v-model="user.interests"
                    label="units you are interested in"
                    required
                    > </v-text-field> 
                    
                    <div class="d-flex justify-end">
                        <v-btn small class="red mr-1 white--text" @click="is_interest_box_open = false">
                            close
                        </v-btn>
                        <v-btn small class="green white--text" :loading="setting_interests" @click="setInterests">
                            send
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
            <v-row class="no-gutters bold">
                <v-col class="col-5">
                    {{"IDENTIFIED AS:  " }}
                </v-col>
                <v-col class="col-7 d-flex align-center">
                    {{(getUser.broker_score > getUser.writer_score) ? "BROKER" : "WRITER"}}
                </v-col>
            </v-row> 
            <v-row class="no-gutters bold">
                <v-col class="col-5">
                    {{"BROKER SCORE:  " }}
                </v-col>
                <v-col class="col-7 d-flex align-center">
                    {{getUser.broker_score}}
                </v-col>
            </v-row>
            <v-row class="no-gutters bold">
                <v-col class="col-5">
                    {{"WRITER SCORE:  " }}
                </v-col>
                <v-col class="col-7 d-flex align-center">
                    {{getUser.writer_score}}
                </v-col>
            </v-row>
        </section>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'MyProfile',

    computed:{
        ...mapGetters(['getUser'])
    },

    data(){
        return{
            user: {},
            is_bio_text_box_open: false,
            is_interest_box_open: false,
            available: false,
            setting_interests: false,
            interests_updated: false,
            bio_is_updated: false,
            setting_bio: false
        }
    },

    methods:{
        ...mapActions(['setMyInterests', 'changeBio', 'changeAvailability']),

        changeMyAvailability(available){
            this.changing_availability = true
            const data = {
                available: available
            }
            this.changeAvailability(data).then((res) => (
                this.changing_availability = false,
                this.available = available
            ))
        },

        changeMyBio(){
            this.setting_bio = true
            const data = {
                bio: this.user.bio
            }
            this.changeBio(data).then((res) => (
                this.setting_bio = false,
                this.bio_is_updated = true,
                this.is_bio_text_box_open = false
            ))
        },

        setInterests(){
            const interests_array = this.user.interests.split(',')
            let interests = ''

            interests_array.forEach(interest => {
                let interest_stub = "\n---" + interest
                interests = interests + interest_stub
            });

            let confirmation = (interests_array.length > 1 ? "These are your interests" : "This is your interest") + interests + "\nProcced?"
            if(!confirm(confirmation)){return}
            this.setting_interests = true
            const data = {
                interests: this.user.interests
            }

            this.setMyInterests(data).then((res) => (
                this.setting_interests = false,
                this.interests_updated = true,
                this.is_interest_box_open = false
            ))
        }
    },

    mounted(){
        console.log(this.getUser)
    }
}
</script>
<style lang="css" scoped>
    
</style>