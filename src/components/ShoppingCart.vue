<template>
    <div class="container">
      <div v-if="store.cart.length === 0" class="text-center my-3">Your cart is empty</div>
      <div v-else>
        <div v-for="item in store.cart" :key="item.product.id" class="mt-3">
          <h3>{{ item.product.name }} x {{ item.quantity }}</h3>
          <button @click="removeFromCart(item.product)">Remove</button>
        </div>
        <h5 class="my-3">Totale: {{ totalPrice }} €</h5>
      </div>
      <div class="text-center">
        <button class="btn btn-danger red-button" @click="$router.push({ name: 'checkout' })" :disabled="store.cart.length === 0">
          Checkout
        </button>
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
      }
    },
    methods: {
      removeFromCart(product) {
        this.$emit('remove-from-cart', product);
      },
    }
  };
  </script>
  
  <style lang="scss" scoped>

  </style>
  
