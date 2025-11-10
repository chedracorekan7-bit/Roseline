<template>
  <button 
    v-if="isVisible" 
    @click="scrollToTop" 
    class="fixed bottom-30 right-6 cursor-pointer bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 z-50 border-2 border-yellow-300/20 dark:border-[rgb(221,12,239)] dark:hover:border-[rgb(221,12,239)] hover:border-yellow-300/40"
  >
    <svg class="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-yellow-300 dark:text-[rgb(221,12,239)] drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
    </svg>
  </button> 
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
  isVisible.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
