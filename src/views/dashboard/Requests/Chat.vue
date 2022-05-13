<template lang="html">
  <div>
    {{getRequestChatView.id}}
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Chat',
  computed: {
    ...mapGetters(['getRequestChatView'])
  }
}
</script>
