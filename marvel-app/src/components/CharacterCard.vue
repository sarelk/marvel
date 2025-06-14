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
    return 'https://via.placeholder.com/600x800/dc2626/ffffff?text=No+Image'
  }
  return marvelStore.getImageUrl(props.character.thumbnail, 'standard_xlarge')
})

const handleImageError = () => {
  imageError.value = true
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