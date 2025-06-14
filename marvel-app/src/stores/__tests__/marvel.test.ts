import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMarvelStore } from '../marvel'
import { marvelApi } from '../../services/marvelApi'
import type { MarvelCharacter } from '../../types/marvel'

// Mock the Marvel API
vi.mock('../../services/marvelApi', () => ({
  marvelApi: {
    hasValidApiKeys: vi.fn(() => true),
    getCharacters: vi.fn(),
    getCharacterById: vi.fn(),
    getDemoCharacters: vi.fn(),
    getImageUrl: vi.fn((thumbnail, size) => `${thumbnail.path}${size || ''}.${thumbnail.extension}`)
  }
}))

// Mock the image service
vi.mock('../../services/imageService', () => ({
  imageService: {
    preloadCharacterImages: vi.fn(() => Promise.resolve())
  }
}))

const mockCharacter: MarvelCharacter = {
  id: 1,
  name: 'Test Character',
  description: 'A test character',
  modified: '2023-01-01T00:00:00-0400',
  thumbnail: {
    path: 'http://test.com/image',
    extension: 'jpg'
  },
  resourceURI: 'http://test.com/character/1',
  comics: { available: 10, collectionURI: '', items: [], returned: 0 },
  series: { available: 5, collectionURI: '', items: [], returned: 0 },
  stories: { available: 15, collectionURI: '', items: [], returned: 0 },
  events: { available: 3, collectionURI: '', items: [], returned: 0 },
  urls: []
}

const mockApiResponse = {
  data: {
    results: [mockCharacter],
    total: 1,
    count: 1,
    offset: 0,
    limit: 20
  }
}

describe('Marvel Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('Initial State', () => {
    it('should initialize with correct default state', () => {
      const store = useMarvelStore()

      expect(store.characters).toEqual([])
      expect(store.selectedCharacter).toBeNull()
      expect(store.isLoading).toBe(false)
      expect(store.error).toBeNull()
      expect(store.searchQuery).toBe('')
      expect(store.filterType).toBe('all')
      expect(store.minCount).toBe(0)
      expect(store.totalResults).toBe(0)
      expect(store.currentPage).toBe(1)
      expect(store.itemsPerPage).toBe(20)
      expect(store.sortBy).toBe('name')
    })

    it('should determine demo data usage correctly', () => {
      const store = useMarvelStore()
      
      // With valid API keys and VITE_USE_DEMO_DATA=false, should not use demo data
      expect(store.useDemoData).toBe(false)
    })
  })

  describe('Computed Properties', () => {
    it('should calculate total pages correctly', () => {
      const store = useMarvelStore()
      store.totalResults = 50
      store.itemsPerPage = 20

      expect(store.totalPages).toBe(3)
    })

    it('should determine if there are more pages', () => {
      const store = useMarvelStore()
      store.totalResults = 50
      store.itemsPerPage = 20
      store.currentPage = 2

      expect(store.hasMore).toBe(true)

      store.currentPage = 3
      expect(store.hasMore).toBe(false)
    })
  })

  describe('fetchCharacters', () => {
    it('should fetch characters successfully', async () => {
      const store = useMarvelStore()
      vi.mocked(marvelApi.getCharacters).mockResolvedValueOnce(mockApiResponse)

      await store.fetchCharacters()

      expect(store.isLoading).toBe(false)
      expect(store.characters).toEqual([mockCharacter])
      expect(store.totalResults).toBe(1)
      expect(store.error).toBeNull()
    })

    it('should handle API errors', async () => {
      const store = useMarvelStore()
      const error = new Error('API Error')
      vi.mocked(marvelApi.getCharacters).mockRejectedValueOnce(error)

      await store.fetchCharacters()

      expect(store.isLoading).toBe(false)
      expect(store.error).toBe('API Error')
      expect(store.characters).toEqual([])
    })

    it('should use demo data when configured', async () => {
      const store = useMarvelStore()
      store.useDemoData = true
      
      const demoResponse = {
        data: {
          results: [mockCharacter],
          total: 1,
          count: 1
        }
      }
      vi.mocked(marvelApi.getDemoCharacters).mockReturnValueOnce(demoResponse)

      await store.fetchCharacters()

      expect(marvelApi.getDemoCharacters).toHaveBeenCalled()
      expect(store.characters).toEqual([mockCharacter])
    })

    it('should apply search filters with demo data', async () => {
      const store = useMarvelStore()
      store.useDemoData = true
      
      const spiderCharacter = { ...mockCharacter, name: 'Spider-Man' }
      const ironCharacter = { ...mockCharacter, id: 2, name: 'Iron Man' }
      
      const demoResponse = {
        data: {
          results: [spiderCharacter, ironCharacter],
          total: 2,
          count: 2
        }
      }
      vi.mocked(marvelApi.getDemoCharacters).mockReturnValueOnce(demoResponse)

      await store.fetchCharacters({ nameStartsWith: 'Spider' })

      expect(store.characters).toHaveLength(1)
      expect(store.characters[0].name).toBe('Spider-Man')
    })
  })

  describe('fetchCharacterById', () => {
    it('should fetch character by ID successfully', async () => {
      const store = useMarvelStore()
      vi.mocked(marvelApi.getCharacterById).mockResolvedValueOnce({
        data: { results: [mockCharacter] }
      })

      await store.fetchCharacterById(1)

      expect(store.selectedCharacter).toEqual(mockCharacter)
      expect(store.error).toBeNull()
    })

    it('should handle character not found', async () => {
      const store = useMarvelStore()
      vi.mocked(marvelApi.getCharacterById).mockResolvedValueOnce({
        data: { results: [] }
      })

      await store.fetchCharacterById(999)

      expect(store.selectedCharacter).toBeNull()
      expect(store.error).toBe('Character not found')
    })
  })

  describe('Search and Filtering', () => {
    it('should search characters', async () => {
      const store = useMarvelStore()
      vi.mocked(marvelApi.getCharacters).mockResolvedValueOnce(mockApiResponse)

      await store.searchCharacters('Spider')

      expect(store.searchQuery).toBe('Spider')
      expect(store.currentPage).toBe(1)
      expect(marvelApi.getCharacters).toHaveBeenCalledWith(
        expect.objectContaining({
          nameStartsWith: 'Spider'
        })
      )
    })

    it('should update content filter', async () => {
      const store = useMarvelStore()
      vi.mocked(marvelApi.getCharacters).mockResolvedValueOnce(mockApiResponse)

      await store.updateContentFilter('comics', 5)

      expect(store.filterType).toBe('comics')
      expect(store.minCount).toBe(5)
      expect(store.currentPage).toBe(1)
      expect(marvelApi.getCharacters).toHaveBeenCalledWith(
        expect.objectContaining({
          comics: 5
        })
      )
    })

    it('should change page', async () => {
      const store = useMarvelStore()
      vi.mocked(marvelApi.getCharacters).mockResolvedValueOnce(mockApiResponse)

      await store.changePage(2)

      expect(store.currentPage).toBe(2)
      expect(marvelApi.getCharacters).toHaveBeenCalled()
    })

    it('should clear search', async () => {
      const store = useMarvelStore()
      store.searchQuery = 'Spider'
      vi.mocked(marvelApi.getCharacters).mockResolvedValueOnce(mockApiResponse)

      await store.clearSearch()

      expect(store.searchQuery).toBe('')
      expect(store.currentPage).toBe(1)
    })

    it('should clear all filters', async () => {
      const store = useMarvelStore()
      store.searchQuery = 'Spider'
      store.filterType = 'comics'
      store.minCount = 5
      store.currentPage = 2
      vi.mocked(marvelApi.getCharacters).mockResolvedValueOnce(mockApiResponse)

      await store.clearAllFilters()

      expect(store.searchQuery).toBe('')
      expect(store.filterType).toBe('all')
      expect(store.minCount).toBe(0)
      expect(store.currentPage).toBe(1)
    })
  })

  describe('Utility Functions', () => {
    it('should clear selected character', () => {
      const store = useMarvelStore()
      store.selectedCharacter = mockCharacter

      store.clearSelectedCharacter()

      expect(store.selectedCharacter).toBeNull()
    })

    it('should get image URL', () => {
      const store = useMarvelStore()
      const thumbnail = { path: 'http://test.com/image', extension: 'jpg' }

      const result = store.getImageUrl(thumbnail, '/large')

      expect(result).toBe('http://test.com/image/large.jpg')
    })
  })
}) 