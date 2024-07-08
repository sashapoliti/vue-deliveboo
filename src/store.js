import { reactive } from 'vue';

export const store = reactive({
    api: {
        baseUrl: 'http://127.0.0.1:8000/api/',
        imgBasePath: 'http://127.0.0.1:8000/storage/',
        defaultImg: '/images/placeholder.svg',
        restaurants: 'restaurants/',
        types: 'types/',
    },
    data: {
        types: [],
        restaurant: {},
        totalPrice: 0,
    },
    cart: [],
    functions:{
        addToCart(product) {
            const cartItem = store.cart.find(item => item.product.id === product.id);
            if (cartItem) {
              cartItem.quantity += product.quantity;
            } else {
              store.cart.push({ product: { ...product }, quantity: product.quantity });
            }
            this.saveCart();
          },
          removeFromCart(product) {
            const index = store.cart.findIndex(item => item.product.id === product.id);
            if (index !== -1) {
              store.cart.splice(index, 1);
            }
            this.saveCart();
          },
          saveCart() {
            localStorage.setItem('cart', JSON.stringify(store.cart));
          },
          loadCart() {
            const cart = localStorage.getItem('cart');
            if (cart) {
              store.cart = JSON.parse(cart);
            }
          },
          updateQuantity: (product, quantity) => {
            const cartItem = store.cart.find(item => item.product.id === product.id);
            if (cartItem && quantity > 0) {
              cartItem.quantity = quantity;
            } else if (cartItem && quantity <= 0) {
              store.functions.removeFromCart(product);
            }
            store.functions.saveCart();
          }
    }
});