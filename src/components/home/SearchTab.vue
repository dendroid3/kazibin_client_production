<template>
  <div>
    <v-row class="no-gutters d-flex align-center px-2">
      <v-col class="col-10 d-flex justify-center align-center pa-4">
        <input type="text" placeholder="enter user or job code" 
        v-model="search_code"
        class="px-4 input pa-1">
      </v-col>
      <v-col class="col-2 d-flex justify-center pa-4">
        <v-btn  class="success white--text"
        small 
        :loading="searching"
        @click="search">
          <v-icon>
            mdi-magnify
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <section v-if="response" style="padding-bottom: 2rem;">
      <section v-if="getFromHomeResults.user">
        <v-card class="grey lighten-4 my-1 mx-2 pointer">
          <v-row class="no-gutters">
              <v-col class="col-12 px-4 username d-flex justify-center primary-color-text">
                  {{getFromHomeResults.user.code + ": " + upperCase(getFromHomeResults.user.username) }}
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
                              {{initials(getFromHomeResults.user.username)}}
                          </span>
                          <v-divider dark/>
                          <span v-if="getFromHomeResults.user.broker_score > getFromHomeResults.user.writer_score">
                              {{'broker'}}
                          </span>
                          <span v-else>
                              {{'writer'}}
                          </span>
                      </div>
                  </v-list-item-avatar>
              </v-col>

              <v-col class="col-8 metrics">
                  <div>
                    {{"Writers:: " + getFromHomeResults.user.writers_count}}
                  </div>
                  <div>
                    {{"Posted:: " + getFromHomeResults.user.total_tasks_posted}}
                  </div>
                  <div>
                    {{"Brokers:: " + getFromHomeResults.user.brokers_count}}
                  </div>
                  <div>
                    {{"Taken:: " + getFromHomeResults.user.total_tasks_taken}}
                  </div>
                  <div>
                      {{'Member Since :: ' + memberSince(getFromHomeResults.user.created_at)}}
                  </div>
              </v-col>
          </v-row>
          <v-row class="px-4 mx-4 py-2" v-if="getFromHomeResults.user.interests">
            <div class="px-4 white rounded mx-2 my-1" style="font-size: 0.95rem;" v-for="(interest, i) in split(getFromHomeResults.user.interests)" :key="i">
                {{interest}}
            </div>
          </v-row>
          <v-row class="no-gutters pb-4 mb-4">
            <v-col class="col-6 d-flex justify-center">
              <v-btn small class="green white--text" @click="viewBrokerProfile">
                broker profile
              </v-btn>
            </v-col>
            <v-col class="col-6 d-flex justify-center">
              <v-btn small class="green white--text" @click="viewWriterProfile">
                writer profile
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </section>

      <section v-if="getFromHomeResults.task">
        <task-strip :task="getFromHomeResults.task"/>
      </section>

      <section v-if="!getFromHomeResults.task && !getFromHomeResults.user">
        <v-row>
          <v-col class="col-11 d-flex justify-end px-4">
            <v-icon class="rounded red white--text" @click="response = false">
              mdi-close
            </v-icon>
          </v-col>
        </v-row>
        <v-row class="no-gutters pt-4 mt-4">
          <v-col class="col-8 offset-2 pa-4">
            <v-img class="" :src="require(`../../assets/pageNotFound.svg`)" contain />
          </v-col>
          <v-col class="col-8 offset-2 px-4 d-flex justify-center tomato-text text-center bold">
              {{"Ooops! We found no user or task with that code!"}}
          </v-col>
          <v-col class="col-8 offset-2 px-4 d-flex justify-center text-center primary-color-text">
              {{"Go to either of these pages instead:"}}
          </v-col>
          <v-col class="col-8 offset-2 px-4 d-flex justify-center ">
              <v-btn class="mx-1 white--text" @click="go('/Explore/Writers')" style="background-color: tomato;">Writers</v-btn>
              <v-btn class="mx-1 white--text" @click="go('/Explore/Brokers')" style="background-color: tomato;">Brokers</v-btn>
              <v-btn class="mx-1 white--text" @click="go('/Explore/Task')" style="background-color: tomato;">Tasks</v-btn>
          </v-col>
        </v-row>
      </section>
    </section>

  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import TaskStrip from './TaskStrip.vue';

export default {
    name: "SearchTab",
    computed: {
        ...mapGetters(["getFromHomeResults"])
    },
    data() {
        return {
            search_code: null,
            searching: false,
            user_found: false,
            task_found: false,
            response: false
        };
    },
    methods: {
        ...mapActions(["searchFromHome", "setViewBroker", "setViewWriter"]),
        
        go(code){
            this.$router.push(code)
        },
        viewBrokerProfile() {
            this.setViewBroker(this.getFromHomeResults.user);
            this.$router.push("/Broker/" + this.getFromHomeResults.user.code);
        },
        viewWriterProfile() {
            this.setViewWriter(this.getFromHomeResults.user);
            this.$router.push("/Writer/" + this.getFromHomeResults.user.code);
        },
        search() {
            this.searching = true;
            const data = {
                code: this.search_code
            };
            this.searchFromHome(data).then((res) => (this.searching = false,
                this.response = true));
        },
        initials(username) {
            let matches = username.match(/\b(\w)/g);
            return matches.join("").substring(0, 2);
        },
        memberSince(created_at) {
            if (!created_at) {
                return "over";
            }
            return dayjs(created_at).format("MMM   YYYY");
        },
        upperCase(name) {
            return name.toUpperCase();
        },
        split(string) {
            return string.split(",");
        }
    },
    created() {
        dayjs.extend(relativeTime);
    },
    components: { TaskStrip }
}
</script>
<style lang="css" scoped>
  .input{
    border-radius: 5px; 
    background-color: white;
    border: solid black 1px;
    width: 100%;
  } 
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
