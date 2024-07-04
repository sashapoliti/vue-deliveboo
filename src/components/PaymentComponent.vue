<template>
  <div class="braintree-dropin-wrapper">
    <div id="dropin-container"></div>
    <div>
      <button @click="$emit('submit-payment')" class="btn btn-danger pay-button" :disabled="disabled">
        Proceed to Payment
      </button>
    </div>
    <div id="payment-result">{{ paymentResult }}</div>
  </div>
</template>

<script>
import dropin from 'braintree-web-drop-in';
import axios from 'axios';

export default {
  props: ['name', 'surname', 'email'],
  data() {
    return {
      clientToken: '',
      paymentResult: '',
      amount: 10,
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
            amount: this.amount,
            name: this.name,
            surname: this.surname,
            email: this.email
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
          this.$router.push({ name: 'home' });
          this.instance.clearSelectedPaymentMethod();
          this.disabled = false;
        }
      });
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
