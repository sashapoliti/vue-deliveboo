<template>
  <div>
    <div class="img-container">
      <img :src="getImage" @error="setDefaultImage" :alt="store.data.restaurant.name" />
      <div id="title">
        <h1>{{ store.data.restaurant.name }}</h1>
        <h5>{{ store.data.restaurant.description }}</h5>
        <small>{{ store.data.restaurant.address }}</small>
      </div>
    </div>
    <div class="wave">
      <img src="/images/wave.svg" alt="wave" class="wave-img" />
    </div>

    <div class="container-bottom container">
      <div class="text-center my-3 mb-5">
        <h2 class="text-uppercase">Menu</h2>
      </div>

      <div class="container d-flex">
        <div class="cards-container">
          <ProductList :products="products" />
        </div>

        <div class="cart-container">
          <h2>Carrello</h2>
          <ShoppingCart :cart="store.cart" />
          <div class="text-center">
      <button class="btn red-button" @click="$router.push({ name: 'checkout' })"
        :disabled="store.cart.length === 0">
        Vai all'ordine
      </button>
    </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store";
import axios from "axios";
import ProductList from "../components/ProductList.vue";
import ShoppingCart from "../components/ShoppingCart.vue";

export default {
  name: "RestaurantMenu",
  components: {
    ProductList,
    ShoppingCart
  },
  data() {
    return {
      store,
      products: [],
    };
  },
  created() {
    store.functions.loadCart();
  },
  computed: {
    getImage() {
      return store.data.restaurant.image ? `${store.api.imgBasePath}${store.data.restaurant.image}` : store.api.defaultImg;
    }
  },
  methods: {
    setDefaultImage(event) {
      event.target.src = store.api.defaultImg;
    },
    getProducts() {
      this.store.data.restaurant.plates.forEach(element => {
        element.quantity = 1;
        this.products.push(element);
      });
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    if (Object.keys(store.data.restaurant).length > 0) {
      next();
    } else {
      axios
        .get(store.api.baseUrl + store.api.restaurants + to.params.slug)
        .then((response) => {
          store.data.restaurant = response.data;
          next();
        })
        .catch(() => {
          next({ name: "not-found" });
        });
    }
  },
  mounted() {
    this.getProducts();
    console.log(this.products);
    this.scrollToTop();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/partials/_variables.scss";

.img-container {
  height: 560px !important;
  overflow: hidden;
  position: relative;

  #title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;

    h1 {
      font-size: 5rem;
      font-weight: 800;
      line-height: 1.07;
      text-shadow: 0 0 10px black;
    }

    h5 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-top: 20px;
      text-shadow: 0 0 10px black;
      font-weight: 400;
    }

    small {
      font-weight: 400;
      text-shadow: 0 0 20px black;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: blur(4px);
  }
}

.wave {
  transform: translate(0, -100px);

  .wave-img {
    filter: invert(88%) sepia(23%) saturate(244%) hue-rotate(335deg) brightness(107%) contrast(103%);
  }
}

.container-bottom {
  margin-top: -60px;
  width: 1200px;

  .cards-container {
    width: 75%;
  }

  .cart-container {
    width: 25%;
    margin-left: 30px;
  }
}

.red-button {
  text-transform: uppercase;
  margin: 10px 0px 5px 0px;
  font-weight: 600;
  padding: 15px 20px 15px 20px;
  border-radius: 50px;
  background-color: $tertiary-color;
  color: $primary-color;
  transition: filter 0.3s ease-in-out;
  &:hover {
    filter: brightness(0.9);
  }
}

@media screen and (max-width: 1200px) {
  .cards-container {
    width: 2200px !important;
  }

  .cart-container {
    width: 100% !important;
  }
}
@media screen and (min-width: 576px)  {
    .container-sm, .container {
      max-width: 100% !important;
    }
}

</style>
