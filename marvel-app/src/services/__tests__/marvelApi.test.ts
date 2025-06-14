import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { marvelApi } from '../marvelApi'
import type { MarvelApiResponse, MarvelCharacter } from '../../types/marvel'

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn()
  }
}))

const mockAxios = axios as any

describe('MarvelApiService', () => {
  const mockCharactersResponse: MarvelApiResponse<MarvelCharacter> = {
    code: 200,
    status: 'Ok',
    copyright: '© 2023 MARVEL',
    attributionText: 'Data provided by Marvel. © 2023 MARVEL',
    attributionHTML: '<a href="http://marvel.com">Data provided by Marvel. © 2023 MARVEL</a>',
    etag: 'test-etag',
    data: {
      offset: 0,
      limit: 20,
      total: 100,
      count: 20,
      results: [
        {
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
      ]
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('hasValidApiKeys', () => {
    it('should return true when both public and private keys are provided', () => {
      expect(marvelApi.hasValidApiKeys()).toBe(true)
    })
  })

  describe('getCharacters', () => {
    it('should fetch characters with default parameters', async () => {
      (mockAxios.get as any).mockResolvedValueOnce({ data: mockCharactersResponse })

      const result = await marvelApi.getCharacters()

      expect(mockAxios.get).toHaveBeenCalledWith(
        'https://gateway.marvel.com/v1/public/characters',
        {
          params: expect.objectContaining({
            limit: 20,
            offset: 0,
            ts: expect.any(String),
            apikey: 'test-public-key',
            hash: 'mock-hash'
          })
        }
      )
      expect(result).toEqual(mockCharactersResponse)
    })

    it('should fetch characters with search filters', async () => {
      (mockAxios.get as any).mockResolvedValueOnce({ data: mockCharactersResponse })

      await marvelApi.getCharacters({
        nameStartsWith: 'Spider',
        limit: 10,
        offset: 20,
        orderBy: 'name'
      })

      expect(mockAxios.get).toHaveBeenCalledWith(
        'https://gateway.marvel.com/v1/public/characters',
        {
          params: expect.objectContaining({
            nameStartsWith: 'Spider',
            limit: 10,
            offset: 20,
            orderBy: 'name',
            ts: expect.any(String),
            apikey: 'test-public-key',
            hash: 'mock-hash'
          })
        }
      )
    })

    it('should handle API errors', async () => {
      const error = new Error('API Error')
      ;(mockAxios.get as any).mockRejectedValueOnce(error)

      await expect(marvelApi.getCharacters()).rejects.toThrow('API Error')
    })
  })

  describe('getCharacterById', () => {
    it('should fetch a specific character by ID', async () => {
      const mockResponse = {
        data: {
          ...mockCharactersResponse,
          data: {
            ...mockCharactersResponse.data,
            results: [mockCharactersResponse.data.results[0]]
          }
        }
      }
      
      ;(mockAxios.get as any).mockResolvedValueOnce(mockResponse)

      const result = await marvelApi.getCharacterById(1)

      expect(mockAxios.get).toHaveBeenCalledWith(
        'https://gateway.marvel.com/v1/public/characters/1',
        {
          params: expect.objectContaining({
            ts: expect.any(String),
            apikey: 'test-public-key',
            hash: 'mock-hash'
          })
        }
      )
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('getDemoCharacters', () => {
    it('should return demo data with expected structure', () => {
      const demoData = marvelApi.getDemoCharacters()

      expect(demoData).toMatchObject({
        code: 200,
        status: 'Ok',
        data: {
          offset: 0,
          limit: 20,
          total: expect.any(Number),
          count: expect.any(Number),
          results: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              description: expect.any(String),
              thumbnail: expect.objectContaining({
                path: expect.any(String),
                extension: 'jpg'
              })
            })
          ])
        }
      })
    })

    it('should include expected demo characters', () => {
      const demoData = marvelApi.getDemoCharacters()
      const characterNames = demoData.data.results.map(char => char.name)

      expect(characterNames).toContain('Spider-Man')
      expect(characterNames).toContain('Captain America')
      expect(characterNames).toContain('Iron Man')
    })
  })

  describe('getImageUrl', () => {
    it('should return image URL with default size', () => {
      const thumbnail = { path: 'http://test.com/image', extension: 'jpg' }
      const result = marvelApi.getImageUrl(thumbnail)

      expect(result).toBe('http://test.com/image.jpg')
    })

    it('should return image URL with custom size', () => {
      const thumbnail = { path: 'http://test.com/image', extension: 'jpg' }
      const result = marvelApi.getImageUrl(thumbnail, '/portrait_xlarge')

      expect(result).toBe('http://test.com/image/portrait_xlarge.jpg')
    })

    it('should handle missing size parameter', () => {
      const thumbnail = { path: 'http://test.com/image', extension: 'png' }
      const result = marvelApi.getImageUrl(thumbnail, '')

      expect(result).toBe('http://test.com/image.png')
    })
  })
}) 