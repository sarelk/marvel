<script setup lang="ts">
// Clean, minimal setup
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero-gradient py-20 lg:py-32">
      <div class="container text-center text-white">
        <div class="max-w-3xl mx-auto">
          <h1 class="text-4xl lg:text-6xl font-black mb-6 leading-tight">
            🚀 Explore the
            <span class="block text-red-200">Marvel Universe 🦸‍♂️</span>
          </h1>
          <p class="text-xl lg:text-2xl mb-10 text-red-100 font-light leading-relaxed">
            Discover iconic heroes, legendary villains, and epic stories from 
            the Marvel multiverse.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/characters" class="btn-primary text-lg px-8 py-4">
              Start Exploring
            </router-link>
            <a href="#features" class="btn-secondary bg-white/20 text-white hover:bg-white/30 text-lg px-8 py-4">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 lg:py-32">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Marvel Explorer?
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            The most comprehensive and beautiful way to browse Marvel characters
          </p>
        </div>

        <div class="grid gap-8 lg:gap-12">
          <!-- Feature 1 -->
          <div class="card-modern p-8 lg:p-12 text-center">
            <div class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Lightning Fast Search</h3>
            <p class="text-gray-600 text-lg leading-relaxed">
              Find any Marvel character instantly with our intelligent search. 
              No waiting, no loading - just instant results.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="card-modern p-8 lg:p-12 text-center">
            <div class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Beautiful Profiles</h3>
            <p class="text-gray-600 text-lg leading-relaxed">
              Immerse yourself in detailed character profiles with stunning visuals 
              and comprehensive information about your favorite heroes.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="card-modern p-8 lg:p-12 text-center">
            <div class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Mobile Perfection</h3>
            <p class="text-gray-600 text-lg leading-relaxed">
              Seamlessly browse characters on any device. Our responsive design 
              adapts perfectly to phones, tablets, and desktops.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-gray-900 py-20 lg:py-32">
      <div class="container text-center">
        <h2 class="text-3xl lg:text-5xl font-bold text-white mb-16">
          The Marvel Universe
        </h2>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl lg:text-5xl font-black text-red-500 mb-3">1,500+</div>
            <div class="text-gray-300 text-lg font-medium">Characters</div>
          </div>
          <div class="text-center">
            <div class="text-4xl lg:text-5xl font-black text-red-500 mb-3">40,000+</div>
            <div class="text-gray-300 text-lg font-medium">Comics</div>
          </div>
          <div class="text-center">
            <div class="text-4xl lg:text-5xl font-black text-red-500 mb-3">300+</div>
            <div class="text-gray-300 text-lg font-medium">Series</div>
          </div>
          <div class="text-center">
            <div class="text-4xl lg:text-5xl font-black text-red-500 mb-3">80+</div>
            <div class="text-gray-300 text-lg font-medium">Years</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 lg:py-32">
      <div class="container text-center">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready for Adventure?
          </h2>
          <p class="text-xl text-gray-600 mb-10 leading-relaxed">
            Join millions of fans exploring the Marvel universe. Start your journey today.
          </p>
          <router-link to="/characters" class="btn-primary text-lg px-8 py-4 inline-block">
            Explore Characters
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}
</style>
