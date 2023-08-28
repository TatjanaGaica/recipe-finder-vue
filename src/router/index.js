import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ResultsPage from '../views/ResultsPage.vue'
import DetailsPage from '../views/DetailsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/results/:ingredients',
      props: true,
      name: 'results',
      component: ResultsPage
    },
    {
      path: '/details/:id',
      props: true,
      name: 'details',
      component: DetailsPage
    }
  ]
})

export default router
