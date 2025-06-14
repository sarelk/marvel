import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { imageService } from '../imageService'
import type { MarvelCharacter } from '../../types/marvel'

// Mock Image constructor
const mockImage = {
  src: '',
  width: 100,
  height: 100,
  onload: null as (() => void) | null,
  onerror: null as (() => void) | null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn()
}

// Global Image mock
global.Image = vi.fn(() => mockImage) as any

describe('ImageService', () => {
  const mockCharacters: MarvelCharacter[] = [
    {
      id: 1,
      name: 'Test Character 1',
      description: 'Description 1',
      modified: '2023-01-01T00:00:00-0400',
      thumbnail: {
        path: 'http://test.com/image1',
        extension: 'jpg'
      },
      resourceURI: 'http://test.com/character/1',
      comics: { available: 10, collectionURI: '', items: [], returned: 0 },
      series: { available: 5, collectionURI: '', items: [], returned: 0 },
      stories: { available: 15, collectionURI: '', items: [], returned: 0 },
      events: { available: 3, collectionURI: '', items: [], returned: 0 },
      urls: []
    },
    {
      id: 2,
      name: 'Spider-Man',
      description: 'Description 2',
      modified: '2023-01-01T00:00:00-0400',
      thumbnail: {
        path: 'http://test.com/image2',
        extension: 'png'
      },
      resourceURI: 'http://test.com/character/2',
      comics: { available: 8, collectionURI: '', items: [], returned: 0 },
      series: { available: 3, collectionURI: '', items: [], returned: 0 },
      stories: { available: 12, collectionURI: '', items: [], returned: 0 },
      events: { available: 1, collectionURI: '', items: [], returned: 0 },
      urls: []
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    imageService.clearCache()
    // Reset the mock image for each test
    mockImage.src = ''
    mockImage.onload = null
    mockImage.onerror = null
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getCharacterImageUrl', () => {
    it('should return image URL for character with valid thumbnail', async () => {
      // Mock successful image loading
      vi.mocked(global.Image).mockImplementation(() => {
        const img = { ...mockImage }
        setTimeout(() => {
          if (img.onload) img.onload()
        }, 10)
        return img as any
      })

      const result = await imageService.getCharacterImageUrl(mockCharacters[0])

      expect(result).toContain('http://test.com/image1')
      expect(global.Image).toHaveBeenCalled()
    })

    it('should return fallback image when all sources fail', async () => {
      // Mock image loading failure
      vi.mocked(global.Image).mockImplementation(() => {
        const img = { ...mockImage }
        setTimeout(() => {
          if (img.onerror) img.onerror()
        }, 10)
        return img as any
      })

      const result = await imageService.getCharacterImageUrl(mockCharacters[0])

      expect(result).toContain('ui-avatars.com')
      expect(result).toContain('Test%20Character%201')
    })

    it('should cache successful results', async () => {
      // Mock successful image loading
      vi.mocked(global.Image).mockImplementation(() => {
        const img = { ...mockImage }
        setTimeout(() => {
          if (img.onload) img.onload()
        }, 10)
        return img as any
      })

      const result1 = await imageService.getCharacterImageUrl(mockCharacters[0])
      const result2 = await imageService.getCharacterImageUrl(mockCharacters[0])

      expect(result1).toBe(result2)
      // Should use cached result on second call
    })

    it('should handle Spider-Man with character-specific images', async () => {
      // Mock image loading failure for API, success for character-specific
      let callCount = 0
      vi.mocked(global.Image).mockImplementation(() => {
        const img = { ...mockImage }
        callCount++
        setTimeout(() => {
          // Fail first few calls (API images), succeed on character-specific image
          if (callCount > 5 && img.onload) {
            img.onload()
          } else if (img.onerror) {
            img.onerror()
          }
        }, 10)
        return img as any
      })

      const result = await imageService.getCharacterImageUrl(mockCharacters[1]) // Spider-Man

      expect(result).toBeDefined()
    })
  })

  describe('preloadCharacterImages', () => {
    it('should preload images for all characters', async () => {
      // Mock successful image loading
      vi.mocked(global.Image).mockImplementation(() => {
        const img = { ...mockImage }
        setTimeout(() => {
          if (img.onload) img.onload()
        }, 10)
        return img as any
      })

      await imageService.preloadCharacterImages(mockCharacters)

      expect(global.Image).toHaveBeenCalled()
    })

    it('should handle empty character array', async () => {
      await imageService.preloadCharacterImages([])

      expect(global.Image).not.toHaveBeenCalled()
    })

    it('should handle preloading failures gracefully', async () => {
      // Mock image loading failure
      vi.mocked(global.Image).mockImplementation(() => {
        const img = { ...mockImage }
        setTimeout(() => {
          if (img.onerror) img.onerror()
        }, 10)
        return img as any
      })

      // Should not throw
      await expect(imageService.preloadCharacterImages(mockCharacters)).resolves.toBeUndefined()
    })
  })

  describe('Cache Management', () => {
    it('should clear cache', () => {
      imageService.clearCache()
      
      const stats = imageService.getCacheStats()
      expect(stats.cached).toBe(0)
      expect(stats.failed).toBe(0)
    })

    it('should provide cache statistics', () => {
      const stats = imageService.getCacheStats()
      
      expect(stats).toHaveProperty('cached')
      expect(stats).toHaveProperty('failed')
      expect(typeof stats.cached).toBe('number')
      expect(typeof stats.failed).toBe('number')
    })
  })
}) 