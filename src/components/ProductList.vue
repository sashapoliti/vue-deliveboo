<template>
  <!-- Modal -->
  <div v-if="
    store.restaurantcart &&
    store.restaurantcart.id !== store.data.restaurant.id &&
    store.restaurantcart.id !== ''
  " class="modal fade" :class="{ show: showModal }" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Ops..!</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="showModal = false"></button>
        </div>
        <div class="modal-body">
          Sembra tu abbia nel tuo carrello dei piatti di "<strong>{{
            store.restaurantcart.name
          }}</strong>". <br />
          Torna al precedente ristorante oppure svuota il carrello e continua su
          "<strong>{{ store.data.restaurant.name }}</strong>"!
        </div>
        <div class="modal-footer">
          <a :href="`http://localhost:5174/restaurants/${store.restaurantcart.slug}`">
            <button type="button" class="btn return">Torna indietro</button>
          </a>
          <button type="button" class="btn btn-danger" @click="store.functions.clearCart()">
            Svuota carrello
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-12  col-lg-6  col-xl-4 mb-4" v-for="product in paginatedPlates" :key="product.id">
      <div class="card h-100">
        <img :src="product.image
          ? 'http://127.0.0.1:8000/storage/' + product.image
          : store.api.defaultImg
          " @error="setDefaultImage" class="card-img-top" :alt="product.name" />
        <div class="card-body d-flex flex-column justify-content-between">
          <h3 class="card-title">{{ product.name }}</h3>
          <div class="d-flex justify-content-between">
            <h5>{{ product.price }} €</h5>
            <div class="changeQuantity d-flex align-items-center justify-content-center">
              <button class="changeMinus" @click="updateQuantity(product, product.quantity - 1)">
                -
              </button>
              <span class="mx-2">{{ product.quantity }}</span>
              <button class="changePlus" @click="updateQuantity(product, product.quantity + 1)">
                +
              </button>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button class="btn red-button" @click="checkRestaurantCart(product)">
              Aggiungi al carrello
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="pagination" v-if="totalPages > 1">
    <button :disabled="currentPage === 1" @click="currentPage--">
      <i class="fa-solid fa-angles-left"></i>
    </button>
    <span>Pagina {{ currentPage }} di {{ totalPages }}</span>
    <button :disabled="currentPage === totalPages" @click="currentPage++">
      <i class="fa-solid fa-angles-right"></i>
    </button>
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
      showModal: false,
      currentPage: 1,
      itemsPerPage: 6,
    };
  },
  methods: {
    checkRestaurantCart(product) {
      if (
        store.restaurantcart &&
        store.restaurantcart.id !== store.data.restaurant.id &&
        store.restaurantcart.id !== ""
      ) {
        this.showModal = true;
      } else {
        this.showModal = false;
        this.store.functions.addToCart(product);
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
    redirectToRestaurant() {
      this.$router.push({
        name: "restaurant",
        params: { slug: store.data.restaurantcart.slug },
      });
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
    paginatedPlates() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedPlates.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.sortedPlates.length / this.itemsPerPage);
    },
  },
};
</script>


<style lang="scss" scoped>
@import "../assets/styles/partials/_variables.scss";

.modal {
  display: none;

  .modal-content {
    /* background-color: $primary-color; */
    border: none;

    .modal-header {
      border-bottom: none;
    }

    .modal-footer {
      border-top: none;

      button.return {
        color: white;
        background-color: $secondary-color;
        font-weight: 600;
        transition: filter 0.3s ease-in-out;

        &:hover {
          filter: brightness(0.7);
        }
      }
    }
  }
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
  background-color: $tertiary-color;
  color: $primary-color;
  transition: filter 0.3s ease-in-out;

  &:hover {
    filter: brightness(0.9);
  }
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px 20px 0px;

  button {
    aspect-ratio: 1/1;
    width: 40px;
    border-radius: 50%;
    background-color: #FFE4C4;
    margin: 0px 10px;
    border: 1px solid #ecbf87;
    font-weight: 600;
    transition: filter 0.3s ease-in-out;

    &:hover {
      filter: brightness(0.9);
    }
  }
}
</style>
