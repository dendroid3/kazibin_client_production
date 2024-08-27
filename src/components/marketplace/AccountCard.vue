<template>
    <div class="grey lighten-4 wrapper pa-2 mt-1 relative mx-2 rounded fill-height">
        <section class="mb-2">
            <span class="head pointer uppercase">
                Nurdy Turtles
            </span> 
            <br>
            <span class="uppercase">
                {{ "sELLER: XTR-OI9" }}
                {{ ': ' }}
                {{ "ERICK NDUNG'U" }}  
            </span>
            <br>
            <span class="uppercase">
                {{ "PROFILE" }}
                {{ ': ' }}
                {{ "KENYAN (MALE)" }}  
            </span>
            <br>
            <span class="uppercase">
                {{ "RATING" }}
                {{ ': ' }}
                {{ "90%" }}  
            </span>
            <br>
            <span class="uppercase">
                {{ "TOTAL ORDERS" }}
                {{ ': ' }}
                {{ "1500" }}  
            </span>
            <br>
            <span class="uppercase">
                {{ "PENDING ORDERS" }}
                {{ ': ' }}
                {{ "10" }}  
            </span>
            <br>
            <span class="uppercase">
                {{ "COST" }}
                {{ ': ' }}
                {{ "150,000 KES (NEGOtiable)" }}  
            </span>
        </section>
        

        <div class="d-flex justify-end">
            <v-menu 
            transition="slide-y-transition"
            bottom
            open-on-hover>
            <template v-slot:activator="{ on, attrs }">
            <span class="white--text pointer"
              v-bind="attrs"
              v-on="on">
              <v-btn small 
              class="elevation- ml-2 red lighten-2 white--text" 
              style="font-weight: 900;" 
              :loading="false">
                  Contact Seller
              </v-btn>
            </span>
            </template>
            <v-list>
                <v-list-item
                class="pointer">
                    <v-icon small class="mr-2">
                        mdi-phone
                    </v-icon>
                    Call
                </v-list-item>
                <v-list-item
                class="pointer">
                    <v-icon small class="mr-2">
                        mdi-message
                    </v-icon>
                    SMS
                </v-list-item>
                <v-list-item
                class="pointer">
                    <v-icon small class="mr-2">
                        mdi-mail
                    </v-icon>
                    Email
                </v-list-item>
                <v-list-item
                class="pointer"
                @click="GoToWhatsApp">
                    <v-icon small class="mr-2">
                        mdi-whatsapp
                    </v-icon>
                    WhatsApp
                </v-list-item>
            </v-list>
            </v-menu>
        </div>
    </div>
</template>
<script>
export default {
    name: "AccountCard",

    methods: {
        GoToWhatsApp() {
            alert("Going to WhatsApp")
        }
    }
}
</script>
<style lang="css" scoped>
    .head{
        font-size: 1rem;
        font-weight: 800;
    }
</style>

