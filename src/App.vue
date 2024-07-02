<template>
  <HeaderComponent />
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import { store } from "./store";
import axios from "axios";
import HeaderComponent from "./components/HeaderComponent.vue";
import { onMounted } from "vue";
export default {
  name: "App",
  components: {
    HeaderComponent,
  },
  data() {
    return {
      store,
    };
  },
  methods: {
    getRestaurants() {
      axios
        .get(this.store.api.baseUrl + this.store.api.restaurants)
        .then((response) => {
          console.log(response.data);
          this.store.data.restaurants = response.data;
        })
        .catch((error) => {})
        .finally(() => {});
    },
  },
  mounted() {
    console.log("mounted");
    this.getRestaurants();
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/styles/partials/_variables.scss";

main {
  height: 100%;
}
</style>
