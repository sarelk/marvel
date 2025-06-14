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
                <!-- Loading Skeleton -->
                <div v-if="imageLoading" class="w-32 h-32 md:w-48 md:h-48 bg-gray-300 rounded-full border-4 border-white shadow-lg animate-pulse flex items-center justify-center">
                  <div class="text-gray-500">
                    <svg class="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                </div>
                
                <!-- Character Image -->
                <img
                  v-else
                  :src="characterImageUrl"
                  :alt="selectedCharacter.name"
                  class="w-32 h-32 md:w-48 md:h-48 object-cover object-center rounded-full border-4 border-white shadow-lg transition-opacity duration-300"
                  @error="handleImageError"
                />
              </div>
              <div class="text-center md:text-left flex-1">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 class="text-3xl md:text-5xl font-bold text-white mb-2">
                      {{ selectedCharacter.name }}
                    </h1>
                    <p class="text-red-200 text-lg">
                      Marvel Character
                    </p>
                  </div>
                  <!-- Action Buttons -->
                  <div class="mt-4 md:mt-0 flex flex-wrap gap-3 justify-center md:justify-end">
                    <!-- Facebook Share Button -->
                    <div class="relative group">
                      <button
                        @click="handleFacebookShare"
                        class="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center transition-all duration-200 hover:bg-blue-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600"
                        :aria-label="`Share ${selectedCharacter.name} on Facebook`"
                      >
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </button>
                      <!-- Tooltip -->
                      <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        Share on Facebook
                        <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>

                    <!-- X (Twitter) Share Button -->
                    <div class="relative group">
                      <button
                        @click="handleXShare"
                        class="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center transition-all duration-200 hover:bg-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600"
                        :aria-label="`Share ${selectedCharacter.name} on X`"
                      >
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </button>
                      <!-- Tooltip -->
                      <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        Share on X
                        <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>

                    <!-- WhatsApp Share Button -->
                    <div class="relative group">
                      <button
                        @click="handleWhatsAppShare"
                        class="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center transition-all duration-200 hover:bg-green-600 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600"
                        :aria-label="`Share ${selectedCharacter.name} on WhatsApp`"
                      >
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                      </button>
                      <!-- Tooltip -->
                      <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        Share on WhatsApp
                        <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                    
                    <!-- Favorite Star Button -->
                    <div class="relative group">
                      <button
                        @click="handleToggleFavorite"
                        class="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600"
                        :class="isFavorite ? 'bg-yellow-500 text-white shadow-lg hover:bg-yellow-600' : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'"
                        :aria-label="isFavorite ? `Remove ${selectedCharacter.name} from favorites` : `Add ${selectedCharacter.name} to favorites`"
                      >
                        <svg class="w-6 h-6" :fill="isFavorite ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                        </svg>
                      </button>
                      <!-- Tooltip -->
                      <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        {{ isFavorite ? 'Remove from favorites' : 'Add to favorites' }}
                        <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </div>
                </div>
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
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMarvelStore } from '@/stores/marvel'
import { useFavoritesStore } from '@/stores/favorites'
import { imageService } from '@/services/imageService'

interface Props {
  id: number
}

const props = defineProps<Props>()
const router = useRouter()
const marvelStore = useMarvelStore()
const favoritesStore = useFavoritesStore()

const { selectedCharacter, isLoading, error } = storeToRefs(marvelStore)

const characterImageUrl = ref<string>('')
const imageLoading = ref(true)

const isFavorite = computed(() => {
  return selectedCharacter.value ? favoritesStore.isFavorite(selectedCharacter.value.id) : false
})

onMounted(async () => {
  await marvelStore.fetchCharacterById(props.id)
  
  // Load the best available image once character is loaded
  if (selectedCharacter.value) {
    await loadCharacterImage()
  }
})

// Watch for character changes and reload image
const loadCharacterImage = async () => {
  if (!selectedCharacter.value) return
  
  imageLoading.value = true
  try {
    characterImageUrl.value = await imageService.getCharacterImageUrl(selectedCharacter.value, 'standard_xlarge')
  } catch (error) {
    console.warn('Failed to load character image:', error)
    characterImageUrl.value = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedCharacter.value.name)}&size=600&background=dc2626&color=ffffff&bold=true&format=png&rounded=false&font-size=0.4`
  } finally {
    imageLoading.value = false
  }
}

const goBack = () => {
  router.push({ name: 'characters' })
}

const retry = () => {
  marvelStore.fetchCharacterById(props.id)
}

const handleImageError = async () => {
  // If the current image fails, try to get a fallback
  if (selectedCharacter.value) {
    try {
      const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedCharacter.value.name)}&size=600&background=dc2626&color=ffffff&bold=true&format=png&rounded=false&font-size=0.4`
      characterImageUrl.value = fallbackUrl
    } catch (error) {
      console.warn('Failed to load fallback image:', error)
    }
  }
}

const handleToggleFavorite = () => {
  if (selectedCharacter.value) {
    favoritesStore.toggleFavorite(selectedCharacter.value)
  }
}

const handleWhatsAppShare = () => {
  if (selectedCharacter.value) {
    const characterUrl = `${window.location.origin}/character/${selectedCharacter.value.id}`
    const message = `Check out this amazing Marvel character: ${selectedCharacter.value.name}! ${characterUrl}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }
}

const handleFacebookShare = () => {
  if (selectedCharacter.value) {
    const characterUrl = `${window.location.origin}/character/${selectedCharacter.value.id}`
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(characterUrl)}`
    window.open(facebookUrl, '_blank', 'width=600,height=400')
  }
}

const handleXShare = () => {
  if (selectedCharacter.value) {
    const characterUrl = `${window.location.origin}/character/${selectedCharacter.value.id}`
    const message = `Check out this amazing Marvel character: ${selectedCharacter.value.name}! ${characterUrl}`
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`
    window.open(xUrl, '_blank', 'width=600,height=400')
  }
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