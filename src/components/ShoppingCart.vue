<template>
  <div class="container">
    <div v-if="store.cart.length === 0" class="text-center my-3">
      Il carrello è vuoto
    </div>
    <div class="cart-container" v-else>
      <div v-for="item in store.cart" :key="item.product.id" class="cart-item mt-3">
        <div class="info d-flex align-items-center">
          <div class="img-container me-2">
            <img :src="item.product.image
                ? 'http://127.0.0.1:8000/storage/' + item.product.image
                : this.store.api.defaultImg
              " @error="setDefaultImage" :alt="item.product.name" />
          </div>
          <div>
            <h3 class="text-center">
              {{ item.product.name }}
            </h3>
            <div class="changeQuantity d-flex align-items-center justify-content-center">
              <span class="me-2">{{ item.product.price}} €</span>
              <button class="changeMinus" @click="
                store.functions.updateQuantity(
                  item.product,
                  item.quantity - 1)"  :class="{ none: store.flag === true}">
                -
              </button>
              <span class="mx-2">{{ item.quantity }}</span>
              <button class="changePlus" @click="
                store.functions.updateQuantity(
                  item.product,
                  item.quantity + 1
                )
                "  :class="{ none: store.flag === true}">
                +
              </button>
            </div>
          </div>
        </div>

        <button class="remove-button " @click="store.functions.removeFromCart(item.product)" :class="{ none: store.flag === true}">
          <i class="fa-solid fa-xmark"></i>
        </button>
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
      store,
    };
  },
  props: {
    cart: Array,
  },
  computed: {
    totalPrice() {
      const total = this.cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      this.store.data.totalPrice = total;
      console.log(this.store.data.totalPrice);
      return total;
    },
  },
  methods: {
    setDefaultImage(event) {
      event.target.src = store.api.defaultImg;
    },
  },
};
</script>

<style lang="scss" scoped>
.none {
  display: none;
}
.cart-container {
  .cart-item {
    .img-container {
      width: 80px;
      height: 80px;
      overflow: hidden;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    h3 {
      width: 164px;
      font-size: 1.1rem;
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
