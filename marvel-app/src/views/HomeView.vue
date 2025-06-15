<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const featuredCharacters = ref([
  { name: 'Spider-Man', emoji: '🕷️' },
  { name: 'Iron Man', emoji: '🤖' },
  { name: 'Captain America', emoji: '🛡️' },
  { name: 'Thor', emoji: '⚡' },
  { name: 'Hulk', emoji: '💚' },
  { name: 'Black Widow', emoji: '🕸️' }
])

const stats = ref([
  { value: '1,500+', label: 'Characters', icon: '🦸‍♂️' },
  { value: '40,000+', label: 'Comics', icon: '📚' },
  { value: '300+', label: 'Series', icon: '📺' },
  { value: '80+', label: 'Years', icon: '⏰' }
])

const handleExploreClick = () => {
  router.push('/characters')
}
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero-gradient relative overflow-hidden">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div class="absolute top-40 right-20 w-20 h-20 bg-red-200 rounded-full animate-bounce" style="animation-delay: 1s;"></div>
        <div class="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full animate-pulse" style="animation-delay: 2s;"></div>
      </div>
      
      <div class="container relative z-10 py-20 lg:py-32">
        <div class="text-center text-white">
          <div class="max-w-4xl mx-auto">
            <!-- Animated Title -->
            <div class="mb-8 smooth-entrance">
              <h1 class="text-5xl lg:text-7xl font-black mb-6 leading-tight">
                🚀 Explore the
                <span class="block bg-gradient-to-r from-red-200 to-yellow-200 bg-clip-text text-transparent">
                  Marvel Universe
                </span>
              </h1>
              <div class="flex justify-center items-center gap-4 mb-6">
                <div v-for="char in featuredCharacters.slice(0, 6)" :key="char.name" 
                     class="text-4xl animate-bounce" 
                     :style="{ animationDelay: Math.random() * 2 + 's' }">
                  {{ char.emoji }}
                </div>
              </div>
            </div>

            <!-- Enhanced Description -->
            <p class="text-xl lg:text-2xl mb-12 text-red-100 font-light leading-relaxed max-w-3xl mx-auto smooth-entrance-delay-1">
              Discover iconic heroes, legendary villains, and epic stories from 
              the Marvel multiverse. Your gateway to unlimited adventure awaits!
            </p>

            <!-- Enhanced CTAs -->
            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center smooth-entrance-delay-2">
              <button @click="handleExploreClick" 
                      class="group btn-primary text-lg px-10 py-4 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <span class="flex items-center gap-3">
                  Start Exploring
                  <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </span>
              </button>
              <a href="#features" 
                 class="group btn-secondary bg-white/20 text-white hover:bg-white/30 text-lg px-10 py-4 backdrop-blur-sm border border-white/30 transform hover:scale-105 transition-all duration-300">
                <span class="flex items-center gap-3">
                  Learn More
                  <svg class="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Stats Preview -->
    <section class="py-16 bg-gradient-to-r from-gray-50 to-white">
      <div class="container">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(stat, index) in stats" :key="stat.label" 
               class="text-center transform hover:scale-105 transition-all duration-300 smooth-entrance"
               :style="{ animationDelay: (index * 100) + 'ms' }">
            <div class="text-6xl mb-2">{{ stat.icon }}</div>
            <div class="text-3xl lg:text-4xl font-black text-red-600 mb-2">{{ stat.value }}</div>
            <div class="text-gray-600 text-lg font-medium">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Enhanced Features Section -->
    <section id="features" class="py-20 lg:py-32 bg-white">
      <div class="container">
        <div class="text-center mb-20">
          <h2 class="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Why Choose 
            <span class="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Marvel Explorer?
            </span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The most comprehensive, beautiful, and intuitive way to explore the Marvel universe
          </p>
        </div>

        <div class="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <!-- Feature 1 - Enhanced -->
          <div class="group card-modern p-8 lg:p-10 text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
            <div class="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-6">⚡ Lightning Fast Search</h3>
            <p class="text-gray-600 text-lg leading-relaxed mb-6">
              Find any Marvel character instantly with our intelligent search. 
              No waiting, no loading - just instant results at your fingertips.
            </p>
            <div class="flex justify-center">
              <span class="inline-flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-medium">
                🚀 Instant Results
              </span>
            </div>
          </div>

          <!-- Feature 2 - Enhanced -->
          <div class="group card-modern p-8 lg:p-10 text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-6">✨ Beautiful Profiles</h3>
            <p class="text-gray-600 text-lg leading-relaxed mb-6">
              Immerse yourself in detailed character profiles with stunning visuals, 
              comprehensive stats, and rich storytelling elements.
            </p>
            <div class="flex justify-center">
              <span class="inline-flex items-center px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                🎨 Visual Excellence
              </span>
            </div>
          </div>

          <!-- Feature 3 - Enhanced -->
          <div class="group card-modern p-8 lg:p-10 text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-6">📱 Perfect Everywhere</h3>
            <p class="text-gray-600 text-lg leading-relaxed mb-6">
              Seamlessly browse characters on any device. Our responsive design 
              adapts perfectly to phones, tablets, and desktops.
            </p>
            <div class="flex justify-center">
              <span class="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                📲 Multi-Device
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Character Preview -->
    <section class="py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-6xl font-bold mb-6">
            Meet Your 
            <span class="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
              Heroes
            </span>
          </h2>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Get a taste of the incredible characters waiting to be discovered
          </p>
        </div>

        <!-- Character Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          <div v-for="(character, index) in featuredCharacters" :key="character.name"
               class="group text-center transform hover:scale-110 transition-all duration-300 cursor-pointer smooth-entrance"
               :style="{ animationDelay: (index * 100) + 'ms' }"
               @click="handleExploreClick">
            <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-4xl group-hover:shadow-2xl transition-all duration-300">
              {{ character.emoji }}
            </div>
            <h3 class="text-white font-bold group-hover:text-red-300 transition-colors">
              {{ character.name }}
            </h3>
          </div>
        </div>

        <!-- Universe Stats -->
        <div class="text-center">
          <div class="inline-flex items-center gap-8 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6">
            <div class="text-center">
              <div class="text-3xl font-black text-red-400 mb-1">1,500+</div>
              <div class="text-gray-300 text-sm">Characters</div>
            </div>
            <div class="w-px h-8 bg-gray-600"></div>
            <div class="text-center">
              <div class="text-3xl font-black text-yellow-400 mb-1">40K+</div>
              <div class="text-gray-300 text-sm">Comics</div>
            </div>
            <div class="w-px h-8 bg-gray-600"></div>
            <div class="text-center">
              <div class="text-3xl font-black text-blue-400 mb-1">80+</div>
              <div class="text-gray-300 text-sm">Years</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Enhanced CTA Section -->
    <section class="py-20 lg:py-32 bg-gradient-to-r from-red-50 to-red-100">
      <div class="container text-center">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-4xl lg:text-6xl font-bold text-gray-900 mb-8">
            Ready for Your
            <span class="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Marvel Journey?
            </span>
          </h2>
          <p class="text-xl text-gray-700 mb-12 leading-relaxed max-w-2xl mx-auto">
            Join millions of fans exploring the Marvel universe. 
            Your next favorite character is just one click away!
          </p>
          
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button @click="handleExploreClick" 
                    class="group btn-primary text-xl px-12 py-5 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
              <span class="flex items-center gap-3">
                🚀 Start Your Adventure
                <svg class="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </button>
            
            <div class="flex items-center gap-4 text-gray-600">
              <div class="flex -space-x-2">
                <div class="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full border-2 border-white flex items-center justify-center text-white font-bold">🕷️</div>
                <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white font-bold">🛡️</div>
                <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-white flex items-center justify-center text-white font-bold">💚</div>
              </div>
              <span class="text-sm">Join thousands of Marvel fans</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Smooth entrance animations - no flicker, pure CSS */
@keyframes smooth-fade-in {
  0% {
    opacity: 0.8;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.smooth-entrance {
  animation: smooth-fade-in 0.8s ease-out forwards;
  opacity: 1; /* Start visible to prevent flicker */
}

.smooth-entrance-delay-1 {
  animation: smooth-fade-in 0.8s ease-out forwards;
  animation-delay: 0.2s;
  opacity: 1;
}

.smooth-entrance-delay-2 {
  animation: smooth-fade-in 0.8s ease-out forwards;
  animation-delay: 0.4s;
  opacity: 1;
}

/* Ensure no layout shifts */
.home-view {
  opacity: 1;
  visibility: visible;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Custom gradient text support */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* Enhanced hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

.group:hover .group-hover\:translate-y-1 {
  transform: translateY(0.25rem);
}

.group:hover .group-hover\:text-red-300 {
  color: #fca5a5;
}

/* Backdrop blur support */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>
