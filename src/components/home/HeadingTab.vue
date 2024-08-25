<template>
  <div>
    <div class="d-flex align-center">
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
  div{
    z-index: 1;
  }
</style>