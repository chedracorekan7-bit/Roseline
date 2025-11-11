<template>
  <div
    ref="container"
    class="flex flex-col items-center justify-center opacity-0 translate-y-4 transition-all duration-700 ease-out"
    :class="{ 'opacity-100 translate-y-0': isVisible }"
  >
    <div class="relative w-32 h-32">
      <svg class="w-full h-full transform -rotate-90">
        <!-- Cercle de fond -->
        <circle
          class="text-gray-700"
          stroke="currentColor"
          stroke-width="8"
          fill="transparent"
          r="56"
          cx="64"
          cy="64"
        />
        <!-- Cercle animé -->
        <circle
          class="text-transparent"
          :stroke="gradientUrl"
          stroke-width="8"
          fill="transparent"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="offset"
          r="56"
          cx="64"
          cy="64"
          :style="glowStyle"
        />
        <defs>
  <!-- Dégradé pour dark mode -->
  <linearGradient v-if="isDark" :id="gradientId" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#6a11cb" /> <!-- Bleu-violet -->
    <stop offset="100%" stop-color="#c409c4" /> <!-- Rose -->
  </linearGradient>

  <!-- Dégradé pour light mode -->
  <linearGradient v-else :id="gradientId" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#00c6cc" /> <!-- Jaune -->
    <stop offset="100%" stop-color="#785ae4" /> 
  </linearGradient>
</defs>

      </svg>

      <!-- Pourcentage -->
      <div class="absolute inset-0 flex items-center justify-center mr-3.5 mt-4">
        
        <span
  class="text-xl font-semibold drop-shadow-[0_0_10px_rgba(236,72,153,0.6)] "
  :class="textColor"
>
  {{ displayedValue }}%
</span>

      </div>
    </div>

    <!-- Nom de la compétence -->
    <p class="mt-2 text-center font-medium tracking-wide mr-4" :class="textColor">
  {{ label }}
</p>

  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from "vue";


const isDark = ref(false)

// Vérifie automatiquement le mode actuel de Tailwind
onMounted(() => {
  const checkDark = () => {
    isDark.value = document.documentElement.classList.contains('dark')
  }

  checkDark()
  const observer = new MutationObserver(checkDark)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
});

const glowStyle = computed(() => {
  return isDark.value
    ? { filter: 'drop-shadow(0 0 10px #6a11cb) drop-shadow(0 0 20px #c409c4)' }
    : { filter: '' }
});

const textColor = computed(() => {
  return isDark.value ? 'text-white' : 'text-slate-900'
});


const props = defineProps({
  value: { type: Number, required: true }, // Pourcentage
  label: { type: String, required: true }, // Nom compétence
});

const displayedValue = ref(0);
const radius = 56;
const circumference = 2 * Math.PI * radius;
const offset = ref(circumference);
const gradientId = `grad-${Math.random().toString(36).substring(2, 9)}`;
const gradientUrl = `url(#${gradientId})`;


const isVisible = ref(false);
const container = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true;
        animateProgress();
        observer.disconnect();
      }
    },
    { threshold: 0.5 }
  );
  observer.observe(container.value);
});

const animateProgress = () => {
  let progress = 0;
  const animate = () => {
    if (progress < props.value) {
      progress += 1;
      displayedValue.value = progress;
      offset.value = circumference - (circumference * progress) / 100;
      requestAnimationFrame(animate);
    }
  };
  animate();
};
</script>

<style scoped>
svg circle {
  transition: stroke-dashoffset 0.3s ease;
}
</style>
