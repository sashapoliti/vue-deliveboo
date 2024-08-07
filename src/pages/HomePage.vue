<template>
  <!-- Jumbotron -->
  <div id="jumbotron">
    <div v-if="store.data.emptyCart" class="alert alert-warning">
      {{ store.data.emptyCart }}
    </div>
    <transition name="slide" mode="out-in">
      <div class="city" @click="goToRestaurants" :key="currentCityIndex">
        <img :src="currentCityImage" alt="Immagine della città" />
      </div>
    </transition>
    <div class="rider">
      <img src="/images/jumbotron/rider.png" alt="Immagine del rider" />
    </div>
    <div class="text">
      <h1 class="text-uppercase">
        Il tuo <br />
        morso <br />
        preferito
      </h1>
      <p>
        Benvenuto su <span class="fst-italic">Munchi</span> – il tuo servizio di
        food delivery che porta morsi di felicità direttamente a casa tua.
      </p>
      <div class="mt-5 text-center">
        <button class="text-uppercase" @click="goToRestaurants">
          vai ai ristoranti
        </button>
      </div>
    </div>
  </div>

  <!-- Instructions section -->
  <section id="instructions">
    <div class="container d-flex align-items-center">
      <div class="left">
        <img src="/images/instructions/big.png" alt="" />
      </div>
      <div class="right">
        <h2>Come usare <span class="fst-italic">Munchi</span>? Facile!</h2>
        <div class="totem">
          <div class="step d-flex my-4 align-items-center">
            <div class="image">
              <img src="/images/instructions/phone.png" alt="Immagine phone" />
            </div>
            <div class="text">
              <h3>Scegli il ristorante</h3>
              <p>
                Scopri i migliori ristoranti della tua zona e seleziona i piatti
                che più ti piacciono.
              </p>
            </div>
          </div>
          <div class="pois"></div>
          <div class="step d-flex my-4 align-items-center">
            <div class="image">
              <img src="/images/instructions/scooter.png" alt="Immagine numero 1" />
            </div>
            <div class="text">
              <h3>Consegna veloce e affidabile</h3>
              <p>
                Il nostro servizio di consegna rapido e sicuro porterà il tuo
                cibo preferito direttamente alla tua porta.
              </p>
            </div>
          </div>
          <div class="pois"></div>
          <div class="step d-flex my-4 align-items-center">
            <div class="image">
              <img src="/images/instructions/food.png" alt="Immagine numero 1" />
            </div>
            <div class="text">
              <h3>Gusta ogni boccone</h3>
              <p>
                Prepara le papille gustative per un'esperienza indimenticabile!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Restaurants list section -->
  <section id="restaurants-list" class="container">
    <RestaurantsFilter />
  </section>
</template>


<script>
import RestaurantsFilter from "../components/RestaurantsFilter.vue";

import { store } from "../store";

export default {
  name: "HomePage",
  components: {
    RestaurantsFilter,
  },
  data() {
    return {
      store,
      cityImages: [
        "/images/jumbotron/city1.png",
        "/images/jumbotron/city2.png",
        "/images/jumbotron/city3.png",
        "/images/jumbotron/city4.png",
      ],
      currentCityIndex: 0,
      intervalId: null,
    };
  },
  computed: {
    currentCityImage() {
      return this.cityImages[this.currentCityIndex];
    },
  },
  mounted() {
    this.startImageRotation();
  },
  beforeDestroy() {
    this.stopImageRotation();
  },
  methods: {
    startImageRotation() {
      this.intervalId = setInterval(() => {
        this.currentCityIndex =
          (this.currentCityIndex + 1) % this.cityImages.length;
      }, 7000);
    },
    stopImageRotation() {
      clearInterval(this.intervalId);
    },
    goToRestaurants() {
      const section = document.getElementById("restaurants-list");
      if (section) {
        window.scrollTo({
          top: section.offsetTop,
          behavior: "smooth",
        });
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.store.data.emptyCart) {
        setTimeout(() => {
          vm.store.data.emptyCart = "";
        }, 5000);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/partials/_variables.scss";

.foods {
  position: absolute;
  z-index: 4;
  width: 100%;
  height: 100%;
  background-image: url("/images/jumbotron/foods.png");
}

#jumbotron {
  min-height: 800px;
  position: relative;
  z-index: 5;
  width: 100%;
  height: 100%;
  padding: 80px;
  background-image: url("/images/jumbotron/onda.svg");
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  overflow: hidden;

  .city,
  .rider,
  .text {
    position: absolute;
    transition: transform 0.5s;
    transition-delay: 0.6s;
  }
  // .city {
  //   left: 210vw;
  //   // transform: translateX(-150vw);
  // }

  // .rider {
  //   left: 220vw;
  //   // transform: translateX(-150vw);
  // }

  // .text {
  //   left: -150vw;
  //   // transform: translateX(150vw);
  // }

  .text.animate {
    left: -150vw;
    transform: translateX(150vw);	
  }
  .city.animate{
    left: 210vw;
    transform: translateX(-150vw);
  }
  .rider.animate{
    left: 220vw;
    transform: translateX(-150vw);
  }

  .text {
    width: 600px;
    padding-top: 8%;
    margin-left: 4%;
    color: $secondary-color;

    h1 {
      font-size: 7rem;
      font-weight: 800;
      line-height: 0.9;
      margin-left: -1px;
    }

    p {
      padding: 20px 0;
      font-size: 1rem;
      font-weight: 500;
    }

    button {
      font-family: $title-font;
      font-weight: 500;
      outline: none;
      color: $tertiary-color;
      padding: 1em;
      padding-left: 2em;
      padding-right: 2em;
      border: 2px dashed $tertiary-color;
      border-radius: 15px;
      background-color: $primary-color;
      box-shadow: 0 0 0 4px $primary-color, 2px 2px 4px 2px rgba(0, 0, 0, 0.5);
      transition: 0.1s ease-in-out, 0.4s color;
    }

    button:active {
      transform: translateX(0.1em) translateY(0.1em);
      box-shadow: 0 0 0 4px $primary-color,
        1.5px 1.5px 2.5px 1.5px rgba(0, 0, 0, 0.5);
    }
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: 0.5s;
  }

  .slide-enter,
  .slide-leave-to {
    opacity: 0;
    transform: translateX(-50px);
  }

  .city {
    // position: absolute;
    z-index: 9;
    width: 500px;
    bottom: calc(50% - 80px);
    right: 15%;
    cursor: pointer;

    img {
      width: 100%;
    }
  }

  .rider {
    // position: absolute;
    z-index: 10;
    width: 500px;
    bottom: calc(50% - 230px);
    right: 5%;

    img {
      width: 100%;
    }
  }
}

#instructions {
  width: 100%;
  background-image: url("/images/instructions/onda-bottom.svg");
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  padding-bottom: 100px;

  .left {
    width: 55%;

    img {
      width: 100%;
    }
  }

  .right {
    width: 45%;
    padding: 0 30px;
    color: $tertiary-color;

    h2 {
      font-size: 3rem;
      font-weight: 800;
      line-height: 1.07;
      margin-bottom: 10px;
    }

    .image {
      width: 100px;
      aspect-ratio: 1 / 1;
      background-color: $primary-color;
      border-radius: 50px;

      img {
        width: 100%;
      }
    }

    .text {
      width: calc(100% - 80px);
      margin-left: 20px;

      h3 {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
      }

      p {
        margin: 0;
        width: 80%;
      }
    }

    .pois::before {
      content: ".....";
      font-family: "Font Awesome 5 Free";
      font-size: 3em;
      line-height: 0.2;
      word-break: break-word;
      height: 1.5em;
      width: 1rem;
      text-align: center;
      margin: -20px 0 -20px 0.8em;
      display: block;
      color: $tertiary-color;
    }
  }
}

#restaurants-list {
  padding: 20px 10px;
  margin: 70px auto;
  margin-bottom: 0;
  border-radius: 50px;
}

@media  screen and (max-width: 1800px) {
  .rider.animate{
    transform: translateX(-155vw) !important;
  }
}

@media screen and (max-width: 1700px) {
  .city.animate{
    transform: translateX(-155vw) !important;
  }
}

@media screen and (max-width: 1500px) {
  #jumbotron {
    padding: 80px 20px;
    .city {
      right: 5%;
    }

    .rider {
        right: 0%;
    }

    .text {
      margin-left: 1%;
    }
  }
  .text.animate {
    transform: translateX(150vw) !important;	
  }
  .city.animate{
    transform: translateX(-160vw) !important;
  }
  .rider.animate{
    transform: translateX(-158vw) !important;
  }

}


@media screen and (max-width: 1300px) {
  #jumbotron {
    min-height: 1150px;
    .text {
      width: 400px;
      h1 {
        font-size: 6.5rem;
      }
    }
  }
  .city.animate{
    transform: translateX(-164vw) !important;
  }
  .rider.animate{
    transform: translateX(-162vw) !important;
  }
}

@media screen and (max-width: 1200px) {
  #jumbotron {
    .rider {
      top: 50%;
    }

    .city {
      right: 12%;
      top: 35%;
    }
  }
  .text.animate {
    transform: translateX(155vw) !important;
  }
  .city.animate{
    transform: translateX(-172vw) !important;
  }
  .rider.animate{
    transform: translateX(-170vw) !important;
  }
}

@media screen and (max-width: 992px) {
  #instructions {
    .left {
      display: none;
    }

    .right {
      margin: 0 auto;
      width: 85%;
      h2 {
        text-align: center;
      }
    }
  }

  #jumbtron {
    .city {
      height: 400px;
    }
  }
}

@media screen and (max-width: 925px) {
  #jumbotron {
    .rider {
      top: 55%;
    }

    .city {
      right: 12%;
      top: 45%;
    }
  }
  .city.animate{
    transform: translateX(-193vw) !important;
  }
  .rider.animate{
    transform: translateX(-190vw) !important;
  }
}

@media screen and (max-width: 700px) {
  #jumbotron {
    .text {
      h1 {
        font-size: 6rem;
      }
    }

    .rider {
      top: 63%;
      width: 400px;
    }
  }
  .city.animate{
    transform: translateX(-210vw) !important;
  }
  .rider.animate{
    transform: translateX(-197vw) !important;
  }
}

@media screen and (max-width: 600px) {
  #jumbotron {
    .text {
      width: 400px;
      h1 {
        font-size: 5.5rem;
      }
    }
    .rider {
      top: 55%;
      width: 420px;
    }

    .city {
      width: 440px;
      right: 12%;
      top: 45%;
    }
  }

  .city.animate{
    transform: translateX(-204vw) !important;
  }
  .rider.animate{
    transform: translateX(-204vw) !important;
  }
}

</style>
