<template>
  <header :class="{ 'fixed-navbar': isFixed }">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/restaurants">Ristoranti</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      isFixed: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isFixed = window.scrollY > 100;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/partials/_variables.scss";

header {
  // border-bottom-left-radius: 30px;
  // border-bottom-right-radius: 30px;
  // border-radius: 30px;
  height: 80px;
  position: absolute;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  // width: 1600px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #FFFAE6;
  // background-color: transparent;

  transition: position 0.5s ease-in-out, box-shadow 0.5s ease-in-out;

  &.fixed-navbar {
    position: fixed;
    background-color: transparent;
    // box-shadow: 0 0 20px rgba(0, 0, 0, 0.774);
    
  }
  nav {
    height: calc(100% - 20px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    margin: 10px;
    width: 1200px;
    border-radius: 30px;
    background-color: #FFFAE6;
  }
}
</style>
