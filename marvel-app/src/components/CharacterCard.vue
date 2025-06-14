<template>
  <div 
    class="character-card bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    @click="$emit('click')"
  >
    <!-- Character Image -->
    <div class="relative overflow-hidden rounded-t-lg">
      <img
        :src="imageUrl"
        :alt="character.name"
        class="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
        @error="handleImageError"
      />
      <!-- Overlay for better text readability -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      
      <!-- Character Name Overlay -->
      <div class="absolute bottom-0 left-0 right-0 p-4">
        <h3 class="text-white font-bold text-lg mb-1 truncate">
          {{ character.name }}
        </h3>
      </div>
    </div>

    <!-- Character Info -->
    <div class="p-4">
      <!-- Description -->
      <p class="text-gray-600 text-sm mb-4 line-clamp-3">
        {{ character.description || 'No description available for this character.' }}
      </p>

      <!-- Stats -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="text-center">
          <div class="text-lg font-bold text-red-600">
            {{ character.comics.available }}
          </div>
          <div class="text-xs text-gray-500 uppercase tracking-wide">
            Comics
          </div>
        </div>
        <div class="text-center">
          <div class="text-lg font-bold text-red-600">
            {{ character.series.available }}
          </div>
          <div class="text-xs text-gray-500 uppercase tracking-wide">
            Series
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div class="flex justify-center">
        <button class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
          View Details
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { MarvelCharacter } from '@/types/marvel'
import { useMarvelStore } from '@/stores/marvel'

interface Props {
  character: MarvelCharacter
}

defineEmits<{
  click: []
}>()

const props = defineProps<Props>()
const marvelStore = useMarvelStore()

const imageError = ref(false)

const imageUrl = computed(() => {
  if (imageError.value) {
    return 'https://via.placeholder.com/300x400/dc2626/ffffff?text=No+Image'
  }
  return marvelStore.getImageUrl(props.character.thumbnail, 'standard_large')
})

const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.character-card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style> 