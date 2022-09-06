<template>
  <div class="main">
    <writer-chat v-if="isWriter"/>
    <broker-chat v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BrokerChat from './BrokerChat.vue'
import WriterChat from './WriterChat.vue'

export default {
  components: { WriterChat, BrokerChat },
  name: 'Chat',
  
  computed: {
    ...mapGetters(['getBidChatHeader', 'getUser']),
    isWriter(){
      return this.getUser.writer.id === this.getBidChatHeader.writer_id
    }
  },
 
}
</script>

<style lang="css" scoped>
  
  .main{
    height: 100%;
  }

</style>
