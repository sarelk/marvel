import { vi } from 'vitest'

// Mock environment variables
vi.stubEnv('VITE_MARVEL_PUBLIC_KEY', 'test-public-key')
vi.stubEnv('VITE_MARVEL_PRIVATE_KEY', 'test-private-key')
vi.stubEnv('VITE_USE_DEMO_DATA', 'false')

// Mock crypto-js for testing
vi.mock('crypto-js', () => ({
  default: {
    MD5: vi.fn(() => ({
      toString: vi.fn(() => 'mock-hash')
    }))
  },
  MD5: vi.fn(() => ({
    toString: vi.fn(() => 'mock-hash')
  }))
}))

// Mock axios for API calls
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    create: vi.fn(() => ({
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn()
    }))
  }
}))

// Global test utilities
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
}) 