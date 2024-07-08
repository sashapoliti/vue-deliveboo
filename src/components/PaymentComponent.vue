<template>
  <div class="braintree-dropin-wrapper">
    <div id="dropin-container"></div>
    <div>
      <button @click="$emit('submit-payment')" class="btn btn-danger pay-button" :disabled="disabled">
        Procedi al pagamento
      </button>
    </div>
    <div id="payment-result">{{ paymentResult }}</div>
  </div>
</template>

<script>
import dropin from 'braintree-web-drop-in';
import axios from 'axios';
import { store } from "../store";

export default {
  props: ['name', 'surname', 'email', 'phone', 'address'],
  data() {
    return {
      store,
      clientToken: '',
      paymentResult: '',
      disabled: false,
    };
  },
  mounted() {
    this.getClientToken();
  },
  methods: {
    async getClientToken() {
      try {
        const response = await axios.get('http://localhost:8000/api/payment/token');
        this.clientToken = response.data.clientToken;
        this.setupDropin();
      } catch (error) {
        console.error('Errore nel generare il client token:', error);
      }
    },
    setupDropin() {
      dropin.create({
        authorization: this.clientToken,
        container: '#dropin-container',
      }, (createErr, instance) => {
        if (createErr) {
          console.error(createErr);
          return;
        }
        this.instance = instance;
      });
    },
    async submitPayment() {
      this.disabled = true;
      this.instance.requestPaymentMethod(async (err, payload) => {
        if (err) {
          console.error(err);
          this.disabled = false;
          return;
        }

        try {
          const response = await axios.post('http://localhost:8000/api/payment/process', {
            payment_method_nonce: payload.nonce,
            amount: this.store.data.totalPrice,
            name: this.name,
            surname: this.surname,
            email: this.email,
            phone: this.phone,
            address: this.address
          });
          if (response.data.success) {
            this.paymentResult = `Pagamento completato con successo! ID transazione: ${response.data.transaction_id}`;
            this.$router.push({ name: 'home' });
          } else {
            this.paymentResult = `Errore durante il pagamento: ${response.data.message}`;
            // this.$router.push({ name: 'home' });
          }
        } catch (error) {
          console.error('Errore:', error);
          // this.$router.push({ name: 'home' });
        } finally {
          this.dbOrder();
          store.cart = [];
          store.data.totalPrice = 0;  
          store.restaurantcart = '';
          this.disabled = false;
          this.$router.push({ name: 'home' });
          store.functions.saveCart();
        }
      });
    },
    dbOrder() {
      const data = {
        restaurant_id: this.store.data.restaurant.id,
        customer_name: this.name,
        customer_surname: this.surname,
        customer_email: this.email,
        customer_phone: this.phone,
        customer_address: this.address,
        total_price: this.store.data.totalPrice,
        cart: this.store.cart
      };
           
  axios.post('http://localhost:8000/api/order', data)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error('Errore durante l\'invio dell\'ordine:', error);
    }).finally(() => {});
    }
  }
};
</script>

<style>
.braintree-dropin-wrapper {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
.pay-button {
  text-transform: uppercase;
  margin: 10px 0px 5px 0px;
  font-weight: 600;
  padding: 15px 20px 15px 20px;
  border-radius: 50px;
}
</style>
