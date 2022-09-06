<template lang="html">
    <div class="left-bar primary-color">
        <div class="mt-4 bold-2 red">
            <v-list
            class="primary-color white--text text-uppercase"
            nav
            >
            <v-list-item-group
                class="row no-gutters d-flex justify-center"
                active-class="deep-blue--text red--text"
            >
                <v-list-item-avatar
                    class="elevation-20 tomato"
                    tile
                    size="400 justify-self-center"
                >
                <div class="pa-4 tomato" v-if="getUser.id">
                    <div class="d-flex justify-center initials">
                        {{initials}}
                    </div>
                    <v-divider dark/>
                    <span>
                        {{'broker'}}
                    </span>
                </div>
                </v-list-item-avatar>
                <v-list-item class="short-line-under" dark @click="goToSection('Dashboard')">
                {{'Dashboard'}}
                </v-list-item>
                
                <v-list-item class="short-line-under" dark @click="goToSection('')">
                {{'home'}}
                </v-list-item>
                
                <v-list-item class="short-line-under" dark @click="goToSection('Task/Add')">
                {{'Post Task'}}
                </v-list-item>
                
                <v-list-item class="short-line-under" dark @click="goToSection('Explore/Task')">
                {{'Explore Tasks'}}
                </v-list-item>
                
                <v-list-item class="short-line-under" dark @click="goToSection('Explore/Writers')">
                {{'Discover Writers'}}
                </v-list-item>
                
                <v-list-item class="short-line-under" dark @click="goToSection('explore/Brokers')">
                {{'Discover Brokers'}}
                </v-list-item>
                
                <v-list-item class="short-line-under" dark @click="goToSection('About')">
                {{'About Us'}}
                </v-list-item>
                
            </v-list-item-group>
            </v-list>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: "FarleftSidebar",

    components:{},

    computed:{
        ...mapGetters(['getUser']),
        initials(){
        if(this.getUser){
            let str = this.getUser.username
            let matches = str.match( /\b(\w)/g )
            return matches.join('')
        } else  {
            return null
        }
        }
    },
    
    methods:{
        goToSection(element_id){
        this.go('/' + element_id)
        },
        
        go(code){
        this.$router.push(code)
        },
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
        color: green ;
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
</style>