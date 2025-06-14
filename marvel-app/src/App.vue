<script setup lang="ts">
// Modern minimal setup
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Modern Header -->
    <header class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <nav class="container py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <router-link to="/" class="flex items-center space-x-3 group">
            <div class="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-sm">
              <span class="text-white font-black text-lg">M</span>
            </div>
            <span class="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
              Marvel
            </span>
          </router-link>

          <!-- Navigation -->
          <div class="flex items-center space-x-1">
            <router-link 
              to="/" 
              class="nav-link"
              :class="{ 'nav-active': $route.name === 'home' }"
            >
              Home
            </router-link>
            <router-link 
              to="/characters" 
              class="nav-link"
              :class="{ 'nav-active': $route.name === 'characters' || $route.name === 'character-detail' }"
            >
              Characters
            </router-link>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
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
.nav-link {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  text-decoration: none;
}

.nav-link:hover {
  color: #dc2626;
  background-color: #fef2f2;
}

.nav-active {
  color: #dc2626;
  background-color: #fef2f2;
}
</style>
