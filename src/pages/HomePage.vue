<template>
  <div id="jumbotron">
    <div class="prova">ciao</div>
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
  width: 100%;
  height: 100%;
  padding: 80px;
  background-image: url("/images/jumbotron/onda.svg");
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
}
.prova2 {
  background-color: $primary-color-2;
  color: $primary-color;
}
</style>
