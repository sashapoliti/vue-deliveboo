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
              <input type="text" id="name" ref="name" maxlength="50" v-model="name" class="form-control my-3"
                placeholder="Nome">
              <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
            </div>
            <div class="col-6">
              <label for="surname">Cognome <strong class="text-danger">*</strong></label>
              <input type="text" id="surname" ref="surname" v-model="surname" maxlength="50" class="form-control my-3"
                placeholder="Cognome">
              <span v-if="errors.surname" class="text-danger">{{ errors.surname }}</span>
            </div>
          </div>
          <label for="email">Email <strong class="text-danger">*</strong></label>
          <input type="email" id="email" ref="email" v-model="email" maxlength="50" class="form-control my-3" required
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" placeholder="Email">
          <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
          <div class="row">
            <div class="col-6">
              <label for="phone">Cellulare <strong class="text-danger">*</strong></label>
              <input type="text" id="phone" ref="phone" maxlength="10" minlength="10" v-model="phone"
                class="form-control my-3" placeholder="Cellulare">
              <span v-if="errors.phone" class="text-danger">{{ errors.phone }}</span>
            </div>
            <div class="col-6">
              <label for="address">Indirizzo <strong class="text-danger">*</strong></label>
              <input type="text" id="address" ref="address" v-model="address" maxlength="50" class="form-control my-3"
                placeholder="Indirizzo">
              <span v-if="errors.address" class="text-danger">{{ errors.address }}</span>
            </div>
          </div>
        </div>
      </div>

      <h2>Il tuo ordine è quasi pronto</h2>
      <p class="mx-1">Qui i dettagli del tuo ordine:</p>
      <div class="product-container">
        <ShoppingCart :cart="store.cart" />
      </div>
      <h2 class="mt-5">Pagamento</h2>
      <p class="mx-1">Scegli il tuo metodo di pagamento:</p>
      <PaymentComponent ref="paymentComponent" :name="name" :surname="surname" :email="email" :phone="phone"
        :address="address" @submit-payment="submitPayment" />
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
      phone: '',
      address: '',
      errors: {}
    };
  },
  created() {
    store.functions.loadCart();
  },
  computed: {
    totalPrice() {
      return this.store.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.name) {
        this.errors.name = 'Il nome è obbligatorio.';
      } else if (this.name.length < 3) {
        this.errors.name = 'Il nome deve avere almeno 3 caratteri.';
      } else if (this.name.length > 50) {
        this.errors.name = 'Il nome deve avere al massimo 50 caratteri.';
      } else if (!/^[a-zA-Z-']+$/.test(this.name)) {
        this.errors.name = 'Il nome deve contenere solo lettere.';
      }

      if (!this.surname) {
        this.errors.surname = 'Il cognome è obbligatorio.';
      } else if (this.surname.length < 3) {
        this.errors.surname = 'Il cognome deve avere almeno 3 caratteri.';
      } else if (this.surname.length > 50) {
        this.errors.surname = 'Il cognome deve avere al massimo 50 caratteri.';
      } else if (!/^[a-zA-Z-']+$/.test(this.surname)) {
        this.errors.surname = 'Il cognome deve contenere solo lettere.';
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.errors.email = 'L\'email è obbligatoria.';
      } else if (!emailPattern.test(this.email)) {
        this.errors.email = 'L\'email non è valida.';
      } else if (this.email.length > 50) {
        this.errors.email = 'L\'email deve avere al massimo 50 caratteri.';
      }

      if (!this.phone) {
        this.errors.phone = 'Il numero di telefono è obbligatorio.';
      } else if (!/^\d{10}$/.test(this.phone)) {
        this.errors.phone = 'Il numero di telefono deve avere almeno 10 numeri.';
      }
      
      if (!this.address) {
        this.errors.address = 'L\'indirizzo è obbligatorio.';
      } else if (this.address.length < 5) {
        this.errors.address = 'L\'indirizzo deve avere almeno 5 caratteri.';
      } else if (this.address.length > 50) {
        this.errors.address = 'L\'indirizzo deve avere al massimo 50 caratteri.';
      }

      return Object.keys(this.errors).length === 0;
    },
    scrollToFirstError() {
      const errorFields = ['name', 'surname', 'email', 'phone', 'address'];
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