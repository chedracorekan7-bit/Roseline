<template>
  <section
    id="hero"
    class="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 dark:text-white"
  >
    <!-- Background decorations -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute w-[300px] sm:w-[400px] lg:w-[500px] h-[150px] sm:h-[180px] lg:h-[200px] -skew-x-12 rounded-full bg-gradient-to-r from-[#00c6cc] via-[#785ae4] to-yellow-300 opacity-20 dark:opacity-10 blur-[80px] sm:blur-[100px] left-2 sm:left-6 lg:left-10 top-0"
      ></div>
      <div
        class="absolute w-[300px] sm:w-[400px] lg:w-[500px] h-[150px] sm:h-[180px] lg:h-[200px] -skew-x-12 rounded-full bg-gradient-to-r from-[#00c6cc] via-[#785ae4] to-yellow-300 opacity-20 dark:opacity-10 blur-[80px] sm:blur-[100px] right-2 sm:right-6 lg:right-10 bottom-0"
      ></div>
    </div>

    <div class="relative z-10 w-full max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <!-- Content -->
        <div class="text-center lg:text-left order-2 lg:order-1">
          <h1
            class="mb-4 sm:mb-6 text-2xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight"
          >
            <span class="block sm:inline">Salut, Je m'appelle</span> &nbsp;
            <div
              class=" text-stroke-primary stroke-text text-stroke-secondary dark:text-stroke-primary"
            >
              Roseline.
            </div>
          </h1>
          <h2 class="text-2xl md:text-4xl font-semibold h-10"
          :class="isDark ? 'text-[rgb(221,12,239)]':'text-yellow-500'"> <span class="text-slate-900 dark:text-white">Je suis</span> {{ displayedText }} <span class="border-r-4 border-slate-900 dark:border-[rgb(221,12,239)] animate-blink ml-1"></span>
        </h2>
          <p
            class="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 font-medium text-gray-700 dark:text-gray-300 leading-relaxed mb-6 lg:mb-8"
          >
            Animée par une passion pour le design, je mêle créativité et émotion
            pour donner vie à des univers visuels uniques. Mon travail explore
            les formes, les couleurs et les textures avec une approche
            contemporaine, toujours guidée par le désir de transmettre un
            message puissant et authentique. Curieuse et autodidacte, j’aime
            repousser les limites du possible et intégrer de nouvelles
            inspirations pour nourrir mes créations. À travers la collaboration
            et le partage, je cherche à bâtir des projets qui racontent une
            histoire et éveillent les sens. Mon ambition est d’évoluer au sein
            d’une agence vibrante, où mon regard artistique peut s’exprimer
            pleinement au service de créations porteuses de sens.
          </p>

          <div class="">
            <div class="flex gap-4 items-center justify-center">
              <Button
                text="Contactez moi"
                variant="primary"
                size="md"
                icon="<path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'/>"
                @click="scrollToContact"
              />
              <Button
                text="Mon CV."
                variant="secondary"
                size="md"
                icon="<path d='M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z'/>"
                @click="downloadCV"
              />
            </div>
            
          </div>
        </div>

        <!-- Image -->
        <div class="flex justify-center lg:justify-end order-1 lg:order-2">
          <div class="relative">
            <div
              class="w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[400px] xl:w-66 xl:h-[400px] overflow-hidden rounded-full shadow-2xl transition-transform duration-500"
            >
              <img
                src="/src/assets/hero.jpg"
                alt="Roseline Dako - Graphiste Designer"
                class="w-full h-full object-cover"
                :class="{'zoom-in' : isZoomed }"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Animation d'entrée au scroll
import {ref, onMounted } from "vue";
import Button from "../UI/Button.vue";

const isZoomed = ref(false)

onMounted(()=>{
  setTimeout(()=>{
    isZoomed.value = true
  },500)
})

const roles = [
  'Graphiste.',
  'Designer UI/UX.' 
]

const displayedText = ref('');
const currentRole = ref(0);
const isDeleting = ref(false);
const isDark = ref(false);

const typeSpeed = 50;
const eraseSpeed = 50;
const delayBetweenWords = 1000;

onMounted(()=>{
  const checkDark = ()=>{
    isDark.value = document.documentElement.classList.contains('dark')
  }
  checkDark();
  const observer = new
  MutationObserver(checkDark)

  observer.observe(document.documentElement,{attributes:true,attributeFilter:['class']})
  typeEffect()
})

function typeEffect(){
  const role = 
  roles[currentRole.value]
  if(!isDeleting.value) {
    displayedText.value = role.substring(0, displayedText.value.length + 1)
    if(displayedText.value === role){
      setTimeout(()=>(isDeleting.value = true),
    delayBetweenWords)
    }
  }else{
    displayedText.value = role.substring(0,
      displayedText.value.length - 1
    )

    if(displayedText.value === '')
  {
    isDeleting.value = false
    currentRole.value = (currentRole.value + 1) % roles.length
  }
  }

  const speed = isDeleting.value ? eraseSpeed : typeSpeed
  setTimeout(typeEffect, speed)
}


const scrollToContact = () => {
  const contactSection = document.querySelector("#contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  }
};

const downloadCV = () => {
  // Logique pour télécharger le CV
  const fileName = "CV pro.pdf";
  const link = document.createElement("a");
  link.href = `/${encodeURIComponent(fileName)}`;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
        }
      });
    },
    { threshold: 0.1 }
  );

  const elements = document.querySelectorAll(".hero-animate");
  elements.forEach((el) => observer.observe(el));
});
</script>

<style scoped>
@keyframes blink {
  0%, 50%, 100% {
    opacity:1;
  }
  25%, 75% {
    opacity:0;
  }
}

.zoom-in {
  animation: zoom-in 2s ease-in-out;
}

@keyframes zoom-in{
  0%{
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.animate-blink {
  animation: blink 1s infinite;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}
</style>
