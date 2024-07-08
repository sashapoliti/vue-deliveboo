<template>
  <div class="row">
    <div
      class="col-12 col-md-6 col-lg-4 mb-4"
      v-for="product in store.data.restaurant.plates"
      :key="product.id"
    >
      <div class="card">
        <img
          :src="'http://127.0.0.1:8000/storage/' + product.image"
          @error="setDefaultImage"
          class="card-img-top"
          :alt="product.name"
        />
        <div class="card-body">
          <h3 class="card-title">{{ product.name }}</h3>
          <div class="d-flex justify-content-between">
            <h5>{{ product.price }} €</h5>
            <div>
              <button @click="updateQuantity(product, product.quantity - 1)">
                -
              </button>
              <span>{{ product.quantity }}</span>
              <button @click="updateQuantity(product, product.quantity + 1)">
                +
              </button>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button
              class="btn btn-danger red-button"
              @click="store.functions.addToCart(product)"
            >
              Aggiungi al carrello
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store";

export default {
  props: {
    products: Array,
  },
  name: "ProductList",
  data() {
    return {
      store,
    };
  },
  methods: {
    updateQuantity(product, quantity) {
      if (quantity < 1) {
        quantity = 1;
      }
      product.quantity = quantity;
    },
    // addToCart(product) {
    //     this.$emit('add-to-cart', product);
    // },
  },
  computed: {
    getImage() {
      return store.data.restaurant.image
        ? `${store.api.imgBasePath}${store.data.restaurant.image}`
        : store.api.defaultImg;
    },
  },
};
</script>

<style lang="scss" scoped>
.red-button {
  text-transform: uppercase;
  margin: 10px 0px 5px 0px;
  font-weight: 600;
  padding: 15px 20px 15px 20px;
  border-radius: 50px;
}

.card {
  border-radius: 20px;
  overflow: hidden;
  height: 470px;
  img {
    height: 270px;
  }
  .card-body {
    margin: 10px 15px 10px 15px;
  }

  .card-title {
    font-weight: 800;
  }
}
</style>
