<template>
  <div>
    <img :src="getImage" @error="setDefaultImage"  :alt="store.data.restaurant.name">
    <!-- <h1>{{ store.data.restaurant.name }}</h1> -->
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

<style lang="scss" scoped></style>
