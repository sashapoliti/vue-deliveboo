<template>
  <div>
    <h1>{{ store.data.restaurant.name }}</h1>
  </div>
</template>

<script>
import { store } from "../store";
import axios from "axios";

export default {
  name: "RestaurantMenu",
  data() {
    return {
      store,
    };
  },
  mounted() {
    console.log(this.store.data.restaurant);
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

<style lang="scss" scoped></style>
