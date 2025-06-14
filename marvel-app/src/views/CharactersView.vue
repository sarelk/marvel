<template>
  <div class="characters-view">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Marvel Characters</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Discover and explore your favorite Marvel superheroes and villains
        </p>
      </div>

      <!-- Search and Filters -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex flex-col md:flex-row gap-4 items-center">
          <!-- Search Input -->
          <div class="flex-1 w-full">
            <div class="relative">
              <input
                v-model="localSearchQuery"
                @input="handleSearch"
                @keyup.enter="handleSearch"
                type="text"
                placeholder="Search characters by name..."
                class="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Sort Dropdown -->
          <div class="w-full md:w-auto">
            <select
              v-model="localSortBy"
              @change="handleSortChange"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="-name">Sort by Name (Z-A)</option>
              <option value="modified">Sort by Last Modified</option>
              <option value="-modified">Sort by Last Modified (Newest)</option>
            </select>
          </div>

          <!-- Clear Button -->
          <button
            v-if="searchQuery"
            @click="handleClearSearch"
            class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-500 text-lg mb-4">{{ error }}</div>
        <button
          @click="retry"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Characters Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <CharacterCard
          v-for="character in characters"
          :key="character.id"
          :character="character"
          @click="handleCharacterClick(character.id)"
        />
      </div>

      <!-- Empty State -->
      <div v-if="!isLoading && !error && characters.length === 0" class="text-center py-12">
        <div class="text-gray-500 text-lg mb-4">No characters found</div>
        <p class="text-gray-400">Try adjusting your search criteria</p>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center mt-8">
        <div class="flex space-x-2">
          <button
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
            class="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          
          <span class="px-4 py-2 text-gray-700">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          
          <button
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
            class="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMarvelStore } from '@/stores/marvel'
import CharacterCard from '@/components/CharacterCard.vue'

const router = useRouter()
const marvelStore = useMarvelStore()

const {
  characters,
  isLoading,
  error,
  searchQuery,
  totalPages,
  currentPage,
  sortBy
} = storeToRefs(marvelStore)

const localSearchQuery = ref('')
const localSortBy = ref('name')

// Initialize local values
onMounted(async () => {
  localSearchQuery.value = searchQuery.value
  localSortBy.value = sortBy.value
  await marvelStore.init()
})

const handleSearch = () => {
  marvelStore.searchCharacters(localSearchQuery.value)
}

const handleSortChange = () => {
  marvelStore.changeSortBy(localSortBy.value)
}

const handleClearSearch = () => {
  localSearchQuery.value = ''
  marvelStore.clearSearch()
}

const handleCharacterClick = (id: number) => {
  router.push({ name: 'character-detail', params: { id: id.toString() } })
}

const changePage = (page: number) => {
  marvelStore.changePage(page)
}

const retry = () => {
  marvelStore.fetchCharacters()
}
</script>

<style scoped>
.container {
  max-width: 1280px;
}
</style> 