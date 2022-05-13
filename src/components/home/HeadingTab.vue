<template>
  <div>
    <div class="d-flex">
      <span class="heading primary-color-text">
        {{heading}}
      </span>
      <v-spacer />
      <router-link :to="route" class=" mr-4" v-if="route"> view all
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeadingTab',
  props: [
    'heading',
    'route'
  ]
}
</script>
<style lang="css" scoped>

</style>