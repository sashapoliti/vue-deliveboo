<template>
    <div class="braintree-dropin-wrapper">
      <h2>Fake Payment Form</h2>
      <div id="dropin-container"></div>
      <button @click="submitPayment">Paga</button>
      <div id="payment-result">{{ paymentResult }}</div>
    </div>
  </template>
  
  <script>
  import dropin from 'braintree-web-drop-in';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        clientToken: '',
        paymentResult: '',
        amount: 10,
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
        this.instance.requestPaymentMethod(async (err, payload) => {
          if (err) {
            console.error(err);
            return;
          }
  
          try {
            const response = await axios.post('http://localhost:8000/api/payment/process', {
              payment_method_nonce: payload.nonce,
              amount: this.amount,
            });
            if (response.data.success) {
              this.paymentResult = `Pagamento completato con successo! ID transazione: ${response.data.transaction_id}`;
            } else {
              this.paymentResult = `Errore durante il pagamento: ${response.data.message}`;
            }
          } catch (error) {
            console.error('Errore:', error);
          }
        });
      },
    },
  };
  </script>
  
  <style>
  .braintree-dropin-wrapper {
    max-width: 400px;
    margin: auto;
  }
  </style>
  