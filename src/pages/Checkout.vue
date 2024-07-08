<template>
  <div class="container-checkout card rounded-5 my-5">
    <div class="d-flex justify-content-center mb-3 mt-5">
      <h1>Carrello</h1>
    </div>
    <div class="container-bottom">
      <h2>I tuoi dettagli</h2>
      <p class="mx-1">I campi marcati con <strong class="text-danger">*</strong> sono obbligatori</p>
      <div class="my-3 mb-5 mt-4">
        <div class="container">
          <div class="row">
            <div class="col-6">
              <label for="name">Nome <strong class="text-danger">*</strong></label>
              <input type="text" id="name" ref="name" maxlength="50" v-model="name" class="form-control my-3" placeholder="Nome">
              <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
            </div>
            <div class="col-6">
              <label for="surname">Cognome <strong class="text-danger">*</strong></label>
              <input type="text" id="surname" ref="surname" v-model="surname" maxlength="50" class="form-control my-3" placeholder="Cognome">
              <span v-if="errors.surname" class="text-danger">{{ errors.surname }}</span>
            </div>
          </div>
          <label for="email">Email <strong class="text-danger">*</strong></label>
          <input type="email" id="email" ref="email" v-model="email" maxlength="50" class="form-control my-3" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" placeholder="Email">
          <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
        </div>
      </div>

      <h2>Il tuo ordine è quasi pronto</h2>
      <p class="mx-1">Qui i dettagli del tuo ordine:</p>
      <div class="product-container">
        <ShoppingCart :cart="store.cart" @add-to-cart="addToCart" @remove-from-cart="removeFromCart" />
      </div>
      <h2 class="mt-5">Pagamento</h2>
      <p class="mx-1">Scegli il tuo metodo di pagamento:</p>
      <PaymentComponent ref="paymentComponent" :name="name" :surname="surname" :email="email" @submit-payment="submitPayment" />
    </div>
  </div>
</template>

<script>
import PaymentComponent from "../components/PaymentComponent.vue";
import ShoppingCart from "../components/ShoppingCart.vue";
import { store } from "../store";

export default {
  name: "Checkout",
  data() {
    return {
      store,
      name: '',
      surname: '',
      email: '',
      errors: {}
    };
  },
  created() {
    this.loadCart();
  },
  computed: {
    totalPrice() {
      return this.store.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }
  },
  methods: {
    addToCart(product) {
      const cartItem = this.store.cart.find(item => item.product.id === product.id);
      if (cartItem) {
        cartItem.quantity += product.quantity;
      } else {
        this.store.cart.push({ product: { ...product }, quantity: product.quantity });
      }
      this.saveCart();
    },
    removeFromCart(product) {
      const index = this.store.cart.findIndex(item => item.product.id === product.id);
      if (index !== -1) {
        this.store.cart.splice(index, 1);
      }
      this.saveCart();
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.store.cart));
    },
    loadCart() {
      const cart = localStorage.getItem('cart');
      if (cart) {
        this.store.cart = JSON.parse(cart);
      }
    },
    validateForm() {
      this.errors = {};
      if (!this.name) {
        this.errors.name = 'Name is required.';
      } else if (this.name.length < 3) {
        this.errors.name = 'Name must be at least 3 characters.';
      } else if (this.name.length > 50) {
        this.errors.name = 'Name must be at most 50 characters.';
      } else if (!/^[a-zA-Z-']+$/.test(this.name)) {
        this.errors.name = 'Name must only contain letters.';
      }

      if (!this.surname) {
        this.errors.surname = 'Surname is required.';
      } else if (this.surname.length < 3) {
        this.errors.surname = 'Surname must be at least 3 characters.';
      }else if (this.surname.length > 50) {
        this.errors.surname = 'Surname must be at most 50 characters.';
      } else if (!/^[a-zA-Z-']+$/.test(this.surname)) {
        this.errors.surname = 'Surname must only contain letters.';
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.errors.email = 'Email is required.';
      } else if (!emailPattern.test(this.email)) {
        this.errors.email = 'Email is not valid.';
      } else if (this.email.length > 50) {
        this.errors.email = 'Email must be at most 50 characters.';
      } 

      return Object.keys(this.errors).length === 0;
    },
    scrollToFirstError() {
      const errorFields = ['name', 'surname', 'email'];
      for (let field of errorFields) {
        if (this.errors[field]) {
          this.$nextTick(() => {
            this.$refs[field].scrollIntoView({ behavior: 'smooth', block: 'center' });
          });
          break;
        }
      }
    },
    submitPayment() {
      if (this.validateForm()) {
        // Call payment method in PaymentComponent
        this.$refs.paymentComponent.submitPayment();
      } else {
        this.scrollToFirstError();
      }
    },
    formatCurrency(value) {
      return `$${value.toFixed(2)}`;
    }
  },
  components: {
    PaymentComponent,
    ShoppingCart
  }
};
</script>

<style lang="scss" scoped>
.container-checkout {
  margin-top: 50px;
  width: 50%;
  margin: 0 auto;

  .container-bottom {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 50px;

    .product-container {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(109, 109, 109, 0.5);
      padding: 15px 0px;
    }

    .total-container {
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid rgba(73, 73, 73, 0.808);
      padding: 15px 0px;
    }
  }
}
</style>


  