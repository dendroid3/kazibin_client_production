<template lang="html">
    <div class="left-bar primary-color">
        <div class="mt-4 bold-2 red">
            <v-list
            class="primary-color white--text text-uppercase"
            nav
            >
            <v-list-item-group
                class="row no-gutters d-flex justify-center wrapper"
                active-class="deep-blue--text red--text"
            >
                <!-- <div class="d-flex justify-center" style="width: 100%;">
                    <v-list-item-avatar
                    class="elevation-20 tomato"
                    tile
                    size="120"
                    >
                    <div class="white--text">
                        <span class="d-flex justify-center initials">
                        {{initials}}
                        </span>
                        <v-divider dark/>
                        <span>
                        {{'broker'}}
                        </span>
                        <v-divider dark/>
                        <span class="blue--text white pa-1 bold rounded">
                        {{getUser.credential_verification ? 'verified' : 'unverified'}}
                        </span>
                    </div>
                    </v-list-item-avatar>
                </div>
                 -->
                <v-list-item class="short-line-under" dark @click="goToSection('verify')" v-if="show_verify">
                    {{'Verify AC'}}
                </v-list-item>
                <v-list-item class="short-line-under" v-if="getUser" dark @click="goToSection('myProfile')">
                    {{'Profile'}}
                </v-list-item>
                <v-list-item class="short-line-under" v-if="getUser" dark @click="goToSection('dashboard')">
                    {{'Dashboard'}}
                </v-list-item>
                
                <v-list-item class="short-line-under" v-if="getUser" dark @click="goToSection('task/add')">
                    {{'Post '}}
                </v-list-item>
                <v-list-item class="short-line-under" v-if="!getUser" dark @click="goToSection('register')">
                    {{'Register'}}
                </v-list-item>
                <v-list-item class="short-line-under" v-if="!getUser" dark @click="goToSection('login')">
                    {{'Login'}}
                </v-list-item>
                
                <v-list-item class="short-line-under" dark @click="goToSection('explore/task')">
                    <span class="outer-icon-wrapper">
                        {{'Available'}}
                        <span class="available-icon">
                            {{ getAvailableTasksCount ?  getAvailableTasksCount : 0 }}
                        </span>
                    </span>
                </v-list-item>
                
                <v-list-item class="short-line-under" dark @click="goToSection('explore/writers')">
                    {{'Writers'}}
                </v-list-item>
                
                <v-list-item class="short-line-under" dark @click="goToSection('explore/brokers')">
                    {{'Brokers'}}
                </v-list-item>
                
                <v-list-item class="short-line-under" dark @click="goToSection('about')">
                    {{'About Us'}}
                </v-list-item>
                <span @click="toogle" class="toogle-button grey" v-if="($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
                    <v-icon class="white--text">
                        {{ getHideShowMidLeftSidebar ? "mdi-arrow-left" : "mdi-arrow-right" }}
                    </v-icon>
                 </span>
            </v-list-item-group>
            </v-list>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: "FarleftSidebar",

    components:{},

    computed:{
        ...mapGetters(['getUser', 'getAvailableTasksCount', 'getHideShowMidLeftSidebar']),
        initials(){
            if(this.getUser){
                let str = this.getUser.username
                let matches = str.match( /\b(\w)/g )
                return matches.join('')
            } else  {
                return null
            }
        },
    show_verify(){
            if(this.getUser){
                if(this.getUser.credential_verification){
                    return false     
                } else {
                    return true
                }
            } else {
                return false
            }
        }
    },
    
    methods:{
        ...mapActions(['fetchTotalAvailableTasks', 'toogleHideMidLeftSidebar']),

        goToSection(element_id){
        this.go('/' + element_id)
        },

        toogle(){
            this.toogleHideMidLeftSidebar(!this.getHideShowMidLeftSidebar)
        },
        
        go(code){
        this.$router.push(code)
        },

        boot() {
            this.fetchTotalAvailableTasks()
        }
    },

    mounted(){
        this.boot()
    }
}
</script>
<style lang="css" scoped>
 .active_list .v-list-group .v-list-item--active {
    color: green !important;
  }
    .left-bar{
        height: 100vh;
        /* position: relative; */
        overflow-y: hidden;

    }
    .short-line-under{
/* background-color: #e0e0e0; */
        position: relative;
    }
    .short-line-under::after{
        content: '';
        border-bottom: solid 1px white;
        position: absolute;
        bottom: 0;
        width: 60%;
        left: 20%;
    } 
    .initials{
        font-size:3rem;
        font-weight: 900;
    }
    
    .primary-color{
        background-color: rgb(15,14,56);
    }
    
    .available-icon{
        padding: 0.25rem;
        background-color: green;
        font-size: 0.75rem;
        line-height: 0.75rem;
        border-radius: 0.25rem;
        position: absolute;
        top: -0.25rem;
        right: -1rem;
    }
    .outer-icon-wrapper{
        position: relative;
    }
    .wrapper{
        position: relative;
    }
    .toogle-button{
        padding: 0.5rem;
        border-radius: 50%;
        bottom: 0rem;
        position: fixed;
        cursor: pointer;
    }
</style>
