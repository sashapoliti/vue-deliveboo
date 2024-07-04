<template>
    <div class="braintree-dropin-wrapper">
      <div id="dropin-container"></div>
      <button @click="submitPayment" class="btn btn-danger pay-button">Proceed to Payment</button>
      <div id="payment-result">{{ paymentResult }}</div>
    </div>
  </template>
  
  <script>
  import dropin from 'braintree-web-drop-in';
  import axios from 'axios';
  
  export default {
    props:[ 'name', 'surname', 'email' ],
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
              name: this.name,
              surname: this.surname,
              email: this.email
            });
            if (response.data.success) {
              this.paymentResult = `Pagamento completato con successo! ID transazione: ${response.data.transaction_id}`;
            } else {
              this.paymentResult = `Errore durante il pagamento: ${response.data.message}`;
            }
          } catch (error) {
            console.error('Errore:', error);
          } finally {
            this.instance.clearSelectedPaymentMethod();
            this.$router.push({ name: 'home' });

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
  