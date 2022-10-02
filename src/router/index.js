import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import HomeView from '../views/HomeView.vue'
import Create from '../views/Create.vue'
import Login from '../views/Login.vue'
import Cards from '../views/cards/Cards.vue'
import CardDetails from '../views/cards/CardDetails.vue'
import CardCreate from '../views/cards/CardCreate.vue'
import CardEdit from '../views/cards/CardEdit.vue'
import Training from '../views/Training.vue'

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
  {
    path: '/training',
    name: 'Training',
    component: Training
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Cards,
    meta: {
      protected: true
    }
  },
  {
    path: '/cards/create',
    name: 'CardCreate',
    component: CardCreate,
    meta: {
      protected: true
    }
  },
  {
    path: '/cards/:id',
    name: 'CardDetails',
    component: CardDetails,
    meta: {
      protected: true
    }
  },
  {
    path: '/cards/:id/edit',
    name: 'CardEdit',
    component: CardEdit,
    meta: {
      protected: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.protected) && !store.state.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
