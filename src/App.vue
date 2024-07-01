<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss" scoped>
@import './assets/styles/partials/_variables.scss';

  main {
    height: 100%;
  }
</style>