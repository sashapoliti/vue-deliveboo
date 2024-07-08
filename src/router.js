import { createRouter, createWebHistory } from "vue-router";
import { store } from "./store";
import HomePage from "./pages/HomePage.vue";
import RestaurantMenu from "./pages/RestaurantMenu.vue";
import NotFound from "./pages/NotFound.vue";
import Checkout from "./pages/Checkout.vue";

const routes = [
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
    meta: {
      requiresCart: true
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard di navigazione globale
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresCart) && store.cart.length === 0) {
    store.data.emptyCart = 'Il carrello è vuoto.'
    next({ name: "home" });
  } else {
    next();
  }
});

export { router };
