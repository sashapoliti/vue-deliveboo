<template>
    <div v-if="store.restaurantcart != store.data.restaurant.slug && store.restaurantcart != '' "  class="alert alert-warning">
      <div class="d-flex justify-content-between">
        Puoi solo ordinare un ristorante alla volta
        <!-- <RouterLink :to="{ name: 'restaurant', params: { slug: store.restaurantcart } }">Ritorna al ristorante</RouterLink> -->
      </div>
    </div>
  <div class="row">
    <div
      class="col-12 col-md-6 col-lg-4 mb-4"
      v-for="product in sortedPlates"
      :key="product.id"
    >
      <div class="card h-100">
        <img
          :src="product.image ? 'http://127.0.0.1:8000/storage/' + product.image : this.store.api.defaultImg"
          @error="setDefaultImage"
          class="card-img-top"
          :alt="product.name"
        />
        <div class="card-body">
          <h3 class="card-title">{{ product.name }}</h3>
          <div class="d-flex justify-content-between">
            <h5>{{ product.price }} €</h5>
            <div class="changeQuantity d-flex align-items-center justify-content-center">
              <button class="changeMinus" @click="updateQuantity(product, product.quantity - 1)" >
                -
              </button>
              <span class="mx-2">{{ product.quantity }}</span>
              <button class="changePlus" @click="updateQuantity(product, product.quantity + 1)" >
                +
              </button>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button
              class="btn btn-danger red-button " :class="{ disabled: store.restaurantcart != store.data.restaurant.slug && store.restaurantcart != '' }"
              @click="store.functions.addToCart(product)" >
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
    setDefaultImage(event) {
      event.target.src = store.api.defaultImg;
    },
  },
  computed: {
    getImage() {
      return this.product.image
        ? `${store.api.imgBasePath}${this.product.image}`
        : store.api.defaultImg;
    },
    sortedPlates() {
      return this.store.data.restaurant.plates.slice().sort((a, b) => a.name.localeCompare(b.name));
    }
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
    object-fit: cover;
  }
  .card-body {
    margin: 10px 15px 10px 15px;
  }

  .card-title {
    font-weight: 800;
  }
}
</style>
