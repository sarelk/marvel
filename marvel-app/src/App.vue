<script setup lang="ts">
// Modern minimal setup
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Skip to main content link for screen readers -->
    <a 
      href="#main-content" 
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-red-600 text-white px-4 py-2 rounded-md z-50 focus:z-[60]"
    >
      Skip to main content
    </a>

    <!-- Modern Header -->
    <header class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100" role="banner">
      <nav class="container py-4" role="navigation" aria-label="Main navigation">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <router-link 
            to="/" 
            class="flex items-center space-x-3 group"
            aria-label="Marvel Explorer - Go to homepage"
          >
            <div 
              class="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-sm"
              aria-hidden="true"
            >
              <span class="text-white font-black text-lg">M</span>
            </div>
            <span class="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
              Marvel
            </span>
          </router-link>

          <!-- Navigation -->
          <div class="flex items-center space-x-1" role="menubar">
            <router-link 
              to="/" 
              class="nav-link"
              :class="{ 'nav-active': $route.name === 'home' }"
              role="menuitem"
              :aria-current="$route.name === 'home' ? 'page' : undefined"
            >
              Home
            </router-link>
            <router-link 
              to="/characters" 
              class="nav-link"
              :class="{ 'nav-active': $route.name === 'characters' || $route.name === 'character-detail' }"
              role="menuitem"
              :aria-current="($route.name === 'characters' || $route.name === 'character-detail') ? 'page' : undefined"
            >
              Characters
            </router-link>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main id="main-content" class="flex-1" role="main">
      <router-view />
    </main>

    <!-- Modern Footer -->
    <footer class="bg-gray-900 text-white py-16 mt-20">
      <div class="container text-center">
        <div class="mb-8">
          <div class="inline-flex items-center space-x-3 mb-4">
            <div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-black">M</span>
            </div>
            <span class="text-xl font-bold">Marvel Explorer</span>
          </div>
          <p class="text-gray-400 max-w-lg mx-auto leading-relaxed">
            Discover the incredible world of Marvel superheroes and villains. 
            Built with modern web technologies for the ultimate browsing experience.
          </p>
        </div>
        
        <div class="border-t border-gray-800 pt-8">
          <p class="text-sm text-gray-500">
            Data provided by Marvel. © 2023 MARVEL
          </p>
          <p class="text-xs text-gray-600 mt-2">
            This project is not affiliated with Marvel Entertainment.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.focus\:not-sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

.nav-link {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  text-decoration: none;
}

.nav-link:hover,
.nav-link:focus {
  color: #dc2626;
  background-color: #fef2f2;
  outline: 2px solid #dc2626;
  outline-offset: 2px;
}

.nav-active {
  color: #dc2626;
  background-color: #fef2f2;
}

/* Focus styles for better keyboard navigation */
*:focus {
  outline: 2px solid #dc2626;
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .nav-link:hover,
  .nav-link:focus {
    background-color: #000;
    color: #fff;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
