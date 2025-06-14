import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/characters',
      name: 'characters',
      component: () => import('../views/CharactersView.vue'),
    },
    {
      path: '/characters/:id',
      name: 'character-detail',
      component: () => import('../views/CharacterDetailView.vue'),
      props: route => ({ id: Number(route.params.id) })
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoritesView.vue'),
    },
  ],
})

export default router
