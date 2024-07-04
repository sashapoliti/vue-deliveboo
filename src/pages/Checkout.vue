<template>
    <div class="container">
        <h1>Checkout</h1>
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

</style>