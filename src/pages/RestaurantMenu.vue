<template>
  <div>
    <div class="img-container">
      <img :src="getImage" @error="setDefaultImage" :alt="store.data.restaurant.name">
    </div>
    <div class="wave">
      <img src="/images/wave.svg" alt="wave" class="wave-img">
    </div>
    <div class="ok">
      <h1>dsfgdfgvdfsg</h1>
    </div>
  
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

<style lang="scss" scoped>
.img-container {
  height: 360px !important;
  overflow: hidden;

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
.ok {
  margin-top: -100px;
}

</style>
