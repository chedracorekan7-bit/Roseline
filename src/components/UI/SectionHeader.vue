<template>
  <div class="relative py-8 sm:py-12 lg:py-16 mt-6 sm:mt-8 lg:mt-10">
    <!-- Background decorations -->
    <div
      class="absolute w-1/3 sm:w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#00c6cc] via-[#785ae4] to-yellow-300 opacity-20 sm:opacity-30 dark:opacity-10 dark:sm:opacity-20 blur-[60px] sm:blur-[80px] lg:blur-[100px] left-4 sm:left-6 lg:left-10 -top-6 sm:-top-8 lg:-top-10 hidden sm:block"
    ></div>
    <div
      class="absolute w-1/3 sm:w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#00c6cc] via-[#785ae4] to-yellow-300 opacity-20 sm:opacity-30 dark:opacity-10 dark:sm:opacity-20 blur-[60px] sm:blur-[80px] lg:blur-[100px] right-4 sm:right-6 lg:right-10 -bottom-6 sm:-bottom-8 lg:-bottom-10 hidden sm:block"
    ></div>
    
    <!-- Title -->
    <h2 
      ref="titleRef"
      :class="[
        'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center dark:text-[rgb(221,16,239)] text-gray-900 relative z-10 px-4',
        'transition-all duration-[600ms] ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      ]"
    > 
      {{ title }}
    </h2>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
    title: {
        type: String,
        required: true,
    },
})

const titleRef = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
    observer = new IntersectionObserver(
        ([entry]) => {
            isVisible.value = entry.isIntersecting
        },
        {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        }
    )

    if (titleRef.value) {
        observer.observe(titleRef.value)
    }
})

onUnmounted(() => {
    if (observer) {
        observer.disconnect()
    }
})
</script>
