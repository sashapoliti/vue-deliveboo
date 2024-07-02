<template>
  <div class="d-flex">
    <div class="filter d-flex flex-column">
      <div v-for="item in store.data.types" :key="item.id">
        <input
          type="checkbox"
          :id="'checkbox-' + item.id"
          @change="updateSelectedTypes(item.id)"
        />
        <label :for="'checkbox-' + item.id">{{ item.name }}</label>
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
}
.restaurants {
  width: 80%;
}
</style>
