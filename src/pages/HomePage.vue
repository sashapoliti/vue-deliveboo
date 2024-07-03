<template>
  <!-- <div class="foods"></div> -->
  <div id="jumbotron">
    <transition name="slide" mode="out-in">
      <div class="city" :key="currentCityIndex">
        <img :src="currentCityImage" alt="Immagine della città" />
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
        <button class="text-uppercase">vai ai ristoranti</button>
      </div>
    </div>
  </div>

  <section id="instructions">
    <div class="container d-flex align-items-center">
      <div class="left">
        <img src="/images/instructions/big.png" alt="">
      </div>
      <div class="right">
        <h2>Come usare <span class="fst-italic">Munchi</span>? Facile!</h2>
        <div class="totem">
          <div class="step d-flex my-4 align-items-center">
            <div class="image">
              <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f55211c7-40a6-4534-8ab2-a6a55256621d/dfzf1wn-13cfa100-47eb-420b-91f9-603b40e61138.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y1NTIxMWM3LTQwYTYtNDUzNC04YWIyLWE2YTU1MjU2NjIxZFwvZGZ6ZjF3bi0xM2NmYTEwMC00N2ViLTQyMGItOTFmOS02MDNiNDBlNjExMzgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.i7FdnaQn1q2hSxhSxD8uBafG8QxeD78z9aB3dTZ9W_c" alt="Immagine numero 1">
            </div>
            <div class="text">
              <h3>Scegli il ristorante</h3>
              <p>Scopri i migliori ristoranti della tua zona e seleziona i piatti che più ti piacciono.</p>
            </div>
          </div>

          <div class="step d-flex my-4 align-items-center">
            <div class="image">
              <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f55211c7-40a6-4534-8ab2-a6a55256621d/dfzf1wn-13cfa100-47eb-420b-91f9-603b40e61138.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y1NTIxMWM3LTQwYTYtNDUzNC04YWIyLWE2YTU1MjU2NjIxZFwvZGZ6ZjF3bi0xM2NmYTEwMC00N2ViLTQyMGItOTFmOS02MDNiNDBlNjExMzgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.i7FdnaQn1q2hSxhSxD8uBafG8QxeD78z9aB3dTZ9W_c" alt="Immagine numero 1">
            </div>
            <div class="text">
              <h3>Consegna veloce e affidabile</h3>
              <p>Il nostro servizio di consegna rapido e sicuro porterà il tuo cibo preferito direttamente alla tua porta.</p>
            </div>
          </div>

          <div class="step d-flex my-4 align-items-center">
            <div class="image">
              <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f55211c7-40a6-4534-8ab2-a6a55256621d/dfzf1wn-13cfa100-47eb-420b-91f9-603b40e61138.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y1NTIxMWM3LTQwYTYtNDUzNC04YWIyLWE2YTU1MjU2NjIxZFwvZGZ6ZjF3bi0xM2NmYTEwMC00N2ViLTQyMGItOTFmOS02MDNiNDBlNjExMzgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.i7FdnaQn1q2hSxhSxD8uBafG8QxeD78z9aB3dTZ9W_c" alt="Immagine numero 1">
            </div>
            <div class="text">
              <h3>Gusta ogni boccone</h3>
              <p>Prepara le papille gustative per un'esperienza indimenticabile!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container my-5">
    <RestaurantsFilter />
  </section>

  <section>
    
  </section>
</template>

<script>
import RestaurantsFilter from "../components/RestaurantsFilter.vue";

export default {
  name: "HomePage",
  components: {
    RestaurantsFilter,
  },
  data() {
    return {
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

  .text {
    width: 600px;
    padding-top: 8%;
    margin-left: 4%;
    color: $secondary-color;
    h1 {
      font-size: 7rem;
      font-weight: 800;
      line-height: 1.07;
      margin-left: -5px;
    }
    p {
      padding: 20px 0;
      font-size: 1rem;
      font-weight: 500;
    }
    button {
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
    position: absolute;
    z-index: 9;
    width: 500px;
    bottom: calc(50% - 80px);
    right: 15%;
    img {
      width: 100%;
    }
  }
  .rider {
    position: absolute;
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
  background-color: $primary-color-2;
  .left {
    width: 50%;
    img {
      width: 100%;
    }
  }
  .right {
    width: 50%;
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
        width: 0;
      }
    }
    .text {
      width: calc(100% - 100px);
      margin-left: 20px;
      h3 {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
      }
      p {
        margin: 0;
      }
    }
  }
}
</style>
