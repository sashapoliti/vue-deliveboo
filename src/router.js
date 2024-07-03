import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import RestaurantMenu from "./pages/RestaurantMenu.vue";

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
        }
    ]
});

export { router };