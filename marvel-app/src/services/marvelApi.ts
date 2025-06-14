import axios from 'axios'
import CryptoJS from 'crypto-js'
import type { MarvelApiResponse, MarvelCharacter, SearchFilters } from '@/types/marvel'

class MarvelApiService {
  private readonly baseURL = 'https://gateway.marvel.com/v1/public'
  private readonly publicKey = import.meta.env.MARVEL_PUBLIC_KEY || ''
  private readonly privateKey = import.meta.env.MARVEL_PRIVATE_KEY || ''

  private generateAuthParams() {
    const timestamp = Date.now().toString()
    const hash = CryptoJS.MD5(timestamp + this.privateKey + this.publicKey).toString()
    
    return {
      ts: timestamp,
      apikey: this.publicKey,
      hash: hash
    }
  }

  async getCharacters(filters: SearchFilters = {}): Promise<MarvelApiResponse<MarvelCharacter>> {
    try {
      const authParams = this.generateAuthParams()
      const params = {
        ...authParams,
        limit: filters.limit || 20,
        offset: filters.offset || 0,
        ...(filters.nameStartsWith && { nameStartsWith: filters.nameStartsWith }),
        ...(filters.name && { name: filters.name }),
        ...(filters.orderBy && { orderBy: filters.orderBy })
      }

      const response = await axios.get(`${this.baseURL}/characters`, { params })
      return response.data
    } catch (error) {
      console.error('Error fetching characters:', error)
      throw error
    }
  }

  async getCharacterById(id: number): Promise<MarvelApiResponse<MarvelCharacter>> {
    try {
      const authParams = this.generateAuthParams()
      const response = await axios.get(`${this.baseURL}/characters/${id}`, {
        params: authParams
      })
      return response.data
    } catch (error) {
      console.error('Error fetching character:', error)
      throw error
    }
  }

  getImageUrl(thumbnail: { path: string; extension: string }, size: string = 'standard_medium'): string {
    return `${thumbnail.path}/${size}.${thumbnail.extension}`
  }

  // Check if API keys are configured
  hasValidApiKeys(): boolean {
    return !!(this.publicKey && this.privateKey)
  }

  // Demo data for when API keys are not configured
  getDemoCharacters(): MarvelApiResponse<MarvelCharacter> {
    return {
      code: 200,
      status: 'Ok',
      copyright: '© 2023 MARVEL',
      attributionText: 'Data provided by Marvel. © 2023 MARVEL',
      attributionHTML: '<a href="http://marvel.com">Data provided by Marvel. © 2023 MARVEL</a>',
      etag: 'demo',
      data: {
        offset: 0,
        limit: 20,
        total: 6,
        count: 6,
        results: [
          {
            id: 1009610,
            name: 'Spider-Man',
            description: 'Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider. Adopting the name Spider-Man, Peter hoped to start a career using his new abilities. Taught that with great power comes great responsibility, Spidey has vowed to use his powers to help people.',
            modified: '2016-09-28T12:18:41-0400',
            thumbnail: {
              path: 'https://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b',
              extension: 'jpg'
            },
            resourceURI: 'http://gateway.marvel.com/v1/public/characters/1009610',
            comics: { available: 0, collectionURI: '', items: [], returned: 0 },
            series: { available: 0, collectionURI: '', items: [], returned: 0 },
            stories: { available: 0, collectionURI: '', items: [], returned: 0 },
            events: { available: 0, collectionURI: '', items: [], returned: 0 },
            urls: []
          },
          {
            id: 1009220,
            name: 'Captain America',
            description: 'Vowing to serve his country any way he could, young Steve Rogers took the super soldier serum to become America\'s one-man army. Fighting for the red, white and blue for over 60 years, Captain America is the living, breathing symbol of freedom and liberty.',
            modified: '2016-09-28T12:18:41-0400',
            thumbnail: {
              path: 'https://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087',
              extension: 'jpg'
            },
            resourceURI: 'http://gateway.marvel.com/v1/public/characters/1009220',
            comics: { available: 0, collectionURI: '', items: [], returned: 0 },
            series: { available: 0, collectionURI: '', items: [], returned: 0 },
            stories: { available: 0, collectionURI: '', items: [], returned: 0 },
            events: { available: 0, collectionURI: '', items: [], returned: 0 },
            urls: []
          },
          {
            id: 1009368,
            name: 'Iron Man',
            description: 'Wounded, captured and forced to build a weapon by his enemies, billionaire industrialist Tony Stark instead created an advanced suit of armor to save his life and escape captivity. Now with a new outlook on life, Tony uses his money and intelligence to make the world a safer, better place as Iron Man.',
            modified: '2016-09-28T12:18:41-0400',
            thumbnail: {
              path: 'https://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55',
              extension: 'jpg'
            },
            resourceURI: 'http://gateway.marvel.com/v1/public/characters/1009368',
            comics: { available: 0, collectionURI: '', items: [], returned: 0 },
            series: { available: 0, collectionURI: '', items: [], returned: 0 },
            stories: { available: 0, collectionURI: '', items: [], returned: 0 },
            events: { available: 0, collectionURI: '', items: [], returned: 0 },
            urls: []
          },
          {
            id: 1009664,
            name: 'Thor',
            description: 'As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he\'s quite smart and compassionate.',
            modified: '2016-09-28T12:18:41-0400',
            thumbnail: {
              path: 'https://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350',
              extension: 'jpg'
            },
            resourceURI: 'http://gateway.marvel.com/v1/public/characters/1009664',
            comics: { available: 85, collectionURI: '', items: [], returned: 0 },
            series: { available: 42, collectionURI: '', items: [], returned: 0 },
            stories: { available: 120, collectionURI: '', items: [], returned: 0 },
            events: { available: 15, collectionURI: '', items: [], returned: 0 },
            urls: []
          },
          {
            id: 1009351,
            name: 'Hulk',
            description: 'Caught in a gamma bomb explosion while trying to save the life of a teenager, Dr. Bruce Banner was transformed into the incredibly powerful creature called the Hulk. An all too often misunderstood hero, the angrier the Hulk gets, the stronger the Hulk gets.',
            modified: '2016-09-28T12:18:41-0400',
            thumbnail: {
              path: 'https://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0',
              extension: 'jpg'
            },
            resourceURI: 'http://gateway.marvel.com/v1/public/characters/1009351',
            comics: { available: 95, collectionURI: '', items: [], returned: 0 },
            series: { available: 38, collectionURI: '', items: [], returned: 0 },
            stories: { available: 110, collectionURI: '', items: [], returned: 0 },
            events: { available: 12, collectionURI: '', items: [], returned: 0 },
            urls: []
          },
          {
            id: 1009189,
            name: 'Black Widow',
            description: 'Despite super spy Natasha Romanoff\'s checkered past, she\'s become one of S.H.I.E.L.D.\'s most deadly assassins and a frequent member of the Avengers.',
            modified: '2016-09-28T12:18:41-0400',
            thumbnail: {
              path: 'https://i.annihil.us/u/prod/marvel/i/mg/f/30/50fecad1f395b',
              extension: 'jpg'
            },
            resourceURI: 'http://gateway.marvel.com/v1/public/characters/1009189',
            comics: { available: 67, collectionURI: '', items: [], returned: 0 },
            series: { available: 28, collectionURI: '', items: [], returned: 0 },
            stories: { available: 89, collectionURI: '', items: [], returned: 0 },
            events: { available: 8, collectionURI: '', items: [], returned: 0 },
            urls: []
          }
        ]
      }
    }
  }
}

export const marvelApi = new MarvelApiService() 