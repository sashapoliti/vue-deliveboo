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
            <div class="row ">
              <div class="col-6">
                <label for="name">Name <strong class="text-danger">*</strong></label>
                <input type="text" id="name" v-model="name"  class="form-control my-3" placeholder="Name">
              </div>
              <div class="col-6">
                <label for="surname">Surname <strong class="text-danger">*</strong></label>
                <input type="text" id="surname" v-model="surname"  class="form-control my-3" placeholder="Surname">
              </div>
            </div>
            <label for="email">Email <strong class="text-danger">*</strong></label>
            <input type="email" id="email" v-model="email"  class="form-control my-3" placeholder="Email">
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
        <PaymentComponent :name="name" :surname="surname" :email="email" />
      </div>
    </div>
  </template>
  
  <script>
  import PaymentComponent from "../components/PaymentComponent.vue";
  
  export default {
    name: "Checkout",
    components: {
      PaymentComponent
    },
    data() {
      return {
        name: '',
        surname: '',
        email: ''
      };
    }
  }
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
        // border-top: 1px solid rgba(73, 73, 73, 0.808);
        border-bottom: 2px solid rgba(73, 73, 73, 0.808);
        padding: 15px 0px;
      }
    }
  }
  </style>
  