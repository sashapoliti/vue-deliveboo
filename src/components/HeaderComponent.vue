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
          <router-link active-class="active" class="mx-3" to="/">
            Home
            <div class="point d-flex justify-content-center align-items-center">
              <i class="fa-solid fa-circle"></i>
            </div>
          </router-link>
        </li>
        <!-- <li class="about">
          <router-link class="mx-3"
            >Noi
            <div class="point d-flex justify-content-center align-items-center">
              <i class="fa-solid fa-circle"></i>
            </div>
          </router-link>
        </li>
        <li class="contacts">
          <router-link class="mx-3"
            >Contatti
            <div class="point d-flex justify-content-center align-items-center">
              <i class="fa-solid fa-circle"></i>
            </div>
          </router-link>
        </li> -->
      </ul>
      <ul class="functions d-flex align-items-center">
        <li class="login">
          <a href="http://localhost:8000/login" 
            >
            <i class="d-none fa-solid fa-user"></i>
            Accedi
            <div class="point d-flex justify-content-center align-items-center">
              <i class="fa-solid fa-circle"></i>
            </div>
          </a>
        </li>
        <li class="register">
          <a href="http://localhost:8000/register" 
            >
            <i class="d-none fa-solid fa-id-card"></i>
            Registrati
            <div class="point d-flex justify-content-center align-items-center">
              <i class="fa-solid fa-circle"></i>
            </div>
          </a>
        </li>
        <li class="cart">
          <router-link to="/checkout">
            <button class="btn red-button">
              <span>Carrello</span> <i class="fa-solid fa-cart-shopping"></i>
            </button>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { store } from "../store";

export default {
  name: "HeaderComponent",
  data() {
    return {
      store,
      isFixed: false,
      cartLength: 0,
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
    handleStorageEvent(event) {
      if (event.key === "cart") {
        this.$forceUpdate();
      }
    },
  },
  computed: {
    cartLength() {
      const cart = localStorage.getItem("cart");
      return cart ? JSON.parse(cart).length : 0;
    },
  }
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
          &.active {
            .point {
              i {
                color: $tertiary-color;
              }
            }
          }
        }
      }
    }

    .functions {
      margin: 0;
      padding: 0;
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

      .cart {
        .red-button {
          text-transform: uppercase;
          font-weight: 600;
          padding: 7px 20px 7px 20px;
          border-radius: 50px;
          background-color: $tertiary-color;
          color: $primary-color;
          transition: filter 0.3s ease-in-out;

          &:hover {
            filter: brightness(0.9);
          }
        }
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .links {
    .contacts {
      display: none;
    }
    .about {
      display: none;
    }
  }
  .functions {
    span {
      display: none;
    }
  }
}
</style>