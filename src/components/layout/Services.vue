<template>
  <section class="relative mt-16 sm:mt-24 lg:mt-32" id="services">
    <SectionHeader title="Mes Services" class="scroll-mt-16" />
    <div class="mt-8 sm:mt-12 lg:mt-20 py-6 sm:py-8 lg:py-16 px-4 sm:px-6 lg:px-8 xl:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 max-w-7xl mx-auto">
      <article 
        class="service-item" 
        v-for="element in services" 
        :key="element.id"
        :ref="el => setArticleRef(el, element.id)"
      >
        <div 
          :class="getServiceClasses(element.id)"
        >
          <div class="flex justify-center items-center relative pt-6 sm:pt-8">
            <div class="icon-container relative bg-slate-900 dark:bg-white/10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28">
              <span class="absolute inset-1 border-2 border-yellow-300 dark:border-blue-500 rounded-full z-[5] animate-pulse"></span>
              <Icon :icon="element.icon" class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-yellow-300 dark:text-blue-500 relative z-[10] drop-shadow-sm flex-shrink-0" />
            </div>
          </div>
          <div class="p-4 sm:p-5 lg:p-6 xl:p-8">
            <h3 class="uppercase font-semibold text-yellow-300 dark:text-blue-500 text-sm sm:text-base lg:text-lg mb-2 sm:mb-3">{{ element.name }}</h3>
            <p class="text-xs sm:text-sm lg:text-base leading-relaxed text-white tracking-wide">{{ element.description }}</p>
          </div>
        </div>
      </article>
</div>
   </section>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import SectionHeader from '../UI/SectionHeader.vue'
const articleRefs = ref({})
const visibleArticles = ref({})
const observers = ref([])

const setArticleRef = (el, id) => {
  if (el) {
    articleRefs.value[id] = el
  }
}

const services = ref([
  

   {id:1,
      icon:"mdi:printer",
      name:'Supports de communication imprimes',
      description:'Je realise des affiches, flyers,cartes de visites, brochures, dépliants, packaging emballages.'
   },

   {id:2,
      icon:"mdi:devices",
      name:'Supports de communication numeriques',
      description: "Je conçois des interfaces utilisateur modernes et intuitives pour vos applications."
   },

   {id:3,
      icon:"mdi:chart-line",
      name:'Supports Marketing Digital',
      description:'Je réalise des banières publicitaires et visuels pour promouvoir votre marque ou votre produit.'
   },

   {id:4,
      icon:"mdi:palette",
      name:'Création de marque et identites visuelles.',
      description:'Je crée pour votre entreprise des logos et une charte graphique pour le développement de votre marque et de votre entreprise.'
   },

   {id:5,
      icon:"mdi:newspaper",
      name:'Édition et publication',
      description:"J'assure la conception de catalogues produits, de couverture de livres, de magazines et journaux. "
   },

   {id:6,
      icon:"mdi:animation",
      name:'Animation et motion Design',
      description:'Je crée des animations 2D et 3D, des vidéos explicatives ainsi que des génériques d\'introduction pour vos entreprises.'
   }
])

onMounted(() => {
  services.value.forEach(service => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleArticles.value[service.id] = entry.isIntersecting
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
      }
    )
    
    observers.value.push(observer)
    
    // Observer l'article quand il est monté
    const checkAndObserve = () => {
      const articleEl = articleRefs.value[service.id]
      if (articleEl) {
        observer.observe(articleEl)
      } else {
        setTimeout(checkAndObserve, 50)
      }
    }
    checkAndObserve()
  })
})

onUnmounted(() => {
  observers.value.forEach(observer => observer.disconnect())
})

const getServiceClasses = (id) => {
  const baseClasses = [
    'h-full', 'relative', 'flex', 'flex-col', 'justify-start', 'text-center',
    'rounded-2xl', 'sm:rounded-3xl', 'border', 'border-blue-500', 'dark:bg-white/10', 'bg-slate-900',
    'transition-all', 'duration-[800ms]', 'ease-out', 'hover:scale-105', 'hover:shadow-xl'
  ]
  
  const visibilityClasses = visibleArticles.value[id] 
    ? ['opacity-100', 'translate-y-0', 'scale-100']
    : ['opacity-0', 'translate-y-12', 'scale-95']
    
  return [...baseClasses, ...visibilityClasses]
}
</script>

<style scoped>
.service-item:nth-child(1) { transition-delay: 100ms; }
.service-item:nth-child(2) { transition-delay: 200ms; }
.service-item:nth-child(3) { transition-delay: 300ms; }
.service-item:nth-child(4) { transition-delay: 400ms; }
.service-item:nth-child(5) { transition-delay: 500ms; }
.service-item:nth-child(6) { transition-delay: 600ms; }
</style>
