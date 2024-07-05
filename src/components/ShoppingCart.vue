<template>
    <div>
        <h2>Cart</h2>
        <p>Contenuto</p>
        <div class="linea"></div>
        <div class="d-flex justify-content-between my-3">
            <h5>Totale</h5>
            <h5>10 €</h5>
        </div>
        <div class="text-center">
            <button class="btn btn-danger red-button" @click="$router.push({ name: 'checkout' })">
                Checkout
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ShoppingCart",
};
</script>

<style lang="scss" scoped>
.linea {
      width: 100%;
      height: 1px;
      background-color: #e6d4c3;
    }
</style>
