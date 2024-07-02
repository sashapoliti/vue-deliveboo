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
    getTypes() {
      axios
        .get(this.store.api.baseUrl + this.store.api.types)
        .then((response) => {
          this.store.data.types = response.data;

          console.log(response.data);
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
