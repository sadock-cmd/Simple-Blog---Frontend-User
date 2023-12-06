import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { blogStore } from './stores/blogStore'
import { authStore } from './stores/authStore'

import App from './App.vue'
import router from './router'
import './axios'

const app = createApp(App)

const initializeApp = async () => {
  // Create and use Pinia
  app.use(createPinia())
  app.use(router)

  const auth = authStore()
  // Check authentication on app initialization
  auth.checkAuthentication()

  const blogger = blogStore()
  // Fetch necessary data before mounting the app
  await blogger.getCategories()
  await blogger.getPosts()
  app.mount('#app')
}

initializeApp()
