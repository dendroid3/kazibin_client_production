<template>
  <v-progress-linear
    class="bottom primary-color"
    indeterminate
  ></v-progress-linear>
</template>
<script>
export default {
  name: 'LoaderWidgetap'
}
</script>
<style lang="css" scoped>
  .bottom{
    position: fixed;
    bottom: 0;
  }
</style>
