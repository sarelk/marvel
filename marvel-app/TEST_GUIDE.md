# Testing Guide - Marvel Characters Explorer

## 🧪 Test Setup

This project uses **Vitest** as the testing framework, which provides excellent Vue 3 and TypeScript support with fast execution.

### Testing Stack
- **Vitest** - Modern testing framework (Jest alternative)
- **@vue/test-utils** - Vue component testing utilities
- **jsdom** - DOM environment for testing
- **Happy-DOM** - Alternative DOM implementation

## 🚀 Running Tests

### Basic Commands

```bash
# Run tests in watch mode (recommended for development)
npm test

# Run tests once and exit
npm run test:run

# Run tests with UI interface
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### Test Structure

```
src/
├── services/
│   └── __tests__/
│       ├── marvelApi.test.ts     # API service tests
│       └── imageService.test.ts   # Image service tests
├── stores/
│   └── __tests__/
│       └── marvel.test.ts         # Pinia store tests
└── components/
    └── __tests__/
        └── CharacterCard.test.ts  # Vue component tests
```

## 📋 What's Being Tested

### 1. Marvel API Service (`marvelApi.test.ts`)
- ✅ API authentication and hash generation
- ✅ Character fetching with filters
- ✅ Character details by ID
- ✅ Demo data functionality
- ✅ Image URL generation
- ✅ Error handling

**Key Test Cases:**
```typescript
// API calls with proper authentication
expect(mockAxios.get).toHaveBeenCalledWith(
  'https://gateway.marvel.com/v1/public/characters',
  {
    params: expect.objectContaining({
      ts: expect.any(String),
      apikey: 'test-public-key',
      hash: 'mock-hash'
    })
  }
)

// Demo data structure validation
expect(demoData).toMatchObject({
  code: 200,
  status: 'Ok',
  data: {
    results: expect.arrayContaining([
      expect.objectContaining({
        name: expect.any(String),
        thumbnail: expect.objectContaining({
          path: expect.any(String),
          extension: 'jpg'
        })
      })
    ])
  }
})
```

### 2. Marvel Store (`marvel.test.ts`)
- ✅ Initial state management
- ✅ Character fetching and filtering
- ✅ Search functionality
- ✅ Pagination
- ✅ Demo vs API mode switching
- ✅ Error handling
- ✅ Computed properties

**Key Test Cases:**
```typescript
// State management
expect(store.characters).toEqual([])
expect(store.useDemoData).toBe(false)

// Search functionality
await store.searchCharacters('Spider')
expect(store.searchQuery).toBe('Spider')
expect(marvelApi.getCharacters).toHaveBeenCalledWith(
  expect.objectContaining({
    nameStartsWith: 'Spider'
  })
)

// Pagination
expect(store.totalPages).toBe(3) // 50 results, 20 per page
```

### 3. Character Card Component (`CharacterCard.test.ts`)
- ✅ Props rendering
- ✅ Character data display
- ✅ Image handling
- ✅ Click events
- ✅ Accessibility
- ✅ Edge cases (missing data)

**Key Test Cases:**
```typescript
// Component rendering
expect(wrapper.text()).toContain('Spider-Man')
expect(wrapper.text()).toContain('573') // comics count

// Event handling
await wrapper.find('[data-testid="character-card"]').trigger('click')
expect(wrapper.emitted('click')?.[0]).toEqual([mockCharacter])

// Image attributes
const image = wrapper.find('img')
expect(image.attributes('alt')).toBe('Spider-Man')
```

### 4. Image Service (`imageService.test.ts`)
- ✅ Image URL generation with fallbacks
- ✅ Caching mechanism
- ✅ Preloading functionality
- ✅ Error handling
- ✅ Cache management

**Key Test Cases:**
```typescript
// Image URL with fallback
const result = await imageService.getCharacterImageUrl(character)
expect(result).toContain('ui-avatars.com') // fallback

// Caching
const result1 = await imageService.getCharacterImageUrl(character)
const result2 = await imageService.getCharacterImageUrl(character)
expect(result1).toBe(result2) // cached result
```

## 🛠️ Test Configuration

### Vitest Config (`vitest.config.ts`)
```typescript
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts']
  }
})
```

### Test Setup (`src/test/setup.ts`)
- Environment variable mocking
- Global mocks (axios, crypto-js)
- Browser API mocks (ResizeObserver, IntersectionObserver)
- DOM utilities

## 🎯 Testing Best Practices

### 1. Component Testing
```typescript
// ✅ Good - Test behavior, not implementation
expect(wrapper.text()).toContain('Spider-Man')
await wrapper.trigger('click')
expect(wrapper.emitted('click')).toBeTruthy()

// ❌ Avoid - Testing internal implementation
expect(wrapper.vm.internalMethod).toHaveBeenCalled()
```

### 2. Store Testing
```typescript
// ✅ Good - Test state changes
await store.fetchCharacters()
expect(store.characters).toHaveLength(1)
expect(store.isLoading).toBe(false)

// ✅ Good - Test computed properties
store.totalResults = 50
expect(store.totalPages).toBe(3)
```

### 3. Service Testing
```typescript
// ✅ Good - Mock external dependencies
vi.mock('axios')
const mockAxios = axios as any

// ✅ Good - Test error scenarios
mockAxios.get.mockRejectedValueOnce(new Error('Network error'))
await expect(service.getData()).rejects.toThrow('Network error')
```

## 📊 Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 85%
- **Lines**: > 80%

## 🔧 Debugging Tests

### Common Issues

1. **Component not rendering**
   ```typescript
   // Ensure proper imports and setup
   import { mount } from '@vue/test-utils'
   import Component from '../Component.vue'
   ```

2. **Async operations**
   ```typescript
   // Always await async operations
   await store.fetchCharacters()
   await wrapper.vm.$nextTick()
   ```

3. **Mock not working**
   ```typescript
   // Clear mocks between tests
   beforeEach(() => {
     vi.clearAllMocks()
   })
   ```

### Useful Commands

```bash
# Run specific test file
npm test -- marvelApi.test.ts

# Run tests matching pattern
npm test -- --grep "should fetch characters"

# Run tests in verbose mode
npm test -- --reporter=verbose

# Debug failing test
npm test -- --no-watch --reporter=verbose
```

## 🚀 Continuous Integration

Tests run automatically on:
- Pre-commit hooks (recommended)
- Pull requests
- Main branch pushes

Example GitHub Actions workflow:
```yaml
- name: Run Tests
  run: npm run test:run

- name: Generate Coverage
  run: npm run test:coverage
```

## 📝 Writing New Tests

### 1. Create test file
```typescript
// src/components/__tests__/NewComponent.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NewComponent from '../NewComponent.vue'

describe('NewComponent', () => {
  it('should render correctly', () => {
    const wrapper = mount(NewComponent)
    expect(wrapper.exists()).toBe(true)
  })
})
```

### 2. Run tests
```bash
npm test
```

### 3. Update snapshots (if using)
```bash
npm test -- --update-snapshots
```

## 🎉 Happy Testing!

This comprehensive test suite ensures your Marvel Characters Explorer is robust, reliable, and ready for production! 🦸‍♂️✨ 