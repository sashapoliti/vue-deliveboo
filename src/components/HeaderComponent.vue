<template>
    <header>
        <div class="navbar">
        <div class="navbar-logo">Eatsy</div>
        <div class="navbar-menu">
            <a href="#">HOME</a>
            <a href="#">CHI SIAMO</a>
            <a href="#">BLOG</a>
            <a href="#">NEGOZIO</a>
        </div>
        <div class="navbar-contact">
            <span>Ordina per telefono</span>
            <span class="phone-number">1-800-700-600</span>
            <a href="#" class="navbar-button">VEDI MENU COMPLETO</a>
        </div>
    </div>
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
            margin: 0;
            font-family: Arial, sans-serif;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 999;
        }
        .navbar {
            background-color: transparent;
            border: 2px solid $secondary-color;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            border-radius: 50px;
            margin:10px;
            a{
                color: white;
            }
        }
        .navbar-logo {
            font-size: 24px;
            font-weight: bold;
            color: white;
        }
        .navbar-menu {
            display: flex;
            gap: 20px;
        }
        .navbar-menu a {
            text-decoration: none;
            color: black;
            font-size: 16px;
        }
        .navbar-contact {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .navbar-contact span {
            font-size: 16px;
            color: black;
        }
        .navbar-contact .phone-number {
            color: $secondary-color;
            font-weight: bold;
        }
        .navbar-button {
            padding: 10px 20px;
            border: 2px solid #EF3E3E;
            border-radius: 50px;
            color: #EF3E3E;
            text-decoration: none;
            font-size: 16px;
        }
        .navbar-button:hover {
            background-color: #EF3E3E;
            color: white;
        }
</style>