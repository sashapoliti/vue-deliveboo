<template>
  <div class="d-flex container">
    <!-- filter -->
    <div class="filter d-flex flex-column">
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
            <img
              :src="item.image"
              alt=""
            />
          </div>
          <span
            class="ms-2"
            :style="{
              'font-weight': selectedTypes.includes(item.id)
                ? 'bolder'
                : '500',
            }"
            >{{ item.name }}</span
          >
        </label>
      </div>
    </div>

    <!-- restaurants -->
    <div class="restaurants container">
      <div class="row">
        <div class="col-12 text-center mt-5" v-if="restaurants.length === 0">
          <h4>Non ci sono ristoranti</h4>
          <div>
            <i
              class="fa-solid fa-face-sad-tear fa-3x"
              style="color: rgba(0, 0, 0, 0.5)"
            ></i>
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
        .finally(() => {});
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
}
</style>
