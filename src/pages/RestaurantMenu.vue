<template>
  <div>
    <div class="img-container">
      <img :src="getImage" @error="setDefaultImage" :alt="store.data.restaurant.name" />
      <div id="title">
        <h1>{{ store.data.restaurant.name }}</h1>
        <h5>Start your order and enjoy</h5>
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
          <ProductList :products="products" @add-to-cart="addToCart" />
        </div>

        <div class="cart-container">
          <h2>Cart</h2>
          <p>Contenuto</p>
          <div class="linea"></div>
          <ShoppingCart :cart="store.cart" @remove-from-cart="removeFromCart"  />
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
    this.loadCart();
  },
  computed: {
    getImage() {
      return store.data.restaurant.image ? `${store.api.imgBasePath}${store.data.restaurant.image}` : store.api.defaultImg;
    }
  },
  methods: {
    addToCart(product) {
      const cartItem = store.cart.find(item => item.product.id === product.id);
      if (cartItem) {
        cartItem.quantity += product.quantity;
      } else {
        store.cart.push({ product: { ...product }, quantity: product.quantity });
      }
      this.saveCart();
    },
    removeFromCart(product) {
      const index = store.cart.findIndex(item => item.product.id === product.id);
      if (index !== -1) {
        store.cart.splice(index, 1);
      }
      this.saveCart();
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(store.cart));
    },
    loadCart() {
      const cart = localStorage.getItem('cart');
      if (cart) {
        store.cart = JSON.parse(cart);
      }
    },
    setDefaultImage(event) {
      event.target.src = store.api.defaultImg;
    },
    getProducts() {
      this.store.data.restaurant.plates.forEach(element => {
        element.quantity = 1;
        this.products.push(element);
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
  }
};
</script>

<style lang="scss" scoped>
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

  .cards-container {
    width: 80%;
  }

  .cart-container {
    width: 20%;
    margin-left: 30px;

    .linea {
      width: 100%;
      height: 1px;
      background-color: #e6d4c3;
    }
  }
}
</style>
