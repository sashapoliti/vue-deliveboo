<template>
  <HeaderComponent />
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
  import HeaderComponent from './components/HeaderComponent.vue';
  export default {
    name: 'App',
    components: {
      HeaderComponent
    }
  }
</script>

<style lang="scss" scoped>
@import './assets/styles/partials/_variables.scss';

  main {
    height: 100%;
  }
</style>