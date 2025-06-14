export interface MarvelCharacter {
  id: number
  name: string
  description: string
  modified: string
  thumbnail: {
    path: string
    extension: string
  }
  resourceURI: string
  comics: {
    available: number
    collectionURI: string
    items: ComicSummary[]
    returned: number
  }
  series: {
    available: number
    collectionURI: string
    items: SeriesSummary[]
    returned: number
  }
  stories: {
    available: number
    collectionURI: string
    items: StorySummary[]
    returned: number
  }
  events: {
    available: number
    collectionURI: string
    items: EventSummary[]
    returned: number
  }
  urls: Url[]
}

export interface ComicSummary {
  resourceURI: string
  name: string
}

export interface SeriesSummary {
  resourceURI: string
  name: string
}

export interface StorySummary {
  resourceURI: string
  name: string
  type: string
}

export interface EventSummary {
  resourceURI: string
  name: string
}

export interface Url {
  type: string
  url: string
}

export interface MarvelApiResponse<T> {
  code: number
  status: string
  copyright: string
  attributionText: string
  attributionHTML: string
  etag: string
  data: {
    offset: number
    limit: number
    total: number
    count: number
    results: T[]
  }
}

export interface SearchFilters {
  name?: string
  nameStartsWith?: string
  limit?: number
  offset?: number
  orderBy?: string
} 