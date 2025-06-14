import type { MarvelCharacter } from '@/types/marvel'

interface ImageSource {
  url: string
  priority: number
  description: string
}

class ImageService {
  private imageCache = new Map<string, string>()
  private failedUrls = new Set<string>()

  /**
   * Get the best available image URL for a character with multiple fallbacks
   */
  async getCharacterImageUrl(character: MarvelCharacter, size: string = 'standard_xlarge'): Promise<string> {
    const cacheKey = `${character.id}-${size}`
    
    // Return cached result if available
    if (this.imageCache.has(cacheKey)) {
      return this.imageCache.get(cacheKey)!
    }

    const imageSources = this.generateImageSources(character, size)
    
    // Try each image source in priority order
    for (const source of imageSources) {
      if (this.failedUrls.has(source.url)) {
        continue // Skip known failed URLs
      }

      try {
        const isValid = await this.validateImageUrl(source.url)
        if (isValid) {
          this.imageCache.set(cacheKey, source.url)
          return source.url
        } else {
          this.failedUrls.add(source.url)
        }
      } catch (error) {
        this.failedUrls.add(source.url)
        console.warn(`Failed to load image from ${source.description}:`, source.url)
      }
    }

    // If all sources fail, return a high-quality placeholder
    const fallbackUrl = this.generateFallbackImage(character)
    this.imageCache.set(cacheKey, fallbackUrl)
    return fallbackUrl
  }

  /**
   * Generate multiple image sources in priority order
   */
  private generateImageSources(character: MarvelCharacter, size: string): ImageSource[] {
    const sources: ImageSource[] = []

    // 1. Original Marvel API image (highest priority)
    if (character.thumbnail && character.thumbnail.path && character.thumbnail.extension) {
      const marvelUrl = `${character.thumbnail.path}/${size}.${character.thumbnail.extension}`
      sources.push({
        url: marvelUrl,
        priority: 1,
        description: 'Marvel API'
      })

      // Also try different sizes if the requested one fails
      const alternateSizes = ['standard_xlarge', 'standard_large', 'standard_medium', 'portrait_xlarge', 'portrait_incredible']
      alternateSizes.forEach((altSize, index) => {
        if (altSize !== size) {
          sources.push({
            url: `${character.thumbnail.path}/${altSize}.${character.thumbnail.extension}`,
            priority: 2 + index,
            description: `Marvel API (${altSize})`
          })
        }
      })
    }

    // 2. Alternative Marvel CDN URLs (sometimes different CDN works)
    if (character.thumbnail && character.thumbnail.path) {
      const altCdnUrl = character.thumbnail.path.replace('i.annihil.us', 'terrigen-cdn-dev.marvel.com')
      sources.push({
        url: `${altCdnUrl}/${size}.${character.thumbnail.extension}`,
        priority: 10,
        description: 'Marvel Alternative CDN'
      })
    }

    // 3. Character-specific high-quality images from reliable sources
    const characterImages = this.getCharacterSpecificImages(character.name)
    characterImages.forEach((img, index) => {
      sources.push({
        url: img,
        priority: 20 + index,
        description: 'Character-specific image'
      })
    })

    // Sort by priority
    return sources.sort((a, b) => a.priority - b.priority)
  }

  /**
   * Get character-specific high-quality images from reliable sources
   */
  private getCharacterSpecificImages(characterName: string): string[] {
    const name = characterName.toLowerCase()
    const images: string[] = []

    // High-quality character images from reliable sources
    const characterImageMap: Record<string, string[]> = {
      'spider-man': [
        'https://cdn.marvel.com/content/1x/spider-man_lob_crd_01.jpg',
        'https://terrigen-cdn-dev.marvel.com/content/prod/1x/spider-man_lob_crd_01.jpg'
      ],
      'iron man': [
        'https://cdn.marvel.com/content/1x/iron_man_lob_crd_01.jpg',
        'https://terrigen-cdn-dev.marvel.com/content/prod/1x/iron_man_lob_crd_01.jpg'
      ],
      'captain america': [
        'https://cdn.marvel.com/content/1x/captain_america_lob_crd_01.jpg',
        'https://terrigen-cdn-dev.marvel.com/content/prod/1x/captain_america_lob_crd_01.jpg'
      ],
      'thor': [
        'https://cdn.marvel.com/content/1x/thor_lob_crd_01.jpg',
        'https://terrigen-cdn-dev.marvel.com/content/prod/1x/thor_lob_crd_01.jpg'
      ],
      'hulk': [
        'https://cdn.marvel.com/content/1x/hulk_lob_crd_01.jpg',
        'https://terrigen-cdn-dev.marvel.com/content/prod/1x/hulk_lob_crd_01.jpg'
      ],
      'black widow': [
        'https://cdn.marvel.com/content/1x/black_widow_lob_crd_01.jpg',
        'https://terrigen-cdn-dev.marvel.com/content/prod/1x/black_widow_lob_crd_01.jpg'
      ],
      'doctor strange': [
        'https://cdn.marvel.com/content/1x/doctor_strange_lob_crd_01.jpg'
      ],
      'wolverine': [
        'https://cdn.marvel.com/content/1x/wolverine_lob_crd_01.jpg'
      ],
      'deadpool': [
        'https://cdn.marvel.com/content/1x/deadpool_lob_crd_01.jpg'
      ]
    }

    // Try exact match first
    if (characterImageMap[name]) {
      images.push(...characterImageMap[name])
    }

    // Try partial matches
    for (const [key, urls] of Object.entries(characterImageMap)) {
      if (name.includes(key) || key.includes(name)) {
        images.push(...urls)
      }
    }

    return images
  }

  /**
   * Validate if an image URL is accessible and returns a valid image
   */
  private async validateImageUrl(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image()
      const timeout = setTimeout(() => {
        resolve(false)
      }, 5000) // 5 second timeout

      img.onload = () => {
        clearTimeout(timeout)
        // Check if it's not a placeholder or error image
        if (img.width > 50 && img.height > 50) {
          resolve(true)
        } else {
          resolve(false)
        }
      }

      img.onerror = () => {
        clearTimeout(timeout)
        resolve(false)
      }

      img.src = url
    })
  }

  /**
   * Generate a high-quality fallback image
   */
  private generateFallbackImage(character: MarvelCharacter): string {
    const name = encodeURIComponent(character.name)
    const description = character.description ? encodeURIComponent(character.description.substring(0, 100)) : 'Marvel Character'
    
    // Use a more sophisticated placeholder service
    return `https://ui-avatars.com/api/?name=${name}&size=600&background=dc2626&color=ffffff&bold=true&format=png&rounded=false&font-size=0.4`
  }

  /**
   * Preload images for better performance
   */
  async preloadCharacterImages(characters: MarvelCharacter[]): Promise<void> {
    const preloadPromises = characters.map(character => 
      this.getCharacterImageUrl(character, 'standard_medium')
    )
    
    try {
      await Promise.allSettled(preloadPromises)
    } catch (error) {
      console.warn('Some images failed to preload:', error)
    }
  }

  /**
   * Clear cache (useful for memory management)
   */
  clearCache(): void {
    this.imageCache.clear()
    this.failedUrls.clear()
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { cached: number; failed: number } {
    return {
      cached: this.imageCache.size,
      failed: this.failedUrls.size
    }
  }
}

export const imageService = new ImageService() 