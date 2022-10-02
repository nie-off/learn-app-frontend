import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

/* fontawesome stuff */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
library.add(faEnvelope, faLock)


axios.defaults.baseURL = 'http://127.0.0.1:8000'

createApp(App)
    .use(store)
    .use(router, axios)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
