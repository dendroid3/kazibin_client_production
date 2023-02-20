<template>
    <div>
        <v-toolbar 
            class="pb-4"
            text
            :class="{
                'full-width': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs,
                'medium-width':  $vuetify.breakpoint.md,
                'large-width':  $vuetify.breakpoint.lg,
            }">
            
            <div class="d-flex bold pointer">
                <v-toolbar-title>{{"Writer: " + getViewMyWriter.details.code + ": "}}</v-toolbar-title>
                <v-toolbar-title class="ml-1">{{getViewMyWriter.details.username}}</v-toolbar-title>
                <span v-if="getViewMyWriter.details.credential_verification">
                  <v-icon class="rounded ml-4 white primary-color--text">
                      mdi-check
                  </v-icon>
                </span>
            </div>
        </v-toolbar>
        I am ViewMyWriter

        <section>
          <v-row class="d-flex justify-center mt-4">
            <v-col class="col-1 white--text mt-4 primary-color text-center" v-for="(link, i) in pagination_links" 
            :key="i" 
            :class="{
              'red': link.active,
              'grey': ((getViewMyWriter.data.writer_tasks.current_page === getViewMyWriter.data.writer_tasks.last_page) && link.next) ||
                      (getViewMyWriter.data.writer_tasks.current_page === 1) && link.previous
              }" 
            @click="goToPage(link.url)">
              <span>
                <span v-if="link.previous">
                {{"<<"}}
                </span>
                <span v-if="!link.previous && !link.next">
                  {{link.label}}
                </span>
                <span v-if="(link.next)">
                  {{">>"}}
                </span>
              </span>
            </v-col>
          </v-row>
      </section>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ViewMyWriter',

    computed: {
        ...mapGetters(['getViewMyWriter']),
        pagination_links(){
            if(this.getViewMyWriter.data.writer_tasks) {
            let links = []
            this.getViewMyWriter.data.writer_tasks.links.forEach(link => {
                link.previous = link.label == "&laquo; Previous"
                link.next = link.label == "Next &raquo;"
                links.push(link)
            });
            return links
            }
        },
    }
}
</script>
<style lang="">
    
</style>