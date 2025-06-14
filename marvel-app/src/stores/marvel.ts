import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { MarvelCharacter, SearchFilters, FilterOptions } from '@/types/marvel'
import { marvelApi } from '@/services/marvelApi'
import { imageService } from '@/services/imageService'

export const useMarvelStore = defineStore('marvel', () => {
  // State
  const characters = ref<MarvelCharacter[]>([])
  const selectedCharacter = ref<MarvelCharacter | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')
  const filterType = ref<'all' | 'comics' | 'series' | 'events' | 'stories'>('all')
  const minCount = ref(0)
  const totalResults = ref(0)
  const currentPage = ref(1)
  const itemsPerPage = ref(20)
  const sortBy = ref('name')
  
  // Automatically detect if we should use demo data based on environment variables
  const useDemoData = ref(
    import.meta.env.VITE_USE_DEMO_DATA === 'false' || !marvelApi.hasValidApiKeys()
  )

  // Debug logging
  console.log('Environment check:', {
    VITE_USE_DEMO_DATA: import.meta.env.VITE_USE_DEMO_DATA,
    hasValidApiKeys: marvelApi.hasValidApiKeys(),
    useDemoData: useDemoData.value,
    publicKeyExists: !!import.meta.env.MARVEL_PUBLIC_KEY,
    privateKeyExists: !!import.meta.env.MARVEL_PRIVATE_KEY
  })

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
        let filteredResults = response.data.results
        
        // Apply search filter
        if (filters.nameStartsWith) {
          const searchTerm = filters.nameStartsWith.toLowerCase()
          filteredResults = filteredResults.filter(char =>
            char.name.toLowerCase().includes(searchTerm) ||
            char.description.toLowerCase().includes(searchTerm)
          )
        }
        
        // Apply content type filters
        if (filters.comics && filters.comics > 0) {
          filteredResults = filteredResults.filter(char => char.comics.available >= filters.comics!)
        }
        if (filters.series && filters.series > 0) {
          filteredResults = filteredResults.filter(char => char.series.available >= filters.series!)
        }
        if (filters.events && filters.events > 0) {
          filteredResults = filteredResults.filter(char => char.events.available >= filters.events!)
        }
        if (filters.stories && filters.stories > 0) {
          filteredResults = filteredResults.filter(char => char.stories.available >= filters.stories!)
        }
        
        response.data.results = filteredResults
        response.data.count = filteredResults.length
        response.data.total = filteredResults.length
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
      
      // Preload images for better user experience
      if (response.data.results.length > 0) {
        imageService.preloadCharacterImages(response.data.results).catch(err => {
          console.warn('Failed to preload some images:', err)
        })
      }
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
    await applyFilters()
  }

  const applyFilters = async () => {
    const filters: SearchFilters = {}
    
    // Apply search query
    if (searchQuery.value.trim()) {
      filters.nameStartsWith = searchQuery.value.trim()
    }
    
    // Apply content type filters
    if (filterType.value !== 'all' && minCount.value > 0) {
      switch (filterType.value) {
        case 'comics':
          filters.comics = minCount.value
          break
        case 'series':
          filters.series = minCount.value
          break
        case 'events':
          filters.events = minCount.value
          break
        case 'stories':
          filters.stories = minCount.value
          break
      }
    }
    
    await fetchCharacters(filters)
  }

  const updateContentFilter = async (type: 'all' | 'comics' | 'series' | 'events' | 'stories', count: number = 0) => {
    filterType.value = type
    minCount.value = count
    currentPage.value = 1
    await applyFilters()
  }

  const changePage = async (page: number) => {
    currentPage.value = page
    await applyFilters()
  }

  const changeSortBy = async (sort: string) => {
    sortBy.value = sort
    currentPage.value = 1
    await applyFilters()
  }

  const clearSearch = async () => {
    searchQuery.value = ''
    currentPage.value = 1
    await applyFilters()
  }

  const clearAllFilters = async () => {
    searchQuery.value = ''
    filterType.value = 'all'
    minCount.value = 0
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
    filterType,
    minCount,
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
    applyFilters,
    updateContentFilter,
    changePage,
    changeSortBy,
    clearSearch,
    clearAllFilters,
    clearSelectedCharacter,
    getImageUrl,
    init
  }
}) 