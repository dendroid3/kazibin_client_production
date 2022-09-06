<template>
  <v-progress-linear
    class="bottom primary-color"
    color="red"
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
    top: 50px;
  }
</style>
