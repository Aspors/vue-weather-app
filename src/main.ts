import './assets/main.sass'
import "./prototype-enhancers/string-enhancer";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import Spinner from './components/spinner/Spinner.vue';

const app = createApp(App)

app.component("Spinner", Spinner)
app.use(createPinia())

app.mount('#app')
