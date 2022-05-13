<template>
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
              {{'broker'}}
            </span>
          </div>
        </v-list-item-avatar>
      </div>
      <v-list-item-content>
        <div class="d-flex align-center white--text text-h6" @click="goToProfile">
          {{getUser.username}} 
          <v-spacer />
        </div>
        <div class="white--text text-h6" @click="goToProfile">
          {{getUser.code}} 
        </div>
          <div class="d-flex text-caption align-center text-h6 white--text font-weight-light">
            {{5}}
            <v-icon color="yellow mb-4" x-small>
              mdi-star
            </v-icon>
            <v-icon color="yellow mb-4" x-small>
              mdi-star
            </v-icon>
            <v-icon color="yellow mb-4" x-small>
              mdi-star
            </v-icon>
            <v-icon color="yellow mb-4" x-small>
              mdi-star
            </v-icon>
            <v-icon color="yellow mb-4" x-small>
              mdi-star
            </v-icon>
          </div>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UserCard',
  computed:{
    ...mapGetters(['getUser']),
    initials(){
      let str = this.getUser.username
      let matches = str.match( /\b(\w)/g )
      return matches.join('')
    }
  },
  methods:{
    goToProfile(){
      this.$router.push('/' + this.getUser.code)
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
