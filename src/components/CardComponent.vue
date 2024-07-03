<template>
    <div class="card" >
        <img :src=" restaurant.image " class="card-img-top" :alt=" restaurant.name ">
        <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardComponent",
    props: {
        restaurant: Object
    }
}
</script>

<style lang="scss" scoped>

</style>