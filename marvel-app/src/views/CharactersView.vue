<template>
  <div class="characters-view">
    <div class="container py-12 max-w-2xl">
      <!-- Header -->
      <header class="text-center mb-12">
        <h1 class="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
          Marvel Characters
        </h1>
        <p class="text-xl text-gray-600">
          Discover legendary heroes and iconic villains from across the Marvel multiverse
        </p>
      </header>

      <!-- Search and Filters -->
      <section class="card-modern p-6 mb-12" aria-label="Search and filter characters">
        <div class="space-y-4">
          <!-- Search Input -->
          <div class="w-full">
            <label for="character-search" class="sr-only">Search Marvel characters</label>
            <div class="relative">
              <input
                id="character-search"
                v-model="localSearchQuery"
                @input="handleSearch"
                @keyup.enter="handleSearch"
                type="text"
                placeholder="Search for your favorite Marvel character..."
                class="w-full px-6 py-4 pl-14 text-lg border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-0 transition-colors"
                aria-describedby="search-help"
              />
              <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none" aria-hidden="true">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            <div id="search-help" class="sr-only">
              Type to search for Marvel characters by name. Press Enter to search.
            </div>
          </div>

          <!-- Sort and Clear -->
          <div class="flex flex-col sm:flex-row gap-4">
            <label for="sort-select" class="sr-only">Sort characters</label>
            <select
              id="sort-select"
              v-model="localSortBy"
              @change="handleSortChange"
              class="flex-1 px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-0 transition-colors"
              aria-label="Sort characters by"
            >
              <option value="name">Sort A-Z</option>
              <option value="-name">Sort Z-A</option>
              <option value="modified">Oldest First</option>
              <option value="-modified">Newest First</option>
            </select>

            <button
              v-if="searchQuery"
              @click="handleClearSearch"
              class="btn-secondary px-6 py-4 text-lg"
              aria-label="Clear search and show all characters"
            >
              Clear Search
            </button>
          </div>
        </div>
      </section>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-20" role="status" aria-live="polite">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin" aria-hidden="true"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-6 h-6 bg-red-500 rounded-full" aria-hidden="true"></div>
          </div>
        </div>
        <span class="sr-only">Loading Marvel characters...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20" role="alert" aria-live="assertive">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h3>
        <p class="text-gray-600 mb-8">{{ error }}</p>
        <button @click="retry" class="btn-primary" aria-label="Retry loading characters">
          Try Again
        </button>
      </div>

      <!-- Characters List - Single Column -->
      <section v-else class="space-y-8" aria-label="Marvel characters list">
        <CharacterCard
          v-for="character in characters"
          :key="character.id"
          :character="character"
          @click="handleCharacterClick(character.id)"
        />
      </section>

      <!-- Empty State -->
      <div v-if="!isLoading && !error && characters.length === 0" class="text-center py-20">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-4">No characters found</h3>
        <p class="text-gray-600 mb-8">Try adjusting your search or clear filters to see all characters</p>
        <button @click="handleClearSearch" class="btn-primary">
          Show All Characters
        </button>
      </div>

      <!-- Pagination -->
      <nav v-if="totalPages > 1" class="flex justify-center mt-16" aria-label="Character list pagination">
        <div class="flex items-center space-x-4">
          <button
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
            class="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            :aria-label="`Go to page ${currentPage - 1}`"
          >
            Previous
          </button>
          
          <span class="px-6 py-3 text-lg font-medium text-gray-700" aria-current="page">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          
          <button
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
            class="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            :aria-label="`Go to page ${currentPage + 1}`"
          >
            Next
          </button>
        </div>
      </nav>
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

/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style> 