<template>
    <div class="container d-flex justify-content-center">
        <div class="text-center" id="first_dino">
            <img src="/images/dino_game/dino.png" alt="dino" >
            <h3 class="align-content-end">404 NOT FOUND</h3>
        </div>
        <div class="d-flex justify-content-center mt-5 position-relative">
            <canvas id="board" width="750" height="250"></canvas>
            <div class="position-absolute top-50 start-50 translate-middle text-center" id="restart">
                <h5>You Score is:<span id="final_score"></span></h5>
                <button>RESTART</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotFound",
}
</script>

<style lang="scss" scoped>
    body {
        text-align: center;
    }

    #board {
        display: none;
        background-color: rgb(255, 255, 255);
        border-bottom: 1px solid black;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    #restart {
        display: none;
    }

    .d-none {
        display: none;
    }

    #first_dino{
        img{
            width: 100px;
        }	
        &:hover {
            filter: brightness(0.9);
            cursor: pointer;
        }
        
    }
</style>