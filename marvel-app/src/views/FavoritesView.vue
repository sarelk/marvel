<template>
  <div class="favorites-view">
    <div class="container py-12 max-w-2xl">
      <!-- Header -->
      <header class="text-center mb-12">
        <h1 class="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
          ⭐ Your Favorite Heroes
        </h1>
        <p class="text-xl text-gray-600">
          Your personal collection of Marvel's finest characters
        </p>
      </header>

      <!-- Favorites Count -->
      <div v-if="hasFavorites" class="card-modern p-6 mb-8 text-center">
        <div class="flex items-center justify-center space-x-4">
          <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ favoritesCount }}</div>
            <div class="text-gray-600">Favorite{{ favoritesCount === 1 ? '' : 's' }}</div>
          </div>
          <button
            @click="handleClearAll"
            class="btn-secondary text-sm px-4 py-2"
            aria-label="Clear all favorites"
          >
            Clear All
          </button>
        </div>
      </div>

      <!-- Favorites List -->
      <section v-if="hasFavorites" class="space-y-8" aria-label="Favorite characters list">
        <CharacterCard
          v-for="character in favoriteCharacters"
          :key="character.id"
          :character="character"
          @click="handleCharacterClick(character.id)"
        />
      </section>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-4">No favorites yet</h3>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          Start building your collection by starring your favorite Marvel characters. 
          Click the star icon on any character card or profile page.
        </p>
        <router-link to="/characters" class="btn-primary inline-block">
          Explore Characters
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useFavoritesStore } from '@/stores/favorites'
import CharacterCard from '@/components/CharacterCard.vue'

const router = useRouter()
const favoritesStore = useFavoritesStore()

const { favoriteCharacters, favoritesCount, hasFavorites } = storeToRefs(favoritesStore)

const handleCharacterClick = (id: number) => {
  router.push({ name: 'character-detail', params: { id: id.toString() } })
}

const handleClearAll = () => {
  if (confirm('Are you sure you want to remove all favorites? This action cannot be undone.')) {
    favoritesStore.clearAllFavorites()
  }
}
</script>

<style scoped>
.container {
  max-width: 1280px;
}
</style> 