<template>
  <div>
    <div class="img-container">
      <img :src="getImage" @error="setDefaultImage" :alt="store.data.restaurant.name">
      <div id="title">
        <h1>{{ store.data.restaurant.name }}</h1>
        <h5>Start your order and enjoy</h5>
      </div>
    </div>
    <div class="wave">
      <img src="/images/wave.svg" alt="wave" class="wave-img">
    </div>
    <div class="container-bottom container">
      <div class="text-center my-3 mb-5">
        <h2 class="text-uppercase">Menu</h2>
      </div>
      <div class="container d-flex justify-content-between">
        <div class="cards-container">
        <div class="row">
          <div class="col-12 col-md-6 col-lg-4 mb-4" v-for="plate in store.data.restaurant.plates" :key="plate.id">
            <div class="card">
              <img :src="'http://127.0.0.1:8000/storage/' + plate.image" @error="setDefaultImage" class="card-img-top"
                :alt="plate.name">
              <div class="card-body">
                <!-- <p>{{ plate?.category }}</p> -->
                <h3 class="card-title">{{ plate.name }}</h3>
                <h5>{{ plate.price }} €</h5>
                <button class="btn btn-danger red-button">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="cart-container">
        <h2>Cart</h2>
        <p>Contenuto</p>
        <div class="linea"></div>
        <div class="d-flex justify-content-between my-3">
          <h5>Totale</h5>
          <h5>10 €</h5>
        </div>
        <div class="text-center">
          <button class="btn btn-danger red-button">Checkout</button>
        </div>
      </div>



      </div>
      



    </div>

  </div>
</template>

<script>
import { store } from "../store";
import axios from "axios";
import CardComponent from "../components/CardComponent.vue";

export default {
  name: "RestaurantMenu",
  components: {
    CardComponent
  },
  data() {
    return {
      store,
    };
  },
  mounted() {
    console.log(store.data.restaurant.plates);
  },
  computed: {
    getImage() {
      return store.data.restaurant.image ? `${store.api.imgBasePath}${store.data.restaurant.image}` : store.api.defaultImg;
    }
  },
  methods: {
    setDefaultImage(event) {
      event.target.src = store.api.defaultImg;
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
  }

  .card-body {
    margin: 10px 15px 10px 15px;

    .card-title {
      font-weight: 800;
    }

    
  }
  .cards-container{
    width: 80%;
  }
  .cart-container{
    width: 20%;
    .linea{
      width: 100%;
      height: 1px;
      background-color: #e6d4c3;
    }
  
  }
}
</style>
