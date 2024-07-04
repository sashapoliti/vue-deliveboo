<template>
  <div class="container-checkout card rounded-5 my-5">
    <div class="d-flex justify-content-center mb-3 mt-5">
      <h1>Checkout</h1>
    </div>
    <div class="container-bottom">
      <h2>Your details</h2>
      <p class="mx-1">Fields marked with <strong class="text-danger">*</strong> are required</p>
      <div class="my-3 mb-5 mt-4">
        <div class="container">
          <div class="row">
            <div class="col-6">
              <label for="name">Name <strong class="text-danger">*</strong></label>
              <input type="text" id="name" ref="name" maxlength="50" v-model="name" class="form-control my-3" placeholder="Name">
              <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
            </div>
            <div class="col-6">
              <label for="surname">Surname <strong class="text-danger">*</strong></label>
              <input type="text" id="surname" ref="surname" v-model="surname" maxlength="50" class="form-control my-3" placeholder="Surname">
              <span v-if="errors.surname" class="text-danger">{{ errors.surname }}</span>
            </div>
          </div>
          <label for="email">Email <strong class="text-danger">*</strong></label>
          <input type="email" id="email" ref="email" v-model="email" maxlength="50" class="form-control my-3" placeholder="Email">
          <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
        </div>
      </div>

      <h2>Your order is ready</h2>
      <p class="mx-1">Here are the details of your order:</p>
      <div class="product-container">
        <div>Bacon Cheeseburger<strong class="mx-3">x 2</strong></div>
        <div>€ 10.00</div>
      </div>
      <div class="product-container">
        <div>Bacon Cheeseburger<strong class="mx-3">x 2</strong></div>
        <div>€ 10.00</div>
      </div>
      <div class="total-container">
        <div>Total</div>
        <div>€ 20.00</div>
      </div>
      <h2 class="mt-5">Payment</h2>
      <p class="mx-1">Choose your payment method:</p>
      <PaymentComponent ref="paymentComponent" :name="name" :surname="surname" :email="email" @submit-payment="submitPayment" />
    </div>
  </div>
</template>

<script>
import PaymentComponent from "../components/PaymentComponent.vue";

export default {
  name: "Checkout",
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      errors: {}
    };
  },
  methods: {
    validateForm() {
      this.errors = {};
      if (!this.name) {
        this.errors.name = 'Name is required.';
      } else if (this.name.length < 3) {
        this.errors.name = 'Name must be at least 3 characters.';
      } else if (this.name.length > 50) {
        this.errors.name = 'Name must be at most 50 characters.';
      } else if (!/^[a-zA-Z]+$/.test(this.name)) {
        this.errors.name = 'Name must only contain letters.';
      }

      if (!this.surname) {
        this.errors.surname = 'Surname is required.';
      } else if (this.surname.length < 3) {
        this.errors.surname = 'Surname must be at least 3 characters.';
      }else if (this.surname.length > 50) {
        this.errors.surname = 'Surname must be at most 50 characters.';
      }else if (!/^[a-zA-Z]+$/.test(this.surname)) {
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
    }
  },
  components: {
    PaymentComponent
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

  