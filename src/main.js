import './assets/styles/general.scss'

import { createApp } from 'vue'
import { router } from './router'

import App from './App.vue'



createApp(App).use(router).mount('#app')

window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});