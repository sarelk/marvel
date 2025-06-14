import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { MarvelCharacter, SearchFilters } from '@/types/marvel'
import { marvelApi } from '@/services/marvelApi'

export const useMarvelStore = defineStore('marvel', () => {
  // State
  const characters = ref<MarvelCharacter[]>([])
  const selectedCharacter = ref<MarvelCharacter | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')
  const totalResults = ref(0)
  const currentPage = ref(1)
  const itemsPerPage = ref(20)
  const sortBy = ref('name')
  
  // Automatically detect if we should use demo data based on environment variables
  const useDemoData = ref(
    import.meta.env.VITE_USE_DEMO_DATA !== 'false' || !marvelApi.hasValidApiKeys()
  )

  // Computed
  const totalPages = computed(() => Math.ceil(totalResults.value / itemsPerPage.value))
  const hasMore = computed(() => currentPage.value < totalPages.value)

  // Actions
  const fetchCharacters = async (filters: SearchFilters = {}) => {
    isLoading.value = true
    error.value = null

    try {
      let response
      
      if (useDemoData.value) {
        // Use demo data when API keys are not configured
        response = marvelApi.getDemoCharacters()
        // Simulate filtering for demo data
        if (filters.nameStartsWith) {
          response.data.results = response.data.results.filter(char =>
            char.name.toLowerCase().startsWith(filters.nameStartsWith!.toLowerCase())
          )
          response.data.count = response.data.results.length
          response.data.total = response.data.results.length
        }
      } else {
        // Use real API
        response = await marvelApi.getCharacters({
          ...filters,
          limit: itemsPerPage.value,
          offset: (currentPage.value - 1) * itemsPerPage.value,
          orderBy: sortBy.value
        })
      }

      characters.value = response.data.results
      totalResults.value = response.data.total
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error fetching characters:', err)
    } finally {
      isLoading.value = false
    }
  }

  const fetchCharacterById = async (id: number) => {
    isLoading.value = true
    error.value = null

    try {
      let character: MarvelCharacter | undefined

      if (useDemoData.value) {
        // Find character in demo data
        const demoData = marvelApi.getDemoCharacters()
        character = demoData.data.results.find(char => char.id === id)
      } else {
        // Use real API
        const response = await marvelApi.getCharacterById(id)
        character = response.data.results[0]
      }

      if (character) {
        selectedCharacter.value = character
      } else {
        error.value = 'Character not found'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error fetching character:', err)
    } finally {
      isLoading.value = false
    }
  }

  const searchCharacters = async (query: string) => {
    searchQuery.value = query
    currentPage.value = 1
    
    const filters: SearchFilters = {}
    if (query.trim()) {
      filters.nameStartsWith = query.trim()
    }
    
    await fetchCharacters(filters)
  }

  const changePage = async (page: number) => {
    currentPage.value = page
    const filters: SearchFilters = {}
    if (searchQuery.value.trim()) {
      filters.nameStartsWith = searchQuery.value.trim()
    }
    await fetchCharacters(filters)
  }

  const changeSortBy = async (sort: string) => {
    sortBy.value = sort
    currentPage.value = 1
    const filters: SearchFilters = {}
    if (searchQuery.value.trim()) {
      filters.nameStartsWith = searchQuery.value.trim()
    }
    await fetchCharacters(filters)
  }

  const clearSearch = async () => {
    searchQuery.value = ''
    currentPage.value = 1
    await fetchCharacters()
  }

  const clearSelectedCharacter = () => {
    selectedCharacter.value = null
  }

  const getImageUrl = (thumbnail: { path: string; extension: string }, size?: string) => {
    return marvelApi.getImageUrl(thumbnail, size)
  }

  // Initialize with demo data
  const init = async () => {
    await fetchCharacters()
  }

  return {
    // State
    characters,
    selectedCharacter,
    isLoading,
    error,
    searchQuery,
    totalResults,
    currentPage,
    itemsPerPage,
    sortBy,
    useDemoData,
    // Computed
    totalPages,
    hasMore,
    // Actions
    fetchCharacters,
    fetchCharacterById,
    searchCharacters,
    changePage,
    changeSortBy,
    clearSearch,
    clearSelectedCharacter,
    getImageUrl,
    init
  }
}) 