<template>
  <!-- <HeaderComponent /> -->
  <main>
    <router-view></router-view>
    <FooterComponent />
  </main>
  
</template>

<script>
import { store } from "./store";
import axios from "axios";
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      store,
    };
  },
  methods: {
    getTypes() {
      axios
        .get(this.store.api.baseUrl + this.store.api.types)
        .then((response) => {
          this.store.data.types = response.data;
          /* console.log(this.store.data.types); */
        })
        .catch((error) => {})
        .finally(() => {});
    },
  },
  mounted() {
    this.getTypes();
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/styles/partials/_variables.scss";

main {
  height: 100%;
}
</style>
