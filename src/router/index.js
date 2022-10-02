import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Create from '../views/Create.vue'
import Login from '../views/Login.vue' 

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
