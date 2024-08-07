import { reactive } from "vue";

export const store = reactive({
  api: {
    baseUrl: "http://127.0.0.1:8000/api/",
    imgBasePath: "http://127.0.0.1:8000/storage/",
    defaultImg: "/images/placeholder.svg",
    restaurants: "restaurants/",
    types: "types/",
  },
  data: {
    types: [],
    restaurant: {},
    totalPrice: 0,
    emptyCart: "",
    order: {},
    flagOrder: false
  },
  loader: false,
  cart: [],
  restaurantcart: null,
  flag: false,
  functions: {
    addToCart(product) {
      if (!store.restaurantcart) {
        store.restaurantcart = {
          id: store.data.restaurant.id,
          name: store.data.restaurant.name,
          slug: store.data.restaurant.slug,
        };
      }
      const cartItem = store.cart.find(
        (item) => item.product.id === product.id
      );
      if (cartItem) {
        cartItem.quantity += product.quantity;
      } else {
        store.cart.push({
          product: { ...product },
          quantity: product.quantity,
        });
      }
      this.saveCart();
    },
    removeFromCart(product) {
      const index = store.cart.findIndex(
        (item) => item.product.id === product.id
      );
      if (index !== -1) {
        store.cart.splice(index, 1);
      }
      if (store.cart.length === 0) {
        store.restaurantcart = null;
        console.log(store.restaurantcart);
      }
      this.saveCart();
    },
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(store.cart));
      localStorage.setItem('restaurantcart', JSON.stringify(store.restaurantcart));
    },
    loadCart() {
      const cart = localStorage.getItem("cart");
      if (cart) {
        store.cart = JSON.parse(cart);
      }
      const restaurantcart = localStorage.getItem("restaurantcart");
      if (restaurantcart) {
        store.restaurantcart = JSON.parse(restaurantcart);
    }
    },
    updateQuantity: (product, quantity) => {
      const cartItem = store.cart.find(
        (item) => item.product.id === product.id
      );
      if (cartItem && quantity > 0) {
        cartItem.quantity = quantity;
      } else if (cartItem && quantity <= 0) {
        store.functions.removeFromCart(product);
      }
      if (store.cart.length === 0) {
        store.restaurantcart = null;
    }
      store.functions.saveCart();
    },
    clearCart() {
      store.cart = [];
      store.restaurantcart = null;
      store.functions.saveCart();
    },
  },
});
