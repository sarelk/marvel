<template>
  <div class="characters-view bg-gradient-to-br from-gray-50 to-white min-h-screen">
    <!-- Enhanced Hero Section -->
    <section class="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-16 lg:py-20">
      <div class="container">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl lg:text-7xl font-black mb-6 leading-tight">
            🦸‍♂️ Explore
            <span class="block bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              Marvel Heroes
            </span>
          </h1>
          <p class="text-xl lg:text-2xl text-red-100 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
            Discover legendary heroes and iconic villains from across the Marvel multiverse. 
            Your next favorite character awaits!
          </p>
          
          <!-- Quick Stats in Hero -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all">
              <div class="text-3xl mb-2">🦸‍♂️</div>
              <div class="text-2xl font-bold">1,500+</div>
              <div class="text-red-200 text-sm">Characters</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all">
              <div class="text-3xl mb-2">📚</div>
              <div class="text-2xl font-bold">40K+</div>
              <div class="text-red-200 text-sm">Comics</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all">
              <div class="text-3xl mb-2">📺</div>
              <div class="text-2xl font-bold">300+</div>
              <div class="text-red-200 text-sm">Series</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all">
              <div class="text-3xl mb-2">⏰</div>
              <div class="text-2xl font-bold">80+</div>
              <div class="text-red-200 text-sm">Years</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container py-12">
      <!-- Enhanced Search and Filters Section -->
      <section class="relative -mt-20 mb-12" aria-label="Search and filter characters">
        <div class="card-modern p-8 shadow-2xl border-0 bg-white">
          <!-- Search Input - Enhanced -->
          <div class="mb-8">
            <label for="character-search" class="block text-lg font-semibold text-gray-900 mb-4">
              🔍 Find Your Hero
            </label>
            <div class="relative">
              <input
                id="character-search"
                v-model="localSearchQuery"
                @input="handleSearch"
                @keyup.enter="handleSearchImmediate"
                type="text"
                placeholder="Search Spider-Man, Iron Man, Captain America..."
                class="w-full px-8 py-5 pl-16 text-lg border-3 border-gray-200 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 bg-gray-50 hover:bg-white"
                aria-describedby="search-help"
              />
              <div class="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none" aria-hidden="true">
                <svg class="h-7 w-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <!-- Clear button -->
              <button 
                v-if="localSearchQuery"
                @click="handleClearSearch"
                class="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Clear search"
              >
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div id="search-help" class="mt-2 text-sm text-gray-500">
              💡 Tip: Try searching for character names, powers, or storylines
            </div>
          </div>

          <!-- Enhanced Filter Controls -->
          <div class="grid lg:grid-cols-2 gap-8">
            <!-- Sort Options - Enhanced -->
            <div>
              <label for="sort-select" class="block text-lg font-semibold text-gray-900 mb-4">
                🔄 Sort Characters
              </label>
              <select
                id="sort-select"
                v-model="localSortBy"
                @change="handleSortChange"
                class="w-full px-6 py-4 text-base border-3 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all bg-gray-50 hover:bg-white"
                aria-label="Sort characters by"
              >
                <option value="name">📝 Alphabetical (A-Z)</option>
                <option value="-name">📝 Alphabetical (Z-A)</option>
                <option value="modified">⏰ Oldest Characters First</option>
                <option value="-modified">⚡ Newest Characters First</option>
              </select>
            </div>

            <!-- Content Filters - Enhanced -->
            <div>
              <label class="block text-lg font-semibold text-gray-900 mb-4">
                🎯 Filter by Specialty
              </label>
              <div class="grid grid-cols-2 gap-3">
                <!-- All Characters -->
                <button
                  @click="handleFilterClick('all')"
                  :class="[
                    'group flex items-center justify-center px-4 py-3 border-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 transform hover:scale-105',
                    localFilterType === 'all' 
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-500 shadow-lg' 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-red-300 hover:shadow-md'
                  ]"
                >
                  <span class="text-xl mr-2 group-hover:scale-110 transition-transform">👥</span>
                  <span class="font-semibold">All Heroes</span>
                </button>

                <!-- Comics Filter -->
                <button
                  @click="handleFilterClick('comics')"
                  :class="[
                    'group flex items-center justify-center px-4 py-3 border-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 transform hover:scale-105',
                    localFilterType === 'comics' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500 shadow-lg' 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md'
                  ]"
                >
                  <span class="text-xl mr-2 group-hover:scale-110 transition-transform">📚</span>
                  <span class="font-semibold">Comic Stars</span>
                </button>

                <!-- Series Filter -->
                <button
                  @click="handleFilterClick('series')"
                  :class="[
                    'group flex items-center justify-center px-4 py-3 border-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 transform hover:scale-105',
                    localFilterType === 'series' 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-500 shadow-lg' 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-green-300 hover:shadow-md'
                  ]"
                >
                  <span class="text-xl mr-2 group-hover:scale-110 transition-transform">📺</span>
                  <span class="font-semibold">Series Leads</span>
                </button>

                <!-- Events Filter -->
                <button
                  @click="handleFilterClick('events')"
                  :class="[
                    'group flex items-center justify-center px-4 py-3 border-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 transform hover:scale-105',
                    localFilterType === 'events' 
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-purple-500 shadow-lg' 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:shadow-md'
                  ]"
                >
                  <span class="text-xl mr-2 group-hover:scale-110 transition-transform">⚡</span>
                  <span class="font-semibold">Event Heroes</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Active Filters Status - Enhanced -->
          <div v-if="searchQuery || filterType !== 'all'" class="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <div class="flex flex-wrap items-center justify-center gap-3">
              <span class="text-gray-700 font-semibold flex items-center gap-2">
                <span class="text-xl">🔍</span>
                Active filters:
              </span>
              <span v-if="searchQuery" class="inline-flex items-center px-4 py-2 rounded-full bg-blue-500 text-white font-medium shadow-md">
                🔤 "{{ searchQuery }}"
              </span>
              <span v-if="filterType !== 'all'" class="inline-flex items-center px-4 py-2 rounded-full font-medium shadow-md"
                    :class="getActiveFilterClass()">
                {{ getActiveFilterLabel() }}
              </span>
              <button
                @click="handleClearAllFilters"
                class="inline-flex items-center px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all transform hover:scale-105 font-medium shadow-md"
                aria-label="Clear all filters and show all characters"
              >
                🗑️ Clear All
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Results Summary -->
      <div v-if="!isLoading && !error" class="mb-8 text-center">
        <div class="inline-flex items-center gap-3 bg-white rounded-xl px-6 py-3 shadow-md border border-gray-200">
          <span class="text-2xl">🎯</span>
          <span class="text-lg font-semibold text-gray-900">
            Found {{ characters.length }} amazing characters
          </span>
          <span v-if="totalPages > 1" class="text-gray-500">
            (Page {{ currentPage }} of {{ totalPages }})
          </span>
        </div>
      </div>

      <!-- Enhanced Loading State -->
      <div v-if="isLoading" class="flex flex-col justify-center items-center py-20" role="status" aria-live="polite">
        <div class="relative mb-6">
          <div class="w-20 h-20 border-4 border-red-200 border-t-red-600 rounded-full animate-spin" aria-hidden="true"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-2xl animate-pulse">🦸‍♂️</div>
          </div>
        </div>
        <div class="text-xl font-semibold text-gray-900 mb-2">Assembling your heroes...</div>
        <div class="text-gray-600">Marvel characters are loading</div>
        <span class="sr-only">Loading Marvel characters...</span>
      </div>

      <!-- Enhanced Error State -->
      <div v-else-if="error" class="text-center py-20" role="alert" aria-live="assertive">
        <div class="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6" aria-hidden="true">
          <span class="text-3xl">😞</span>
        </div>
        <h3 class="text-3xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h3>
        <p class="text-xl text-gray-600 mb-8 max-w-md mx-auto">{{ error }}</p>
        <button @click="retry" class="btn-primary text-lg px-8 py-4" aria-label="Retry loading characters">
          <span class="flex items-center gap-3">
            🔄 Try Again
          </span>
        </button>
      </div>

      <!-- Enhanced Characters Grid -->
      <section v-else-if="characters.length > 0" class="grid gap-8 lg:gap-12" aria-label="Marvel characters list">
        <CharacterCard
          v-for="character in characters"
          :key="character.id"
          :character="character"
          @click="handleCharacterClick(character.id)"
          class="transform hover:scale-[1.02] transition-all duration-300"
        />
      </section>

      <!-- Enhanced Empty State -->
      <div v-else-if="!isLoading && !error && characters.length === 0" class="text-center py-20">
        <div class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <span class="text-4xl">🔍</span>
        </div>
        <h3 class="text-3xl font-bold text-gray-900 mb-4">No heroes found</h3>
        <p class="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Your search didn't match any characters. Try different keywords or clear your filters.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="handleClearSearch" class="btn-primary">
            <span class="flex items-center gap-2">
              🔄 Show All Characters
            </span>
          </button>
          <button @click="handleClearAllFilters" class="btn-secondary">
            <span class="flex items-center gap-2">
              🗑️ Clear Filters
            </span>
          </button>
        </div>
      </div>

      <!-- Enhanced Pagination -->
      <nav v-if="totalPages > 1" class="flex justify-center mt-16" aria-label="Character list pagination">
        <div class="flex items-center bg-white rounded-2xl shadow-lg border border-gray-200 p-2">
          <button
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
            class="px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            :class="currentPage === 1 ? 'text-gray-400' : 'text-red-600 hover:bg-red-50'"
            :aria-label="`Go to page ${currentPage - 1}`"
          >
            <span class="flex items-center gap-2">
              ← Previous
            </span>
          </button>
          
          <div class="px-8 py-3 text-lg font-bold text-gray-900 flex items-center gap-2" aria-current="page">
            <span class="text-xl">📄</span>
            Page {{ currentPage }} of {{ totalPages }}
          </div>
          
          <button
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
            class="px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            :class="currentPage === totalPages ? 'text-gray-400' : 'text-red-600 hover:bg-red-50'"
            :aria-label="`Go to page ${currentPage + 1}`"
          >
            <span class="flex items-center gap-2">
              Next →
            </span>
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
let searchTimeout: ReturnType<typeof setTimeout> | null = null

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
      return 'bg-blue-500 text-white'
    case 'series':
      return 'bg-green-500 text-white'
    case 'events':
      return 'bg-purple-500 text-white'
    case 'stories':
      return 'bg-orange-500 text-white'
    default:
      return 'bg-gray-500 text-white'
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

/* Custom gradient text support */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* Enhanced border support */
.border-3 {
  border-width: 3px;
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