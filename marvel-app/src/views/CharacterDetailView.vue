<template>
  <div class="character-detail-view">
    <div class="container mx-auto px-4 py-8">
      <!-- Back Button -->
      <button
        @click="goBack"
        class="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to Characters
      </button>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-24">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-24">
        <div class="text-red-500 text-xl mb-4">{{ error }}</div>
        <button
          @click="retry"
          class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Character Details -->
      <div v-else-if="selectedCharacter" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Character Header -->
        <div class="relative">
          <!-- Hero Background -->
          <div class="bg-gradient-to-r from-red-600 to-red-800 h-64 md:h-80">
            <div class="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
          
          <!-- Character Image and Name -->
          <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div class="flex flex-col md:flex-row items-center md:items-end">
              <div class="relative mb-4 md:mb-0 md:mr-8">
                <img
                  :src="getImageUrl(selectedCharacter.thumbnail, 'standard_xlarge')"
                  :alt="selectedCharacter.name"
                  class="w-32 h-32 md:w-48 md:h-48 object-cover object-center rounded-full border-4 border-white shadow-lg"
                  @error="handleImageError"
                />
              </div>
              <div class="text-center md:text-left">
                <h1 class="text-3xl md:text-5xl font-bold text-white mb-2">
                  {{ selectedCharacter.name }}
                </h1>
                <p class="text-red-200 text-lg">
                  Marvel Character
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Character Information -->
        <div class="p-6 md:p-8">
          <!-- Description -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Description</h2>
            <p class="text-gray-600 leading-relaxed text-lg">
              {{ selectedCharacter.description || 'No description available for this character.' }}
            </p>
          </div>

          <!-- Character Stats -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-red-600 mb-2">
                {{ selectedCharacter.comics.available }}
              </div>
              <div class="text-gray-600 font-medium">Comics</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-red-600 mb-2">
                {{ selectedCharacter.series.available }}
              </div>
              <div class="text-gray-600 font-medium">Series</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-red-600 mb-2">
                {{ selectedCharacter.stories.available }}
              </div>
              <div class="text-gray-600 font-medium">Stories</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-red-600 mb-2">
                {{ selectedCharacter.events.available }}
              </div>
              <div class="text-gray-600 font-medium">Events</div>
            </div>
          </div>

          <!-- Featured Comics -->
          <div v-if="selectedCharacter.comics.items.length > 0" class="mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Featured Comics</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="comic in selectedCharacter.comics.items.slice(0, 6)"
                :key="comic.resourceURI"
                class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
              >
                <p class="text-gray-800 font-medium">{{ comic.name }}</p>
              </div>
            </div>
          </div>

          <!-- Featured Series -->
          <div v-if="selectedCharacter.series.items.length > 0" class="mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Featured Series</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="series in selectedCharacter.series.items.slice(0, 6)"
                :key="series.resourceURI"
                class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
              >
                <p class="text-gray-800 font-medium">{{ series.name }}</p>
              </div>
            </div>
          </div>

          <!-- External Links -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Learn More</h2>
            <div class="flex flex-wrap gap-4">
              <!-- Wikipedia Search -->
              <a
                :href="getWikipediaUrl(selectedCharacter.name)"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Wikipedia
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
              
              <!-- Marvel Official -->
              <a
                :href="getMarvelOfficialUrl(selectedCharacter.name)"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Marvel.com
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
              
              <!-- Google Search -->
              <a
                :href="getGoogleSearchUrl(selectedCharacter.name)"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Google Search
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </a>
              
              <!-- Marvel Database (Fandom) -->
              <a
                :href="getMarvelDatabaseUrl(selectedCharacter.name)"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Marvel Database
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </a>
            </div>
          </div>

          <!-- Last Modified -->
          <div class="text-sm text-gray-500 border-t pt-4">
            Last modified: {{ formatDate(selectedCharacter.modified) }}
          </div>
        </div>
      </div>

      <!-- Character Not Found -->
      <div v-else class="text-center py-24">
        <div class="text-gray-500 text-xl mb-4">Character not found</div>
        <p class="text-gray-400 mb-6">The character you're looking for doesn't exist or has been removed.</p>
        <button
          @click="goBack"
          class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMarvelStore } from '@/stores/marvel'

interface Props {
  id: number
}

const props = defineProps<Props>()
const router = useRouter()
const marvelStore = useMarvelStore()

const { selectedCharacter, isLoading, error } = storeToRefs(marvelStore)

const getImageUrl = computed(() => marvelStore.getImageUrl)

onMounted(async () => {
  await marvelStore.fetchCharacterById(props.id)
})

const goBack = () => {
  router.push({ name: 'characters' })
}

const retry = () => {
  marvelStore.fetchCharacterById(props.id)
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/200x200/dc2626/ffffff?text=No+Image'
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// URL generation functions for reliable external links
const getWikipediaUrl = (characterName: string): string => {
  const searchTerm = encodeURIComponent(`${characterName} Marvel Comics`)
  return `https://en.wikipedia.org/wiki/Special:Search?search=${searchTerm}`
}

const getMarvelOfficialUrl = (characterName: string): string => {
  const searchTerm = encodeURIComponent(characterName)
  return `https://www.marvel.com/search?query=${searchTerm}`
}

const getGoogleSearchUrl = (characterName: string): string => {
  const searchTerm = encodeURIComponent(`${characterName} Marvel character`)
  return `https://www.google.com/search?q=${searchTerm}`
}

const getMarvelDatabaseUrl = (characterName: string): string => {
  const searchTerm = encodeURIComponent(characterName)
  return `https://marvel.fandom.com/wiki/Special:Search?query=${searchTerm}`
}
</script>

<style scoped>
.container {
  max-width: 1280px;
}
</style> 