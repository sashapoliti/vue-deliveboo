<template>
  <header :class="{ 'fixed-navbar': isFixed }">
    <nav class="container">
      <ul class="links d-flex align-items-center">
        <li>
          <div class="logo me-4">
            <router-link to="/">
              <img src="/images/logo-deliveboo.png" alt="Logo" />
            </router-link>
          </div>
        </li>
        <li>
          <router-link class="mx-3" to="/">
            Home
            <div class="point d-flex justify-content-center align-items-center">
              <i class="fa-solid fa-circle"></i>
            </div>
          </router-link>
        </li>
        <li>
          <router-link class="mx-3"
            >Contatti
            <div class="point d-flex justify-content-center align-items-center">
              <i class="fa-solid fa-circle"></i>
            </div>
          </router-link>
        </li>
        <li>
          <router-link class="mx-3"
            >Noi
            <div class="point d-flex justify-content-center align-items-center">
              <i class="fa-solid fa-circle"></i>
            </div>
          </router-link>
        </li>
      </ul>
      <div class="functions">c</div>
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
      this.isFixed = window.scrollY > 300;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/partials/_variables.scss";

header {
  height: 80px;
  position: absolute;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: $primary-color;
  border-bottom: 2px solid $primary-color-2;
  transition: position 1s;
  &.fixed-navbar {
    position: fixed;
    border-bottom: none;
    background-color: transparent;
    nav {
      background-color: $primary-color;
      padding: 35px;
      border: 2px solid $primary-color-2;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
  }
  nav {
    border-radius: 40px;
    background-color: transparent;
    height: calc(100% - 20px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    margin: 10px;
    transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out,
      box-shadow 0.3s ease-in-out;
    .links {
      margin: 0;
      padding: 0;
      .logo {
        width: 50px;
        img {
          width: 100%;
        }
      }
      li {
        a {
          position: relative;
          padding: 5px 10px;
          font-size: 1.1rem;
          color: $text-color;
          font-weight: 600;
          transition: color 0.3s ease-in-out;
          .point {
            width: 20px;
            height: 20px;
            position: absolute;
            font-size: 0.7rem;
            color: $tertiary-color;
            left: calc(50% - 10px);
            bottom: -15px;
            i {
              color: transparent;
              transition: color 0.3s ease-in-out;
            }
          }
          &:hover {
            color: $tertiary-color;
            .point {
              i {
                color: $tertiary-color;
              }
            }
          }
        }
      }
    }
  }
}
</style>
