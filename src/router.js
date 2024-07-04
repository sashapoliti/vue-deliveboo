import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import RestaurantMenu from "./pages/RestaurantMenu.vue";
import NotFound from "./pages/NotFound.vue";
import Checkout from "./pages/Checkout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/restaurants/:slug",
      name: "restaurant",
      component: RestaurantMenu,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: Checkout,
      // beforeEnter: (to, from) => {
      //   if (Object.keys(store.data.restaurant).length > 0) {
      //     return true;
      //   } else {
      //     return { name: "home" };
      //   }
      // },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound,
    },
  ],
});

export { router };
