import './assets/styles/general.scss'

import { createApp } from 'vue'
import { router } from './router'
// import simpleParallax from 'simple-parallax-js';

import App from './App.vue'



createApp(App).use(router).mount('#app')

document.addEventListener("DOMContentLoaded", function() {
    const city = document.querySelector('.city');
    const rider = document.querySelector('.rider');
    const text = document.querySelector('.text');
  
    // Wait for the page to fully load
    setTimeout(() => {
      city.classList.add('animate');
      rider.classList.add('animate');
      text.classList.add('animate');
    }, 100); // Delay to ensure all elements are loaded
  });
  
  
  