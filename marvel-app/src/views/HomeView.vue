<script setup lang="ts">
// No additional setup needed for this view
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-6">
          Marvel Characters
          <span class="block text-3xl md:text-4xl font-normal mt-2 text-red-200">
            Explorer
          </span>
        </h1>
        <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-red-100">
          Discover the incredible world of Marvel superheroes and villains. 
          Browse through an extensive catalog of characters, learn their stories, 
          and explore their adventures.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link 
            to="/characters"
            class="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors text-lg"
          >
            Browse Characters
          </router-link>
          <a 
            href="#features"
            class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors text-lg"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">
            Powerful Features
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to explore the Marvel universe
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-3">Smart Search</h3>
            <p class="text-gray-600">
              Find your favorite characters instantly with our powerful search functionality. 
              Search by name and discover new heroes.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-3">Advanced Filtering</h3>
            <p class="text-gray-600">
              Sort and filter characters by various criteria. 
              Organize your browsing experience exactly how you want it.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-3">Detailed Profiles</h3>
            <p class="text-gray-600">
              Get comprehensive information about each character including their stories, 
              comics, series, and events.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">
            Marvel Universe by Numbers
          </h2>
          <p class="text-xl text-gray-600">
            Explore the vast collection of Marvel characters and content
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl font-bold text-red-600 mb-2">1500+</div>
            <div class="text-gray-600 font-medium">Characters</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-red-600 mb-2">40,000+</div>
            <div class="text-gray-600 font-medium">Comics</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-red-600 mb-2">300+</div>
            <div class="text-gray-600 font-medium">Series</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-red-600 mb-2">80+</div>
            <div class="text-gray-600 font-medium">Years</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-red-600 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-6">
          Ready to Start Exploring?
        </h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto text-red-100">
          Dive into the Marvel universe and discover the stories behind 
          your favorite superheroes and villains.
        </p>
        <router-link 
          to="/characters"
          class="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition-colors text-lg"
        >
          Browse Characters Now
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 1280px;
}

/* Smooth scroll behavior for anchor links */
html {
  scroll-behavior: smooth;
}
</style>
