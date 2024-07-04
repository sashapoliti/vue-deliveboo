<template>
    <div class="container card rounded-5">
        <PaymentComponent />
    </div>
</template>

<script>
 import PaymentComponent from "../components/PaymentComponent.vue";
    export default {
        name: "Checkout",
        components: {
            PaymentComponent
        },
        
    }
</script>

<style lang="scss" scoped>
    .container {
        margin-top: 50px;
        text-align: center;
    }
</style>