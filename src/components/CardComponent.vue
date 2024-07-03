<template>
    <div class="card" >
        <img :src="getImage" @error="setDefaultImage" class="card-img-top" :alt="restaurant.name">
        <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
        </div>
    </div>
</template>

<script>
import { store } from "../store";
export default {
    name: "CardComponent",
    props: ['restaurant'],
    data() {
        return {
            store
        }
    },
    computed: {
        getImage() {
            return this.restaurant.image ? `${this.store.api.imgBasePath}${this.restaurant.image}` : this.store.api.defaultImg;
        }
    },
    methods: {
        setDefaultImage(event) {
            event.target.src = this.store.api.defaultImg;
        }
    }
}
</script>

<style lang="scss" scoped>
    .card {
        width: 200px;
        height: 300px !important;
        img{
            height: 180px !important;
        }
    }
</style>