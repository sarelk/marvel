import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { MarvelCharacter } from '@/types/marvel'

export const useFavoritesStore = defineStore('favorites', () => {
  // State
  const favoriteIds = ref<Set<number>>(new Set())
  const favoriteCharacters = ref<MarvelCharacter[]>([])

  // Computed
  const favoritesCount = computed(() => favoriteIds.value.size)
  const hasFavorites = computed(() => favoritesCount.value > 0)

  // Actions
  const loadFavorites = () => {
    try {
      const stored = localStorage.getItem('marvel-favorites')
      if (stored) {
        const data = JSON.parse(stored)
        favoriteIds.value = new Set(data.ids || [])
        favoriteCharacters.value = data.characters || []
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error)
      favoriteIds.value = new Set()
      favoriteCharacters.value = []
    }
  }

  const saveFavorites = () => {
    try {
      const data = {
        ids: Array.from(favoriteIds.value),
        characters: favoriteCharacters.value
      }
      localStorage.setItem('marvel-favorites', JSON.stringify(data))
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error)
    }
  }

  const addFavorite = (character: MarvelCharacter) => {
    if (!favoriteIds.value.has(character.id)) {
      favoriteIds.value.add(character.id)
      favoriteCharacters.value.push(character)
      saveFavorites()
    }
  }

  const removeFavorite = (characterId: number) => {
    if (favoriteIds.value.has(characterId)) {
      favoriteIds.value.delete(characterId)
      favoriteCharacters.value = favoriteCharacters.value.filter(
        char => char.id !== characterId
      )
      saveFavorites()
    }
  }

  const toggleFavorite = (character: MarvelCharacter) => {
    if (isFavorite(character.id)) {
      removeFavorite(character.id)
    } else {
      addFavorite(character)
    }
  }

  const isFavorite = (characterId: number): boolean => {
    return favoriteIds.value.has(characterId)
  }

  const clearAllFavorites = () => {
    favoriteIds.value.clear()
    favoriteCharacters.value = []
    saveFavorites()
  }

  // Initialize favorites on store creation
  loadFavorites()

  return {
    // State
    favoriteIds,
    favoriteCharacters,
    // Computed
    favoritesCount,
    hasFavorites,
    // Actions
    loadFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearAllFavorites
  }
}) 