<template>
  <div class="container">
    <div v-if="store.cart.length === 0" class="text-center my-3">Il carrello è vuoto</div>
    <div class="cart-container" v-else>
      <div v-for="item in store.cart" :key="item.product.id" class="cart-item mt-3">
        <div class="info">
          <div class="img-container">
            <img :src="getImage" :alt="item.product.name">
          </div>
        </div>
        <h3>{{ item.product.name }} x {{ item.quantity }}</h3>
        <button class="remove-button" @click="store.functions.removeFromCart(item.product)">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="changeQuantity d-flex align-items-center justify-content-center">
          <button class="changeMinus" @click="store.functions.updateQuantity(item.product, item.quantity - 1)">-</button>
          <span class="mx-2">{{ item.quantity }}</span>
          <button class="changePlus" @click="store.functions.updateQuantity(item.product, item.quantity + 1)">+</button>
        </div>
      </div>

      <h5 class="my-3">Totale: {{ totalPrice }} €</h5>
    </div>
   
  </div>
</template>

<script>
import { store } from "../store";
export default {
  
  name: "ShoppingCart",
  data() {
    return {
      store
    };
  },
  props: {
    cart: Array
  },
  computed: {
    totalPrice() {
      const total = this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
      this.store.data.totalPrice = total;
      console.log(this.store.data.totalPrice);
      return total;
    },
    getImage() {
      return store.data.restaurant.image
        ? `${store.api.imgBasePath}${store.data.restaurant.image}`
        : store.api.defaultImg;
    }
  },
  methods: {
    // updateQuantity(product, quantity) {
    //   store.functions.updateQuantity(product, quantity);
    // }
    
    // removeFromCart(product) {
    //   this.$emit('remove-from-cart', product);
    // },
  }
};
</script>

<style lang="scss" scoped>
.cart-container {
  .cart-item {
    h3 {
      font-size: 1.3rem;
    }
    position: relative;
    button.remove-button {
      position: absolute;
      top: 0;
      right: 0;
      border: none;
      background-color: transparent;
      color: red;
    }
  }
}

</style>
