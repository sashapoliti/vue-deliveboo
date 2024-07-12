<template>
  <div class="braintree-dropin-wrapper">
    <div id="dropin-container"></div>
    <div>
      <button
        @click="handleClick"
        class="btn pay-button"
        :disabled="disabled"
        :class="{disabled: store.cart.length === 0}"
      >
        Procedi al pagamento
      </button>
    </div>
    <div id="payment-result">{{ paymentResult }}</div>
  </div>
</template>

<script>
import dropin from "braintree-web-drop-in";
import axios from "axios";
import { store } from "../store";

export default {
  props: ["name", "surname", "email", "phone", "address"],
  data() {
    return {
      store,
      clientToken: "",
      paymentResult: "",
      disabled: false,
    };
  },
  mounted() {
    this.getClientToken();
  },
  methods: {
    handleClick() {
      this.saveOrder();
      this.$emit('submit-payment');
    },
    saveOrder() {
      this.store.data.order = {};
      const data = {
        restaurant_id: this.store.data.restaurant.id,
        customer_name: this.name,
        customer_surname: this.surname,
        customer_email: this.email,
        customer_phone: this.phone,
        customer_address: this.address,
        total_price: this.store.data.totalPrice,
        cart: this.store.cart,
        restaurant_name: this.store.data.restaurant.name
      };      
      this.store.data.order = data;
      console.log(this.store.data.order);
    },
    async getClientToken() {
  
      try {
        const response = await axios.get(
          "http://localhost:8000/api/payment/token"
        );
        this.clientToken = response.data.clientToken;
        this.setupDropin();
      } catch (error) {
        console.error("Errore nel generare il client token:", error);
      }
    },
    setupDropin() {
      dropin.create(
        {
          authorization: this.clientToken,
          container: "#dropin-container",
          locale: "it",
        },
        (createErr, instance) => {
          if (createErr) {
            console.error(createErr);
            return;
          }
          this.instance = instance;
        }
      );
    },
    async submitPayment() {      
      store.flag = true;
      this.disabled = true;
      this.instance.requestPaymentMethod(async (err, payload) => {
        if (err) {
          console.error(err);
          this.disabled = false;
          store.flag = false;
          return;
        }

        try {
          this.store.loader = true;
          const response = await axios.post(
            "http://localhost:8000/api/payment/process",
            {
              payment_method_nonce: payload.nonce,
              amount: this.store.data.totalPrice,
              name: this.name,
              surname: this.surname,
              email: this.email,
              phone: this.phone,
              address: this.address,
              cart: this.store.cart,
              restaurant_name: this.store.data.restaurant.name
            }
          );
          if (response.data.success) {
            this.paymentResult = `Pagamento completato con successo! ID transazione: ${response.data.transaction_id}`;
            /* this.$router.push({ name: 'home' }); */
          } else {
            this.paymentResult = `Errore durante il pagamento: ${response.data.message}`;
            // this.$router.push({ name: 'home' });
          }
        } catch (error) {
          console.error("Errore:", error);
          // this.$router.push({ name: 'home' });
        } finally {
          this.dbOrder();
          // console.log(store.cart);
          store.cart = [];
          store.data.totalPrice = 0;
          store.restaurantcart = null;
          this.disabled = false;
          store.flag = false;
          store.functions.saveCart();
          store.data.flagOrder = true;
          this.store.loader = false;
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
        cart: this.store.cart,
      };

      axios
        .post("http://localhost:8000/api/order", data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Errore durante l'invio dell'ordine:", error);
        })
        .finally(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/partials/_variables.scss";

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
  background-color: $tertiary-color;
  color: $primary-color;
  transition: filter 0.3s ease-in-out;

  &:hover {
    filter: brightness(0.9);
  }
}
</style>
