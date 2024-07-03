<template>
  <div class="card">
    <div class="image-container">
      <img
        :src="getImage"
        @error="setDefaultImage"
        class="card-img-top"
        :alt="restaurant.name"
      />
    </div>
    <div class="card-body">
      <p class="card-title fw-bold">{{ restaurant.name }}</p>
      <p class="address">{{ restaurant.address }}</p>
    </div>
  </div>
</template>

<script>
import { store } from "../store";
export default {
  name: "CardComponent",
  props: ["restaurant"],
  data() {
    return {
      store,
    };
  },
  computed: {
    getImage() {
      return this.restaurant.image
        ? `${this.store.api.imgBasePath}${this.restaurant.image}`
        : this.store.api.defaultImg;
    },
  },
  methods: {
    setDefaultImage(event) {
      event.target.src = this.store.api.defaultImg;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  border: 0;
  border-radius: 0;
  background-color: transparent;

  .image-container {
    position: relative;
    overflow: hidden;
    border-radius: 20px;
  }

  .card-img-top {
    width: 100%;
    height: 155px;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }

  .card-body {
    padding: 4px;

    p {
      margin: 0;
      &.address {
        font-size: 0.8rem;
        margin-top: -4px;
      }
    }
  }
}
</style>
