<template>
  <div class="d-flex">
    <div class="filter d-flex flex-column">
      <div class="mb-2" v-for="item in store.data.types" :key="item.id">
        <label :for="'checkbox-' + item.id" class="container-checkbox d-flex align-items-center">
          <input
            type="checkbox"
            :id="'checkbox-' + item.id"
            @change="updateSelectedTypes(item.id)"
          />
          <div class="checkmark"></div>
          <span class="ms-2">{{ item.name }}</span>
        </label>
      </div>
    </div>
    <div class="restaurants">
      <p v-if="!restaurants">Non ci sono ristoranti</p>
      <ul v-else>
        <li v-for="restaurant in restaurants" :key="restaurant.id">
          {{ restaurant.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { store } from "../store";
import axios from "axios";
export default {
  name: "RestaurantsFilter",
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
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/partials/_variables.scss";

.filter {
  width: 20%;
  span {
    font-size: 1rem;
    margin-bottom: -5px;
  }
  .container-checkbox input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .container-checkbox {
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
    height: 1em;
    width: 1em;
    background-color: $primary-color-2;
    border-radius: 0.2pc;
    box-shadow: 3px 3px $secondary-color;
  }
  /* When the checkbox is checked, add a blue background */
  .container-checkbox input:checked ~ .checkmark {
    background-color: $tertiary-color;
  }
  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  /* Show the checkmark when checked */
  .container-checkbox input:checked ~ .checkmark:after {
    display: block;
  }
  /* Style the checkmark/indicator */
  .container-checkbox .checkmark:after {
    left: 0.40em;
    top: 0.25em;
    width: 0.25em;
    height: 0.5em;
    border: solid $primary-color;
    border-width: 0 0.15em 0.15em 0;
    transform: rotate(45deg);
  }
}
.restaurants {
  width: 80%;
}
</style>
