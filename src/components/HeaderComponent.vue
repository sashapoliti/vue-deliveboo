<template>
    <header class="d-flex justify-content-center">
        <nav>
            nav
        </nav>
    </header>
</template>

<script>
    export default {
        name: "HeaderComponent"
    }
</script>

<style lang="scss" scoped>
@import '../assets/styles/partials/_variables.scss';

    header {
        position: fixed;
        top: 0;
        width: 100%;
        height: 80px;
        nav {
            width: 80%;
            background-color: $text-color;
            color: $primary-color;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
        }
    }
</style>