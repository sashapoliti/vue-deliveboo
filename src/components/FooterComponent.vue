<template>
  <!-- Social section -->
  <section id="social">
    <div class="wrapper">
      <div class="icons d-flex justify-content-center align-items-center">
        <h3 class="me-3">Seguici qui</h3>
        <a
          class="mx-1 d-flex justify-content-center align-items-center"
          href="https://www.facebook.com"
        >
          <i class="fa-brands fa-facebook-f"></i>
        </a>
        <a
          class="mx-1 d-flex justify-content-center align-items-center"
          href="https://www.instagram.com"
        >
          <i class="fa-brands fa-instagram"></i>
        </a>
        <a
          class="mx-1 d-flex justify-content-center align-items-center"
          href="https://www.twitter.com"
        >
          <i class="fa-brands fa-x-twitter"></i>
        </a>
      </div>
      <div class="wave1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 310">
          <path
            xmlns="http://www.w3.org/2000/svg"
            fill="#fffae6"
            d="M 1439.875 207.988281 C 1439.910156 138.6875 1439.945312 69.390625 1439.980469 0.0898438 L 0.503906 0.0898438 C 0.339844 67.671875 0.179688 135.253906 0.0195312 202.832031 C 46.5625 163.878906 117.910156 180.152344 170.734375 210.042969 C 212.230469 233.523438 250.015625 264.21875 294.722656 281.730469 C 339.101562 299.109375 388.746094 312.453125 433.5 288.714844 C 466.488281 271.214844 489.0625 239.460938 516.78125 214.441406 C 573.707031 163.054688 655.621094 140.761719 730.734375 156.214844 C 811.910156 172.914062 884.964844 230.433594 967.671875 225.183594 C 1031.214844 221.148438 1085.835938 180.621094 1145.769531 159.128906 C 1243.519531 124.078125 1358.867188 143.382812 1439.875 208.355469 Z M 1439.875 207.988281 "
            fill-opacity="1"
            fill-rule="nonzero"
          />
          <path
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffe4c4"
            d="M 1439.980469 193.554688 L 1439.980469 0.0898438 L 0.503906 0.0898438 L 0.503906 144.378906 C 191.609375 36.726562 323.917969 260.550781 474.210938 195.679688 C 532.867188 170.359375 591.039062 125.03125 657.703125 120.300781 C 756.652344 113.289062 842.660156 174.359375 939.347656 172.277344 C 1016.480469 170.613281 1086.789062 128.691406 1162.539062 114.074219 C 1260.5625 95.164062 1366.359375 126.566406 1439.980469 193.554688 Z M 1439.980469 193.554688 "
            fill-opacity="1"
            fill-rule="nonzero"
          />
          <path
            xmlns="http://www.w3.org/2000/svg"
            fill="#fffae6"
            d="M 1439.980469 0.0898438 L 0.503906 0.0898438 L 0.503906 90.234375 C 261.4375 19.621094 379.324219 209.8125 532.15625 119.546875 C 600.441406 79.21875 677.5625 39.390625 759.109375 39.566406 C 845.886719 39.757812 924.140625 93.65625 1012.179688 90.628906 C 1085.984375 88.09375 1153.09375 48.203125 1225.394531 33.167969 C 1297.667969 18.140625 1374.539062 30.472656 1439.980469 64.410156 Z M 1439.980469 0.0898438 "
            fill-opacity="1"
            fill-rule="nonzero"
          />
        </svg>
      </div>
      <div class="wave2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
          <path
            fill="#30533F"
            fill-opacity="1"
            d="M0,128L30,160C60,192,120,256,180,240C240,224,300,128,360,101.3C420,75,480,117,540,149.3C600,181,660,203,720,192C780,181,840,139,900,117.3C960,96,1020,96,1080,106.7C1140,117,1200,139,1260,160C1320,181,1380,203,1410,213.3L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  </section>

  <!-- Footer section -->
  <footer></footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/partials/_variables.scss";

#social {
  background-color: $primary-color-2;
  .wrapper {
    position: relative;
    width: 100%;
    background-image: url("/images/social/background.png");
    .icons {
      position: absolute;
      width: 350px;
      height: 120px;
      top: calc(50% - 50px);
      left: calc(50% - 175px);
      background-color: $primary-color-2;
      color: $tertiary-color;
      border-radius: 20px;
      a {
        font-size: 1.7rem;
        background-color: $primary-color;
        color: $tertiary-color;
        width: 50px;
        height: 50px;
        border-radius: 50px;
        transition: background-color 0.3s ease-in-out;
        &:hover {
          background-color: $tertiary-color;
          color: $primary-color;
        }
      }
    }
    .wave1 {
      width: 100%;
      height: 300px;
    }
    .wave2 {
      width: 100%;
      img {
        display: inline-block;
      }
    }
  }
}

footer {
  position: relative;
  margin-top: -1px;
  width: 100%;
  height: 200px;
  background-color: $secondary-color;
}
</style>
