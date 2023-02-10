<template>
   <div>
    <v-card
      class="mx-auto"
      color="rgb(15,14,56)"
      outlined
      style="border-top-left-radius: 0; border-top-right-radius: 0; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;"
      >
      <v-list-item four-line>
        <div  @click="goToProfile">
          <v-list-item-avatar
            class="elevation-20 tomato"
            tile
            size="80"
          >
          <div class="white--text">
              <span class="d-flex initials">
                {{initials}}
              </span>
              <v-divider dark/>
              <span>
                {{user_type}}
              </span>
            </div>
          </v-list-item-avatar>
        </div>
        <v-list-item-content>
          <div class="d-flex align-center white--text text-h6" @click="goToProfile">
            {{user.username}} 
            <v-spacer />
            <span v-if="user.credential_verification">
              {{ "[verified]" }}
            </span>
          </div>
          <div class="white--text text-h6" @click="goToProfile">
            {{user.code}} 
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
   </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UserCard',
  props:['user'],
  computed:{
    ...mapGetters(['getDashboadDetails']),
    initials(){
      let str = this.user.username
      let matches = str.match( /\b(\w)/g )
      return matches.join('')
    },
    user_type(){
      if(this.getDashboadDetails.posted.posted_all > this.getDashboadDetails.taken.taken_all){
        return 'broker'
      } else {
        return 'writer'
      }
    }
  },
  methods:{
    goToProfile(){
      this.$router.push('/' + this.user.code)
    }
  }
}
</script>
<style lang="css" scoped>
  .initials{
    font-size:3rem;
    font-weight: 900;
  }
</style>
