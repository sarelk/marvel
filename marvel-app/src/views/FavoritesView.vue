<template>
  <div class="favorites-view bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 min-h-screen">
    <!-- Enhanced Hero Section -->
    <section class="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 text-white py-16 lg:py-20">
      <div class="container">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl lg:text-7xl font-black mb-6 leading-tight">
            ⭐ Your Favorite
            <span class="block bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              Marvel Heroes
            </span>
          </h1>
          <p class="text-xl lg:text-2xl text-yellow-100 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
            Your personal collection of Marvel's finest characters. 
            Every hero that captured your heart lives here!
          </p>
          
          <!-- Quick Stats in Hero -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all">
              <div class="text-4xl mb-3">⭐</div>
              <div class="text-3xl font-bold">{{ favoritesCount }}</div>
              <div class="text-yellow-200 text-sm">Favorite{{ favoritesCount === 1 ? '' : 's' }}</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all">
              <div class="text-4xl mb-3">🦸‍♂️</div>
              <div class="text-3xl font-bold">{{ hasFavorites ? '100%' : '0%' }}</div>
              <div class="text-yellow-200 text-sm">Awesome</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all">
              <div class="text-4xl mb-3">💫</div>
              <div class="text-3xl font-bold">{{ hasFavorites ? 'Epic' : 'Ready' }}</div>
              <div class="text-yellow-200 text-sm">Collection</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container py-12">
      <!-- Enhanced Favorites Management Section -->
      <section v-if="hasFavorites" class="relative -mt-20 mb-12">
        <div class="card-modern p-8 shadow-2xl border-0 bg-white">
          <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
            <!-- Collection Info -->
            <div class="flex items-center gap-6">
              <div class="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span class="text-3xl">🏆</span>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">
                  Amazing Collection!
                </h2>
                <p class="text-gray-600 text-lg">
                  You've starred <span class="font-semibold text-orange-600">{{ favoritesCount }}</span> incredible Marvel character{{ favoritesCount === 1 ? '' : 's' }}
                </p>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-4">
              <router-link 
                to="/characters" 
                class="btn-secondary flex items-center gap-2 px-6 py-3"
              >
                <span class="text-xl">🔍</span>
                Find More Heroes
              </router-link>
              <button
                @click="handleClearAll"
                class="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all transform hover:scale-105 flex items-center gap-2 shadow-md"
                aria-label="Clear all favorites"
              >
                <span class="text-xl">🗑️</span>
                Clear Collection
              </button>
            </div>
          </div>

          <!-- Collection Progress -->
          <div class="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-semibold text-gray-700">Collection Progress</span>
              <span class="text-sm text-gray-600">{{ Math.min(favoritesCount, 50) }}/50 heroes</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div 
                class="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                :style="{ width: `${Math.min((favoritesCount / 50) * 100, 100)}%` }"
              ></div>
            </div>
            <p class="text-xs text-gray-500 mt-2">
              {{ favoritesCount >= 50 ? '🎉 Master Collector!' : `${50 - favoritesCount} more to become a Master Collector!` }}
            </p>
          </div>
        </div>
      </section>

      <!-- Enhanced Favorites Grid -->
      <section v-if="hasFavorites" class="grid gap-8 lg:gap-12" aria-label="Favorite characters list">
        <div 
          v-for="(character, index) in favoriteCharacters" 
          :key="character.id"
          class="transform hover:scale-[1.02] transition-all duration-300"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <CharacterCard
            :character="character"
            @click="handleCharacterClick(character.id)"
            class="animate-fade-in-up"
          />
        </div>
      </section>

      <!-- Enhanced Empty State -->
      <div v-else class="text-center py-20">
        <div class="relative mb-12">
          <!-- Floating Stars Animation -->
          <div class="absolute -top-4 -left-4 text-4xl animate-bounce" style="animation-delay: 0s;">⭐</div>
          <div class="absolute -top-8 right-8 text-3xl animate-bounce" style="animation-delay: 0.5s;">✨</div>
          <div class="absolute bottom-0 left-12 text-2xl animate-bounce" style="animation-delay: 1s;">💫</div>
          
          <div class="w-32 h-32 bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
            <span class="text-6xl">🌟</span>
          </div>
        </div>

        <h3 class="text-4xl font-bold text-gray-900 mb-6">Start Your Hero Collection!</h3>
        <p class="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Your favorites collection is waiting to be filled with amazing Marvel characters. 
          Discover heroes, villains, and legends that inspire you!
        </p>

        <!-- Action Cards -->
        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <div class="card-modern p-8 text-center hover:shadow-xl transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span class="text-3xl">🔍</span>
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-4">Explore Characters</h4>
            <p class="text-gray-600 mb-6">
              Browse through 1,500+ Marvel characters and discover your new favorites
            </p>
            <router-link to="/characters" class="btn-primary">
              <span class="flex items-center gap-2">
                🚀 Start Exploring
              </span>
            </router-link>
          </div>

          <div class="card-modern p-8 text-center hover:shadow-xl transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span class="text-3xl">💡</span>
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-4">How to Add Favorites</h4>
            <p class="text-gray-600 mb-6">
              Click the star icon ⭐ on any character card or profile page to add them here
            </p>
            <button class="btn-secondary" disabled>
              <span class="flex items-center gap-2">
                ⭐ Star Characters
              </span>
            </button>
          </div>
        </div>

        <!-- Popular Characters Suggestion -->
        <div class="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
          <h4 class="text-2xl font-bold mb-6">🔥 Popular Heroes to Start With</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div v-for="hero in popularHeroes" :key="hero.name" 
                 class="text-center group cursor-pointer"
                 @click="router.push('/characters')">
              <div class="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-lg">
                {{ hero.emoji }}
              </div>
              <div class="text-sm font-medium group-hover:text-yellow-300 transition-colors">
                {{ hero.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Clear All Confirmation Modal -->
    <div v-if="showClearModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <!-- Background overlay -->
        <div 
          class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" 
          aria-hidden="true"
          @click="showClearModal = false"
        ></div>

        <!-- Modal panel -->
        <div class="relative inline-block align-middle bg-white rounded-2xl px-8 pt-8 pb-6 text-left overflow-hidden shadow-2xl transform transition-all max-w-lg w-full">
          <!-- Warning Icon -->
          <div class="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
            <span class="text-4xl">⚠️</span>
          </div>

          <!-- Content -->
          <div class="text-center">
            <h3 class="text-2xl font-bold text-gray-900 mb-4" id="modal-title">
              Clear Your Entire Collection?
            </h3>
            <p class="text-lg text-gray-600 mb-2">
              You're about to remove all <span class="font-bold text-red-600">{{ favoritesCount }}</span> favorite character{{ favoritesCount === 1 ? '' : 's' }} from your collection.
            </p>
            <p class="text-gray-500 mb-8">
              This action cannot be undone and you'll lose your entire collection permanently.
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              type="button" 
              class="px-8 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all transform hover:scale-105 shadow-lg"
              @click="confirmClearAll"
            >
              <span class="flex items-center gap-2">
                🗑️ Yes, Clear All
              </span>
            </button>
            <button 
              type="button" 
              class="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all"
              @click="showClearModal = false"
              ref="cancelButton"
            >
              <span class="flex items-center gap-2">
                ❌ Cancel
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useFavoritesStore } from '@/stores/favorites'
import CharacterCard from '@/components/CharacterCard.vue'

const router = useRouter()
const favoritesStore = useFavoritesStore()

const { favoriteCharacters, favoritesCount, hasFavorites } = storeToRefs(favoritesStore)

const showClearModal = ref(false)

// Popular heroes for empty state suggestions
const popularHeroes = ref([
  { name: 'Spider-Man', emoji: '🕷️' },
  { name: 'Iron Man', emoji: '🤖' },
  { name: 'Captain America', emoji: '🛡️' },
  { name: 'Thor', emoji: '⚡' },
  { name: 'Hulk', emoji: '💚' },
  { name: 'Black Widow', emoji: '🕸️' }
])

const handleCharacterClick = (id: number) => {
  router.push({ name: 'character-detail', params: { id: id.toString() } })
}

const handleClearAll = () => {
  showClearModal.value = true
}

const confirmClearAll = () => {
  favoritesStore.clearAllFavorites()
  showClearModal.value = false
}
</script>

<style scoped>
.container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

/* Enhanced animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

/* Custom gradient text support */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* Backdrop blur support */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style> 