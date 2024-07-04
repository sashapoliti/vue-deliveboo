<template>
  <div class="d-flex container">
    <!-- filter -->
    <div class="filter d-flex flex-column">
      <span class="fw-bold ms-1 mb-2"><small>Lista dei filtri</small></span>
      <div
        class="filter-box mb-2 pb-2"
        v-for="item in store.data.types"
        :key="item.id"
      >
        <label
          :for="'checkbox-' + item.id"
          class="container-checkbox d-flex align-items-center"
        >
          <input
            type="checkbox"
            :id="'checkbox-' + item.id"
            @change="updateSelectedTypes(item.id)"
          />
          <div
            class="checkmark d-flex justify-content-center align-items-center"
          >
            <img :src="item.image" alt="" />
          </div>
          <span
            class="ms-2"
            :style="{
              'font-weight': selectedTypes.includes(item.id) ? 'bolder' : '500',
            }"
            >{{ item.name }}</span
          >
        </label>
      </div>
    </div>

    <!-- restaurants -->
    <div class="restaurants container">
      <div class="row h-100">
        <!-- loader -->
        <div
          class="loader col-12 h-100 d-flex justify-content-center align-items-center"
          v-if="loading"
        >
          <div
            aria-label="Orange and tan hamster running in a metal wheel"
            role="img"
            class="wheel-and-hamster"
          >
            <div class="wheel"></div>
            <div class="hamster">
              <div class="hamster__body">
                <div class="hamster__head">
                  <div class="hamster__ear"></div>
                  <div class="hamster__eye"></div>
                  <div class="hamster__nose"></div>
                </div>
                <div class="hamster__limb hamster__limb--fr"></div>
                <div class="hamster__limb hamster__limb--fl"></div>
                <div class="hamster__limb hamster__limb--br"></div>
                <div class="hamster__limb hamster__limb--bl"></div>
                <div class="hamster__tail"></div>
              </div>
            </div>
            <div class="spoke"></div>
          </div>
        </div>
        <!-- no results -->
        <div
          class="col-12 h-100 d-flex justify-content-center align-items-center mt-5"
          v-if="restaurants.length === 0 && !loading"
        >
          <div class="text-center">
            <h4>Non ci sono ristoranti</h4>
            <div>
              <i
                class="fa-solid fa-face-sad-tear fa-3x"
                style="color: rgba(0, 0, 0, 0.5)"
              ></i>
            </div>
          </div>
        </div>
        <div
          v-else
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          class="col-12 col-md-6 col-lg-4 mb-3"
        >
          <RouterLink
            :to="{ name: 'restaurant', params: { slug: restaurant.slug } }"
            @click="propRestaurant(restaurant)"
          >
            <CardComponent :restaurant="restaurant" />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store";
import axios from "axios";
import CardComponent from "./CardComponent.vue";

export default {
  name: "RestaurantsFilter",
  components: {
    CardComponent,
  },
  data() {
    return {
      store,
      restaurants: [],
      selectedTypes: [],
      loading: false,
    };
  },
  methods: {
    updateSelectedTypes(typeId) {
      if (this.selectedTypes.includes(typeId)) {
        this.selectedTypes = this.selectedTypes.filter((id) => id !== typeId);
      } else {
        this.selectedTypes.push(typeId);
      }
      console.log(this.selectedTypes);

      /* all checkboxes unchecked */
      if (this.selectedTypes.length === 0) {
        this.restaurants = [];
        return;
      } else {
        this.fetchRestaurants();
      }
    },
    fetchRestaurants() {
      this.loading = true;
      axios
        .post(this.store.api.baseUrl + this.store.api.restaurants, {
          type: this.selectedTypes,
        })
        .then((response) => {
          console.log(response.data);
          this.restaurants = response.data.results;
          console.log(this.restaurants);
        })
        .catch((error) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    propRestaurant(object) {
      this.store.data.restaurant = {};
      this.store.data.restaurant = object;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/partials/_variables.scss";

.filter {
  width: 20%;
  .filter-box {
    border-bottom: 1px solid #e6d4c3;
  }
  span {
    font-size: 0.9rem;
    font-weight: 900;
  }
  .container-checkbox input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .container-checkbox {
    padding: 3px;
    display: block;
    position: relative;
    cursor: pointer;
    font-size: 20px;
    user-select: none;
  }
  /* Create a custom checkbox */
  .checkmark {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1.5em;
    width: 1.5em;
    background-color: $primary-color-2;
    border-radius: 56% 44% 45% 55% / 58% 53% 47% 42%;
    img {
      width: 25px;
    }
  }
  /* When the checkbox is checked, add a blue background */
  .container-checkbox input:checked ~ .checkmark {
    background-color: #fdc888;
  }
}
.restaurants {
  width: 80%;
  padding-left: 40px;
  .loader {
    .wheel-and-hamster {
      --dur: 1s;
      position: relative;
      width: 12em;
      height: 12em;
      font-size: 14px;
    }

    .wheel,
    .hamster,
    .hamster div,
    .spoke {
      position: absolute;
    }

    .wheel,
    .spoke {
      border-radius: 50%;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .wheel {
      background: radial-gradient(
        100% 100% at center,
        hsla(0, 0%, 60%, 0) 47.8%,
        hsl(0, 0%, 60%) 48%
      );
      z-index: 2;
    }

    .hamster {
      animation: hamster var(--dur) ease-in-out infinite;
      top: 50%;
      left: calc(50% - 3.5em);
      width: 7em;
      height: 3.75em;
      transform: rotate(4deg) translate(-0.8em, 1.85em);
      transform-origin: 50% 0;
      z-index: 1;
    }

    .hamster__head {
      animation: hamsterHead var(--dur) ease-in-out infinite;
      background: hsl(30, 90%, 55%);
      border-radius: 70% 30% 0 100% / 40% 25% 25% 60%;
      box-shadow: 0 -0.25em 0 hsl(30, 90%, 80%) inset,
        0.75em -1.55em 0 hsl(30, 90%, 90%) inset;
      top: 0;
      left: -2em;
      width: 2.75em;
      height: 2.5em;
      transform-origin: 100% 50%;
    }

    .hamster__ear {
      animation: hamsterEar var(--dur) ease-in-out infinite;
      background: hsl(0, 90%, 85%);
      border-radius: 50%;
      box-shadow: -0.25em 0 hsl(30, 90%, 55%) inset;
      top: -0.25em;
      right: -0.25em;
      width: 0.75em;
      height: 0.75em;
      transform-origin: 50% 75%;
    }

    .hamster__eye {
      animation: hamsterEye var(--dur) linear infinite;
      background-color: hsl(0, 0%, 0%);
      border-radius: 50%;
      top: 0.375em;
      left: 1.25em;
      width: 0.5em;
      height: 0.5em;
    }

    .hamster__nose {
      background: hsl(0, 90%, 75%);
      border-radius: 35% 65% 85% 15% / 70% 50% 50% 30%;
      top: 0.75em;
      left: 0;
      width: 0.2em;
      height: 0.25em;
    }

    .hamster__body {
      animation: hamsterBody var(--dur) ease-in-out infinite;
      background: hsl(30, 90%, 90%);
      border-radius: 50% 30% 50% 30% / 15% 60% 40% 40%;
      box-shadow: 0.1em 0.75em 0 hsl(30, 90%, 55%) inset,
        0.15em -0.5em 0 hsl(30, 90%, 80%) inset;
      top: 0.25em;
      left: 2em;
      width: 4.5em;
      height: 3em;
      transform-origin: 17% 50%;
      transform-style: preserve-3d;
    }

    .hamster__limb--fr,
    .hamster__limb--fl {
      clip-path: polygon(0 0, 100% 0, 70% 80%, 60% 100%, 0% 100%, 40% 80%);
      top: 2em;
      left: 0.5em;
      width: 1em;
      height: 1.5em;
      transform-origin: 50% 0;
    }

    .hamster__limb--fr {
      animation: hamsterFRLimb var(--dur) linear infinite;
      background: linear-gradient(hsl(30, 90%, 80%) 80%, hsl(0, 90%, 75%) 80%);
      transform: rotate(15deg) translateZ(-1px);
    }

    .hamster__limb--fl {
      animation: hamsterFLLimb var(--dur) linear infinite;
      background: linear-gradient(hsl(30, 90%, 90%) 80%, hsl(0, 90%, 85%) 80%);
      transform: rotate(15deg);
    }

    .hamster__limb--br,
    .hamster__limb--bl {
      border-radius: 0.75em 0.75em 0 0;
      clip-path: polygon(
        0 0,
        100% 0,
        100% 30%,
        70% 90%,
        70% 100%,
        30% 100%,
        40% 90%,
        0% 30%
      );
      top: 1em;
      left: 2.8em;
      width: 1.5em;
      height: 2.5em;
      transform-origin: 50% 30%;
    }

    .hamster__limb--br {
      animation: hamsterBRLimb var(--dur) linear infinite;
      background: linear-gradient(hsl(30, 90%, 80%) 90%, hsl(0, 90%, 75%) 90%);
      transform: rotate(-25deg) translateZ(-1px);
    }

    .hamster__limb--bl {
      animation: hamsterBLLimb var(--dur) linear infinite;
      background: linear-gradient(hsl(30, 90%, 90%) 90%, hsl(0, 90%, 85%) 90%);
      transform: rotate(-25deg);
    }

    .hamster__tail {
      animation: hamsterTail var(--dur) linear infinite;
      background: hsl(0, 90%, 85%);
      border-radius: 0.25em 50% 50% 0.25em;
      box-shadow: 0 -0.2em 0 hsl(0, 90%, 75%) inset;
      top: 1.5em;
      right: -0.5em;
      width: 1em;
      height: 0.5em;
      transform: rotate(30deg) translateZ(-1px);
      transform-origin: 0.25em 0.25em;
    }

    .spoke {
      animation: spoke var(--dur) linear infinite;
      background: radial-gradient(
          100% 100% at center,
          hsl(0, 0%, 60%) 4.8%,
          hsla(0, 0%, 60%, 0) 5%
        ),
        linear-gradient(
            hsla(0, 0%, 55%, 0) 46.9%,
            hsl(0, 0%, 65%) 47% 52.9%,
            hsla(0, 0%, 65%, 0) 53%
          )
          50% 50% / 99% 99% no-repeat;
    }

    /* Animations */
    @keyframes hamster {
      from,
      to {
        transform: rotate(4deg) translate(-0.8em, 1.85em);
      }

      50% {
        transform: rotate(0) translate(-0.8em, 1.85em);
      }
    }

    @keyframes hamsterHead {
      from,
      25%,
      50%,
      75%,
      to {
        transform: rotate(0);
      }

      12.5%,
      37.5%,
      62.5%,
      87.5% {
        transform: rotate(8deg);
      }
    }

    @keyframes hamsterEye {
      from,
      90%,
      to {
        transform: scaleY(1);
      }

      95% {
        transform: scaleY(0);
      }
    }

    @keyframes hamsterEar {
      from,
      25%,
      50%,
      75%,
      to {
        transform: rotate(0);
      }

      12.5%,
      37.5%,
      62.5%,
      87.5% {
        transform: rotate(12deg);
      }
    }

    @keyframes hamsterBody {
      from,
      25%,
      50%,
      75%,
      to {
        transform: rotate(0);
      }

      12.5%,
      37.5%,
      62.5%,
      87.5% {
        transform: rotate(-2deg);
      }
    }

    @keyframes hamsterFRLimb {
      from,
      25%,
      50%,
      75%,
      to {
        transform: rotate(50deg) translateZ(-1px);
      }

      12.5%,
      37.5%,
      62.5%,
      87.5% {
        transform: rotate(-30deg) translateZ(-1px);
      }
    }

    @keyframes hamsterFLLimb {
      from,
      25%,
      50%,
      75%,
      to {
        transform: rotate(-30deg);
      }

      12.5%,
      37.5%,
      62.5%,
      87.5% {
        transform: rotate(50deg);
      }
    }

    @keyframes hamsterBRLimb {
      from,
      25%,
      50%,
      75%,
      to {
        transform: rotate(-60deg) translateZ(-1px);
      }

      12.5%,
      37.5%,
      62.5%,
      87.5% {
        transform: rotate(20deg) translateZ(-1px);
      }
    }

    @keyframes hamsterBLLimb {
      from,
      25%,
      50%,
      75%,
      to {
        transform: rotate(20deg);
      }

      12.5%,
      37.5%,
      62.5%,
      87.5% {
        transform: rotate(-60deg);
      }
    }

    @keyframes hamsterTail {
      from,
      25%,
      50%,
      75%,
      to {
        transform: rotate(30deg) translateZ(-1px);
      }

      12.5%,
      37.5%,
      62.5%,
      87.5% {
        transform: rotate(10deg) translateZ(-1px);
      }
    }

    @keyframes spoke {
      from {
        transform: rotate(0);
      }

      to {
        transform: rotate(-1turn);
      }
    }
  }
}
</style>
