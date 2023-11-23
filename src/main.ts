import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Quasar } from 'quasar'
import { quasarOptions } from './quasar-options'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(Quasar, quasarOptions)
app.use(router)

app.mount('#app')
