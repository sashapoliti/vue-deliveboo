<template>
  <header :class="{ 'fixed-navbar': isFixed }">
    <nav>
        <div>
            a
        </div>
        <div>
            b
        </div>
        <div>
            c
        </div>
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
      this.isFixed = window.scrollY > 350;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/partials/_variables.scss";

header {
  height: 80px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: transparent;
  transition: position 0.5s ease-in-out, background-color 0.5s ease-in-out;
  &.fixed-navbar {
    position: fixed;
    background-color: $primary-color;
  }
  nav {
    height: calc(100% - 20px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    margin: 10px;
  }
}
</style>
