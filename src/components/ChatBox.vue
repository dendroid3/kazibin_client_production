<template>
    <div class="bg-fy">
        <div style=" padding-top: 6rem; z-index: 1;">
            <iframe :src="download_url" frameborder="0" class="d-none" v-for="(download_url, i) in download_urls" ::key="i"></iframe>
            <v-row class="d-flex no-gutters" style="background-color: transparent; "
            v-for="message in messages" 
            :key="message.created_at" 
            :class="{ all_right: message.mine }">
                <v-col class="col-12 px-1" :class="{
                'center d-flex': !message.mine  && ( message.user_id == 1), 
                'right': message.mine, 
                'left': !message.mine  && message.user_id != 1, 
                }">
                    <span class="pa-1 rounded" v-if="(message.type == 'text')" :class="{
                        'grey darken-2 pa-0 white--text': message.user_id == 1,
                        'blue-ish-message-box': message.mine, 
                        'white-message-box': !message.mine  && message.user_id != 1, 
                    }">
                        {{message.message}}
                    </span>
                    <span class="white-message-box pa-1 rounded" v-else>
                        
                        <v-icon small class="pa-2 green--text" v-if="!isImage(message.message)">mdi-file</v-icon>
                        <v-icon small class="pa-2 green--text" v-if="isImage(message.message)">mdi-image</v-icon>
                        
                        {{message.message | refineFileNameMessage}}

                        <v-icon x-small class="pa-1 white--text green rounded" @click="downloadFile(message)">mdi-arrow-collapse-down</v-icon>
                        
                    </span>
                </v-col>
            </v-row>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'ChatBox',

    props: ['messages', 'type'],

    computed:{
        ...mapGetters(['getUser'])
    },

    data(){
        return {
            download_urls: [],
        }
    },

    filters:{
        refineFileNameMessage: (name) => {
        if(name.length > 20 ){
            return name.substring(0, 20) + '...'
        } else {
            return name.substring(0, name.lastIndexOf('.'))
        }
        },
    },

    methods: {
        ...mapActions(['openAlert']),
        isImage(url){
        let base = url.substring((url.lastIndexOf('.') + 1), (url.lastIndexOf('.') + 4))
        if(base == 'jpg' || base =='png' || base =='jpe' || base =='svg'){
            return true
        }
        return false
        },

        downloadFile(message){
            const text = {
                code: 'info',
                message: message.message + " will download soon. If it the download does not start in 10 seconds then you might have slow internet. Please try again. If this persists then call us right away!"
            }

            this.openAlert(text)

            const download_url = process.env.VUE_APP_API + "download?type=" + this.type + "&message_id=" + message.id + "&user_id=" + this.getUser.id
            this.download_urls.push(download_url)
        }
    }
}
</script>
<style>
    .white-message-box{
        background-color: white;
    }

    .blue-ish-message-box{
        background-color: rgb(165, 164, 255);
    }
    
    .left{
        text-align: left;
        margin-right: 3rem;
        border-radius:10px;
        color: black;
        padding:  0.5rem 0.5rem;
    } 

    .center{
        text-align: center;
        justify-content: center;
        border-radius:10px;
        color: black;
        padding: 0.75rem;
    }

    .right{
        text-align: right;
        margin-right: 0.3rem;
        right: 0;
        border-radius:10px;
        padding: 0.5rem 0.5rem;
    } 
    
    .filemessage{
        width: 60vw;
    }
</style>