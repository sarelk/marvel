import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CharacterCard from '../CharacterCard.vue'
import type { MarvelCharacter } from '../../types/marvel'

const mockCharacter: MarvelCharacter = {
  id: 1009610,
  name: 'Spider-Man',
  description: 'Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider.',
  modified: '2016-09-28T12:18:41-0400',
  thumbnail: {
    path: 'https://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b',
    extension: 'jpg'
  },
  resourceURI: 'http://gateway.marvel.com/v1/public/characters/1009610',
  comics: { available: 573, collectionURI: '', items: [], returned: 0 },
  series: { available: 116, collectionURI: '', items: [], returned: 0 },
  stories: { available: 1059, collectionURI: '', items: [], returned: 0 },
  events: { available: 28, collectionURI: '', items: [], returned: 0 },
  urls: [
    {
      type: 'detail',
      url: 'http://marvel.com/characters/54/spider-man'
    }
  ]
}

describe('CharacterCard', () => {
  it('should render character name', () => {
    const wrapper = mount(CharacterCard, {
      props: {
        character: mockCharacter
      }
    })

    expect(wrapper.text()).toContain('Spider-Man')
  })

  it('should render character description', () => {
    const wrapper = mount(CharacterCard, {
      props: {
        character: mockCharacter
      }
    })

    expect(wrapper.text()).toContain('Bitten by a radioactive spider')
  })

  it('should render character stats', () => {
    const wrapper = mount(CharacterCard, {
      props: {
        character: mockCharacter
      }
    })

    expect(wrapper.text()).toContain('573') // comics count
    expect(wrapper.text()).toContain('116') // series count
    expect(wrapper.text()).toContain('1059') // stories count
    expect(wrapper.text()).toContain('28') // events count
  })

  it('should render character image with correct src', () => {
    const wrapper = mount(CharacterCard, {
      props: {
        character: mockCharacter
      }
    })

    const image = wrapper.find('img')
    expect(image.exists()).toBe(true)
    expect(image.attributes('src')).toContain('526548a343e4b')
    expect(image.attributes('alt')).toBe('Spider-Man')
  })

  it('should handle character with no description', () => {
    const characterWithoutDescription = {
      ...mockCharacter,
      description: ''
    }

    const wrapper = mount(CharacterCard, {
      props: {
        character: characterWithoutDescription
      }
    })

    expect(wrapper.text()).toContain('No description available')
  })

  it('should emit click event when card is clicked', async () => {
    const wrapper = mount(CharacterCard, {
      props: {
        character: mockCharacter
      }
    })

    await wrapper.find('[data-testid="character-card"]').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted('click')?.[0]).toEqual([mockCharacter])
  })

  it('should handle character with missing thumbnail gracefully', () => {
    const characterWithoutThumbnail = {
      ...mockCharacter,
      thumbnail: {
        path: '',
        extension: 'jpg'
      }
    }

    const wrapper = mount(CharacterCard, {
      props: {
        character: characterWithoutThumbnail
      }
    })

    const image = wrapper.find('img')
    expect(image.exists()).toBe(true)
    // Should have fallback image or handle gracefully
  })

  it('should display stats with proper formatting', () => {
    const wrapper = mount(CharacterCard, {
      props: {
        character: mockCharacter
      }
    })

    // Check that stats are displayed in a readable format
    expect(wrapper.html()).toContain('Comics')
    expect(wrapper.html()).toContain('Series')
    expect(wrapper.html()).toContain('Stories')
    expect(wrapper.html()).toContain('Events')
  })

  it('should handle zero stats gracefully', () => {
    const characterWithZeroStats = {
      ...mockCharacter,
      comics: { available: 0, collectionURI: '', items: [], returned: 0 },
      series: { available: 0, collectionURI: '', items: [], returned: 0 },
      stories: { available: 0, collectionURI: '', items: [], returned: 0 },
      events: { available: 0, collectionURI: '', items: [], returned: 0 }
    }

    const wrapper = mount(CharacterCard, {
      props: {
        character: characterWithZeroStats
      }
    })

    expect(wrapper.text()).toContain('0')
  })

  it('should have proper accessibility attributes', () => {
    const wrapper = mount(CharacterCard, {
      props: {
        character: mockCharacter
      }
    })

    const card = wrapper.find('[data-testid="character-card"]')
    expect(card.exists()).toBe(true)
    
    // Check for proper role or tabindex for keyboard navigation
    const image = wrapper.find('img')
    expect(image.attributes('alt')).toBeTruthy()
  })

  it('should apply hover effects correctly', async () => {
    const wrapper = mount(CharacterCard, {
      props: {
        character: mockCharacter
      }
    })

    const card = wrapper.find('[data-testid="character-card"]')
    await card.trigger('mouseenter')

    // Check if hover classes are applied (this would depend on your CSS implementation)
    expect(card.classes()).toContain('hover') // or whatever hover class you use
  })
}) 