<template>
  <div id="jumbotron">
    <div class="city">
      <img src="/images/jumbotron/city1.png" alt="Immagine della città" />
    </div>
    <div class="rider">
      <img src="/images/jumbotron/rider.png" alt="Immagine del rider" />
    </div>
    <div class="text">
        <h1 class="text-uppercase">
            Morsi <br>
            pieni <br>
            di gusto
        </h1>
    </div>
  </div>
  <div class="prova2">
    <h1>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, iure?
      Nihil harum mollitia voluptates optio, tempore totam quaerat, eos
      voluptatum cupiditate laborum dolore reiciendis nobis fuga cumque suscipit
      deserunt necessitatibus nam aliquid beatae ut veniam. Laboriosam, odit
      asperiores officia fugit provident voluptatum quam sint voluptatibus porro
      harum enim quae explicabo totam a aperiam, voluptas autem illo dolorem
      dolor odio aspernatur assumenda illum? Minima quia odio suscipit quas
      voluptatum consequuntur delectus explicabo cumque nesciunt, labore id
      temporibus iste, nisi ab voluptates accusantium debitis facere, atque
      excepturi officia. Dolorem fugit nemo modi nihil odit quibusdam eaque quod
      quae corporis obcaecati, ducimus provident!
    </h1>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/partials/_variables.scss";

#jumbotron {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 80px;
  background-image: url("/images/jumbotron/onda.svg");
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  .text {
    color: $secondary-color;
    h1 {
      font-size: 7rem;
      font-weight: 800;
      letter-spacing: 7px;
      line-height: 0.9;
    }
  }
  .city {
    position: absolute;
    z-index: 2;
    width: 500px;
    bottom: calc(50% - 200px);
    right: 17%;
    img {
      width: 100%;
    }
  }
  .rider {
    position: absolute;
    z-index: 3;
    width: 500px;
    bottom: calc(50% - 280px);
    right: 5%;
    img {
      width: 100%;
    }
  }
}
.prova2 {
  background-color: $primary-color-2;
  color: $primary-color;
}
</style>
