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
        <img
          :src="imageUrl"
          :alt="`Portrait of ${character.name}, Marvel character`"
          class="w-full h-96 object-cover object-center rounded-xl shadow-lg"
          @error="handleImageError"
          loading="lazy"
        />
        <!-- Favorite Star Button -->
        <button
          @click.stop="handleToggleFavorite"
          class="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          :class="isFavorite ? 'bg-yellow-500 text-white shadow-lg hover:bg-yellow-600' : 'bg-white/80 text-gray-600 hover:bg-white hover:text-yellow-500 shadow-md'"
          :aria-label="isFavorite ? `Remove ${character.name} from favorites` : `Add ${character.name} to favorites`"
        >
          <svg class="w-5 h-5" :fill="isFavorite ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
          </svg>
        </button>
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
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { MarvelCharacter } from '@/types/marvel'
import { useMarvelStore } from '@/stores/marvel'
import { useFavoritesStore } from '@/stores/favorites'

interface Props {
  character: MarvelCharacter
}

defineEmits<{
  click: []
}>()

const props = defineProps<Props>()
const marvelStore = useMarvelStore()
const favoritesStore = useFavoritesStore()

const imageError = ref(false)

const imageUrl = computed(() => {
  if (imageError.value) {
    return 'https://via.placeholder.com/600x800/dc2626/ffffff?text=No+Image'
  }
  return marvelStore.getImageUrl(props.character.thumbnail, 'standard_xlarge')
})

const isFavorite = computed(() => {
  return favoritesStore.isFavorite(props.character.id)
})

const handleImageError = () => {
  imageError.value = true
}

const handleToggleFavorite = () => {
  favoritesStore.toggleFavorite(props.character)
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