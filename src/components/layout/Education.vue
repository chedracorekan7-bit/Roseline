<template>
  <section class="p-4 sm:p-6 lg:p-8 xl:p-16">
    <header class="text-center mb-6 sm:mb-8 lg:mb-10">
      <h3 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Education</h3>
    </header>
    <ul class="space-y-4 sm:space-y-6 lg:space-y-8">
      <li 
        v-for="(item, index) in education" 
        :key="index" 
        :ref="el => setItemRef(el, index)"
        :class="[
          'w-full relative rounded-lg bg-gradient-to-b from-[#00c6cc] via-[#785ae4] p-[2px]',
          'transition-all duration-700 ease-out',
          visibleItems[index] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
        ]"
        :style="{ transitionDelay: index * 200 + 'ms' }"
      >
        <article class="flex flex-col sm:flex-row items-center sm:items-start rounded-[12px] bg-gray-900 dark:bg-gray-800 mt-[3px] mx-[3px] p-4 sm:p-6 lg:p-8">
          <figure class="w-full sm:w-1/4 flex justify-center sm:justify-start mb-4 sm:mb-0">
            <div class="p-3 sm:p-4 lg:p-5 bg-blue-500/10 rounded-full border border-blue-500/20">
              <Icon icon="hugeicons:university" class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-yellow-300 dark:text-blue-500 drop-shadow-sm" />
            </div>
          </figure>
          <section class="w-full sm:w-3/4 sm:pl-4 text-center sm:text-left">
            <header>
              <h3 class="text-lg sm:text-xl lg:text-2xl font-semibold uppercase text-yellow-300 dark:text-blue-500 mb-1 sm:mb-2">{{ item.school }}</h3>
              <p class="text-sm sm:text-base text-white mb-1">{{ item.degree }}</p>
              <p class="text-sm sm:text-base text-white">{{ item.duration }}</p>
            </header>
          </section>
        </article>
      </li>
    </ul>
  </section>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const education = ref([
  {
    duration: '2023 - 2025',
    school: 'Canva Design School',
    degree: 'Certification en graphisme.'
  },
  {
    duration: '2024 - 2025',
    school: 'BUSINESS SCHOOL',
    degree: 'Certification en Design UI/UX.'
  }
])

const itemRefs = ref([])
const visibleItems = ref(education.value.map(() => false))
let observer = null

const setItemRef = (el, index) => {
  if (el) {
    itemRefs.value[index] = el
  }
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = itemRefs.value.indexOf(entry.target)
          if (index !== -1) {
            visibleItems.value[index] = true
          }
        }
      })
    },
    { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
  )

  setTimeout(() => {
    itemRefs.value.forEach((el) => {
      if (el) observer.observe(el)
    })
  }, 100)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
