<script setup lang="ts">
// No specific setup needed for this component
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Navigation Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo/Brand -->
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">M</span>
            </div>
            <router-link 
              to="/" 
              class="text-2xl font-bold text-gray-800 hover:text-red-600 transition-colors"
            >
              Marvel Characters
            </router-link>
          </div>

          <!-- Navigation Links -->
          <div class="flex items-center space-x-6">
            <router-link 
              to="/" 
              class="nav-link"
              :class="{ 'router-link-active': $route.name === 'home' }"
            >
              Home
            </router-link>
            <router-link 
              to="/characters" 
              class="nav-link"
              :class="{ 'router-link-active': $route.name === 'characters' }"
            >
              Characters
            </router-link>
            <router-link 
              to="/about" 
              class="nav-link"
              :class="{ 'router-link-active': $route.name === 'about' }"
            >
              About
            </router-link>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12 mt-16">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <h3 class="text-2xl font-bold mb-4">Marvel Characters Explorer</h3>
          <p class="text-gray-400 mb-6 max-w-2xl mx-auto">
            Discover the amazing world of Marvel superheroes and villains. 
            Built with Vue 3, TypeScript, and Pinia for the ultimate character browsing experience.
          </p>
          <div class="text-sm text-gray-500">
            <p>Data provided by Marvel. © 2023 MARVEL</p>
            <p class="mt-2">
              To use live Marvel API data, add your API keys to the marvelApi service.
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.nav-link {
  @apply text-gray-600 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors;
}

.nav-link.router-link-active {
  @apply text-red-600 bg-red-50;
}

.container {
  max-width: 1280px;
}
</style>
