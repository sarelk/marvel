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
                @keyup.enter="handleSearchImmediate"
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

          <!-- Filter Controls -->
          <div class="space-y-6">
            <!-- Sort Options -->
            <div>
              <label for="sort-select" class="block text-sm font-medium text-gray-700 mb-2">
                Sort Characters
              </label>
              <select
                id="sort-select"
                v-model="localSortBy"
                @change="handleSortChange"
                class="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-0 transition-colors bg-white"
                aria-label="Sort characters by"
              >
                <option value="name">Alphabetical (A-Z)</option>
                <option value="-name">Alphabetical (Z-A)</option>
                <option value="modified">Oldest Characters First</option>
                <option value="-modified">Newest Characters First</option>
              </select>
            </div>

            <!-- Content Filters -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                🎯 Filter by Character Activity
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <!-- All Characters -->
                <button
                  @click="handleFilterClick('all')"
                  :class="localFilterType === 'all' ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-700 border-gray-200 hover:border-red-300'"
                  class="flex items-center justify-center px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <span class="text-lg mr-2">👥</span>
                  <span class="font-medium">All Heroes</span>
                </button>

                <!-- Comics Filter -->
                <button
                  @click="handleFilterClick('comics')"
                  :class="localFilterType === 'comics' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'"
                  class="flex items-center justify-center px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span class="text-lg mr-2">📚</span>
                  <span class="font-medium">Comic Stars</span>
                </button>

                <!-- Series Filter -->
                <button
                  @click="handleFilterClick('series')"
                  :class="localFilterType === 'series' ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-700 border-gray-200 hover:border-green-300'"
                  class="flex items-center justify-center px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <span class="text-lg mr-2">📺</span>
                  <span class="font-medium">Series Leads</span>
                </button>

                <!-- Events Filter -->
                <button
                  @click="handleFilterClick('events')"
                  :class="localFilterType === 'events' ? 'bg-purple-500 text-white border-purple-500' : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'"
                  class="flex items-center justify-center px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <span class="text-lg mr-2">⚡</span>
                  <span class="font-medium">Event Heroes</span>
                </button>
              </div>
            </div>


          </div>

          <!-- Active Filters Status -->
          <div v-if="searchQuery || filterType !== 'all'" class="flex flex-wrap items-center justify-center gap-3 text-sm">
            <span class="text-gray-600 font-medium">🔍 Active filters:</span>
            <span v-if="searchQuery" class="inline-flex items-center px-3 py-2 rounded-full bg-blue-100 text-blue-800 font-medium">
              🔤 "{{ searchQuery }}"
            </span>
            <span v-if="filterType !== 'all'" class="inline-flex items-center px-3 py-2 rounded-full font-medium"
                  :class="getActiveFilterClass()">
              {{ getActiveFilterLabel() }}
            </span>
            <button
              @click="handleClearAllFilters"
              class="inline-flex items-center px-3 py-2 rounded-full bg-red-100 text-red-800 hover:bg-red-200 transition-colors font-medium"
              aria-label="Clear all filters and show all characters"
            >
              🗑️ Clear All
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
  filterType,
  minCount,
  totalPages,
  currentPage,
  sortBy
} = storeToRefs(marvelStore)

const localSearchQuery = ref('')
const localSortBy = ref('name')
const localFilterType = ref<'all' | 'comics' | 'series' | 'events' | 'stories'>('all')
const localMinCount = ref(0)
let searchTimeout: number | null = null

// Initialize local values
onMounted(async () => {
  localSearchQuery.value = searchQuery.value
  localSortBy.value = sortBy.value
  localFilterType.value = filterType.value
  localMinCount.value = minCount.value
  await marvelStore.init()
})

const handleSearch = () => {
  // Clear existing timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  
  // Debounce search by 300ms
  searchTimeout = setTimeout(() => {
    marvelStore.searchCharacters(localSearchQuery.value)
  }, 300)
}

const handleSearchImmediate = () => {
  // For Enter key press, search immediately
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  marvelStore.searchCharacters(localSearchQuery.value)
}

const handleSortChange = () => {
  marvelStore.changeSortBy(localSortBy.value)
}



const handleClearSearch = () => {
  localSearchQuery.value = ''
  marvelStore.clearSearch()
}

const handleClearAllFilters = () => {
  localSearchQuery.value = ''
  localFilterType.value = 'all'
  localMinCount.value = 0
  marvelStore.clearAllFilters()
}

const handleFilterClick = (type: 'all' | 'comics' | 'series' | 'events' | 'stories') => {
  localFilterType.value = type
  localMinCount.value = 0
  marvelStore.updateContentFilter(localFilterType.value, localMinCount.value)
}



const getActiveFilterClass = () => {
  switch (filterType.value) {
    case 'comics':
      return 'bg-blue-100 text-blue-800'
    case 'series':
      return 'bg-green-100 text-green-800'
    case 'events':
      return 'bg-purple-100 text-purple-800'
    case 'stories':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getActiveFilterLabel = () => {
  switch (filterType.value) {
    case 'comics':
      return `📚 Comic Stars`
    case 'series':
      return `📺 Series Leads`
    case 'events':
      return `⚡ Event Heroes`
    case 'stories':
      return `📖 Story Rich`
    default:
      return ''
  }
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