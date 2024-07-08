<template>
<!-- Modal -->
<div class="modal fade" :class="{ show: showModal }" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Ops..!</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Sembra tu abbia nel tuo carrello dei piatti del ristorante {{ store.restaurantcart.name }}. <br>
        Torna indietro oppure svuota il carrello e continua su {{ store.data.restaurant.name }}!
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
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
          :src="
            product.image
              ? 'http://127.0.0.1:8000/storage/' + product.image
              : store.api.defaultImg
          "
          @error="setDefaultImage"
          class="card-img-top"
          :alt="product.name"
        />
        <div class="card-body d-flex flex-column justify-content-between">
          <h3 class="card-title">{{ product.name }}</h3>
          <div class="d-flex justify-content-between">
            <h5>{{ product.price }} €</h5>
            <div
              class="changeQuantity d-flex align-items-center justify-content-center"
            >
              <button
                class="changeMinus"
                @click="updateQuantity(product, product.quantity - 1)"
              >
                -
              </button>
              <span class="mx-2">{{ product.quantity }}</span>
              <button
                class="changePlus"
                @click="updateQuantity(product, product.quantity + 1)"
              >
                +
              </button>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button
              class="btn btn-danger red-button"
              :class="{
                disabled:
                  store.restaurantcart &&
                  store.restaurantcart.id !== store.data.restaurant.id &&
                  store.restaurantcart.id !== '',
              }"
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
      showModal: false
    };
  },
  mounted() {
    this.checkRestaurantCart();
  },
  methods: {
    checkRestaurantCart() {
      if (store.restaurantcart && store.restaurantcart.id !== store.data.restaurant.id && store.restaurantcart.id !== '') {
        this.showModal = true;
      } else {
        this.showModal = false;
      }
    },
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
      return this.store.data.restaurant.plates
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: none;
}
.modal.show {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}

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
