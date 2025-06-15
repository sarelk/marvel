<template>
  <article 
    class="character-card card-modern p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    @click="$emit('click')"
    @keydown.enter="$emit('click')"
    @keydown.space.prevent="$emit('click')"
    tabindex="0"
    role="button"
    :aria-label="`View details for ${character.name}`"
  >
    <!-- Character Image - Full Width -->
    <div class="w-full mb-6 flex justify-center">
      <div class="relative w-full max-w-sm">
        <!-- Loading Skeleton -->
        <div v-if="imageLoading" class="w-full h-96 bg-gray-200 rounded-xl shadow-lg animate-pulse flex items-center justify-center">
          <div class="text-gray-400">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
        
        <!-- Character Image -->
        <img
          v-else
          :src="imageUrl"
          :alt="`Portrait of ${character.name}, Marvel character`"
          class="w-full h-96 object-cover object-center rounded-xl shadow-lg transition-opacity duration-300"
          @error="handleImageError"
          loading="lazy"
        />
        <!-- Action Buttons -->
        <div class="absolute top-4 right-4 flex flex-wrap gap-2 justify-end">
          <!-- Facebook Share Button -->
          <div class="relative group">
            <button
              @click.stop="handleFacebookShare"
              class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center transition-all duration-200 hover:bg-blue-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              :aria-label="`Share ${character.name} on Facebook`"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <!-- Tooltip -->
            <div class="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              Share on Facebook
              <div class="absolute top-full right-2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
            </div>
          </div>

          <!-- X (Twitter) Share Button -->
          <div class="relative group">
            <button
              @click.stop="handleXShare"
              class="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center transition-all duration-200 hover:bg-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              :aria-label="`Share ${character.name} on X`"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>
            <!-- Tooltip -->
            <div class="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              Share on X
              <div class="absolute top-full right-2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
            </div>
          </div>

          <!-- WhatsApp Share Button -->
          <div class="relative group">
            <button
              @click.stop="handleWhatsAppShare"
              class="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center transition-all duration-200 hover:bg-green-600 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              :aria-label="`Share ${character.name} on WhatsApp`"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
            </button>
            <!-- Tooltip -->
            <div class="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              Share on WhatsApp
              <div class="absolute top-full right-2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
            </div>
          </div>
          
          <!-- Favorite Star Button -->
          <div class="relative group">
            <button
              @click.stop="handleToggleFavorite"
              class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              :class="isFavorite ? 'bg-yellow-500 text-white shadow-lg hover:bg-yellow-600' : 'bg-white/80 text-gray-600 hover:bg-white hover:text-yellow-500 shadow-md'"
              :aria-label="isFavorite ? `Remove ${character.name} from favorites` : `Add ${character.name} to favorites`"
            >
              <svg class="w-5 h-5" :fill="isFavorite ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            </button>
            <!-- Tooltip -->
            <div class="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              {{ isFavorite ? 'Remove from favorites' : 'Add to favorites' }}
              <div class="absolute top-full right-2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Character Info - Single Column -->
    <div class="space-y-4">
      <!-- Character Name -->
      <h3 class="text-2xl font-bold text-gray-900">
        {{ character.name }}
      </h3>

      <!-- Description -->
      <p class="text-gray-600 leading-relaxed">
        {{ character.description || 'Discover the incredible story and powers of this legendary Marvel character.' }}
      </p>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 gap-4 py-4" role="group" aria-label="Character statistics">
        <div class="text-center bg-gray-50 rounded-lg p-4">
          <div class="text-2xl font-bold text-red-600 mb-1" aria-label="Number of comics">
            {{ character.comics.available }}
          </div>
          <div class="text-sm text-gray-500 font-medium">
            Comics
          </div>
        </div>
        <div class="text-center bg-gray-50 rounded-lg p-4">
          <div class="text-2xl font-bold text-red-600 mb-1" aria-label="Number of series">
            {{ character.series.available }}
          </div>
          <div class="text-sm text-gray-500 font-medium">
            Series
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
        <span>{{ character.stories.available }} stories • {{ character.events.available }} events</span>
        <div class="flex items-center space-x-1 text-red-600 font-medium">
          <span>View Details</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import type { MarvelCharacter } from '@/types/marvel'
import { useMarvelStore } from '@/stores/marvel'
import { useFavoritesStore } from '@/stores/favorites'
import { imageService } from '@/services/imageService'

interface Props {
  character: MarvelCharacter
}

defineEmits<{
  click: []
}>()

const props = defineProps<Props>()
const marvelStore = useMarvelStore()
const favoritesStore = useFavoritesStore()

const imageUrl = ref<string>('')
const imageLoading = ref(true)

const isFavorite = computed(() => {
  return favoritesStore.isFavorite(props.character.id)
})

// Load the best available image
onMounted(async () => {
  try {
    imageUrl.value = await imageService.getCharacterImageUrl(props.character, 'standard_xlarge')
  } catch (error) {
    // Log errors only in development
    if (import.meta.env.DEV) {
      console.warn('Failed to load character image:', error)
    }
    imageUrl.value = `https://ui-avatars.com/api/?name=${encodeURIComponent(props.character.name)}&size=600&background=dc2626&color=ffffff&bold=true&format=png&rounded=false&font-size=0.4`
  } finally {
    imageLoading.value = false
  }
})

const handleImageError = async () => {
  // If the current image fails, try to get a fallback
  try {
    const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(props.character.name)}&size=600&background=dc2626&color=ffffff&bold=true&format=png&rounded=false&font-size=0.4`
    imageUrl.value = fallbackUrl
  } catch (error) {
    // Log errors only in development
    if (import.meta.env.DEV) {
      console.warn('Failed to load fallback image:', error)
    }
  }
}

const handleToggleFavorite = () => {
  favoritesStore.toggleFavorite(props.character)
}

const handleWhatsAppShare = () => {
  const characterUrl = `${window.location.origin}/character/${props.character.id}`
  const message = `Check out this amazing Marvel character: ${props.character.name}! ${characterUrl}`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}

const handleFacebookShare = () => {
  const characterUrl = `${window.location.origin}/character/${props.character.id}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(characterUrl)}`
  window.open(facebookUrl, '_blank', 'width=600,height=400')
}

const handleXShare = () => {
  const characterUrl = `${window.location.origin}/character/${props.character.id}`
  const message = `Check out this amazing Marvel character: ${props.character.name}! ${characterUrl}`
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`
  window.open(xUrl, '_blank', 'width=600,height=400')
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 