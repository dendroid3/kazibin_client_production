<template>
    <div class="bg-fy">
        <div style=" padding-top: 6rem; margin-bottom: 5rem; z-index; 1;">
            <div>

                <div class="d-flex message " style="background-color: transparent; "
                v-for="message in messages" 
                :key="message.created_at" 
                :class="{ all_right: message.mine }">
                    <div style="min-height: 3rem; "  class="col-12">
                    <div :class="{
                    'center d-flex': !message.mine  &&( message.user_id == 1), 
                    'right white': message.mine && (message.type == 'text') && (message.type == 'text'), 
                    'file-right white': message.mine && !(message.type == 'text'), 
                    'left white': !message.mine  && message.user_id != 1 && (message.type == 'text'), 
                    'file-left white': !message.mine  && message.user_id != 1 && !(message.type == 'text'), 
                    }">
                        <div v-if="message.type == 'text'"  >
                        {{message.message }}
                        </div>
                        <v-row v-else class="no-gutters grey lighten-3">
                        <v-col class="col-2 d-flex align-center">
                            <v-icon small class="pa-2 green--text" v-if="!isImage(message.message)">mdi-file</v-icon>
                            <v-icon small class="pa-2 green--text" v-if="isImage(message.message)">mdi-image</v-icon>
                        
                        </v-col>
                        
                        <v-col class="col-8 align-center black--text d-flex justify-center">
                            {{message.message | refineFileNameMessage}}
                        </v-col>
                        
                        <v-col class="col-2 d-flex align-center justify-end">
                            <v-icon x-small class="pa-1 white--text green rounded">mdi-arrow-collapse-down</v-icon>
                        </v-col>
                        </v-row>
                    </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ChatBox',

    props: ['messages'],

    methods: {
        isImage(url){
        let base = url.substring((url.lastIndexOf('.') + 1), (url.lastIndexOf('.') + 4))
        if(base == 'jpg' || base =='png' || base =='jpe' || base =='svg'){
            return true
        }
        return false
        },
    }
}
</script>
<style>
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
  .file-left{
    border: 1px black solid;
    text-align: left;
    margin-right: 3rem;
    border-radius:10px;
    color: black;
    padding:  0.5rem 0.5rem;
  }
  .file-right{
    text-align: right;
    margin-right: 0.3rem;
    right: 0;
    border-radius:10px;
    border: 1px black solid;
    padding: 0.5rem 0.5rem;
  }
  
</style>