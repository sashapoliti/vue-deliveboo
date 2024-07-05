<template>
    <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-4" v-for="plate in store.data.restaurant.plates" :key="plate.id">
        <div class="card">
            <img :src="'http://127.0.0.1:8000/storage/' + plate.image" @error="setDefaultImage" class="card-img-top"
            :alt="plate.name">
            <div class="card-body">
            <!-- <p>{{ plate?.category }}</p> -->
            <h3 class="card-title">{{ plate.name }}</h3>
            <h5>{{ plate.price }} €</h5>
            <button class="btn btn-danger red-button">
                Add to cart
            </button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import { store } from "../store";
    export default {
        name: "ProductList", 
        data() {
            return {
                store
            }
        }
    }
</script>

<style lang="scss" scoped>



    .red-button {
    text-transform: uppercase;
    margin: 10px 0px 5px 0px;
    font-weight: 600;
    padding: 15px 20px 15px 20px;
    border-radius: 50px;
  }

  .card {
    border-radius: 20px;
    overflow: hidden;
  }

  .card-body {
    margin: 10px 15px 10px 15px;
  }

    .card-title {
      font-weight: 800;
    }


</style>