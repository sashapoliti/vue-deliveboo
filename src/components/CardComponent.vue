<template>
  <div class="card">
    <div class="image-container">
      <img
        :src="getImage"
        @error="setDefaultImage"
        class="card-img-top"
        :alt="restaurant.name"
      />
      <div class="badges">
          <span class="badge rounded-pill" v-for="$type in restaurant.types">{{ $type.name }}</span>
      </div>
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
@import "../assets/styles/partials/_variables.scss";

.card {
  border: 0;
  border-radius: 0;
  background-color: transparent;

  .image-container {
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    .badges {
      position: absolute;
      bottom: 8px;
      right: 12px;
      z-index: 1;
      .badge {
        background-color: $tertiary-color;
        color: $primary-color;
        font-size: 0.7rem;
        margin: 0 2px;
      }
    }
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
