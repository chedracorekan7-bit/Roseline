<template>
  <section id="projets" class="relative px-4 sm:px-6 lg:px-8 xl:px-16 mx-auto scroll-mt-16 max-w-7xl">
    <SectionHeader title="Mes projets" />
    
    <!-- Navigation buttons - Hidden on mobile -->
    <button class="swiper-prev absolute top-[550px] left-2 sm:left-4 lg:left-6 transform -translate-y-1/2 z-20 bg-gray-900 dark:bg-gray-800 text-yellow-300 dark:text-blue-500 p-2.5 sm:p-3 lg:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 hidden sm:flex items-center justify-center border border-blue-300/20 hover:border-blue-300/40">
      <svg class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
      </svg>
    </button>
    <button class="swiper-next absolute top-[550px] right-2 sm:right-4 lg:right-6 transform -translate-y-1/2 z-20 bg-gray-900 dark:bg-gray-800 text-yellow-300 dark:text-blue-500 p-2.5 sm:p-3 lg:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 hidden sm:flex items-center justify-center border border-blue-300/20 hover:border-blue-300/40">
      <svg class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
      </svg>
    </button>

    <!-- Swiper component -->
    <div class="mt-16 sm:mt-20 lg:mt-32">
      <swiper
        :effect="'coverflow'"
        grabCursor
        centeredSlides
        :slidesPerView="1.2"
        :spaceBetween="15"
        :breakpoints="{
          480: {
            slidesPerView: 1.5,
            spaceBetween: 20
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          1024: {
            slidesPerView: 'auto',
            spaceBetween: 40
          }
        }"
        :coverflowEffect="{
          rotate: 20,
          stretch: 0,
          depth: 80,
          modifier: 1,
          slideShadows: true,
        }"
        :navigation="navigationOptions"
        :pagination="{ clickable: true, dynamicBullets: true }"
        :touchRatio="1.5"
        :touchAngle="45"
        :simulateTouch="true"
        :allowTouchMove="true"
        :touchStartPreventDefault="false"
        loop
        :modules="[EffectCoverflow, Navigation, Pagination]"
        class="w-full pb-12"
      >
        <swiper-slide
          class="max-w-[260px] sm:max-w-[320px] lg:max-w-[350px] select-none"
          v-for="(project, index) in projects"
          :key="index"
        >
          <ProjectCard
            :title="project.title"
            :description="project.description"
            :image="project.image"
            :tags="project.tags"
            :liveLink="project.liveLink"
            :codeLink="project.codeLink"
          />
        </swiper-slide>
      </swiper>
    </div>
    
    <!-- Modal pour afficher les images en plein écran -->
    <ImageModal />
  </section>
</template>
<script setup>
import SectionHeader from "../UI/SectionHeader.vue";
import ProjectCard from "../UI/ProjectCard.vue";
import ImageModal from "../UI/ImageModal.vue";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { ref } from "vue";

// Import des images
import projet1 from "@/assets/img/projet1.jpg";
import projet2 from "@/assets/img/projet2.jpg";
import projet3 from "@/assets/img/projet3.jpg";
import projet4 from "@/assets/img/projet4.jpg";
import projet5 from "@/assets/img/projet5.jpg";
import projet6 from "@/assets/img/projet6.jpg";
import projet7 from "@/assets/img/projet7.jpg";
import projet8 from "@/assets/img/projet8.jpg";
import projet9 from "@/assets/img/projet9.jpg";
import projet10 from "@/assets/img/projet10.jpg";
import projet14 from "@/assets/img/projet14.PNG";
import projet15 from "@/assets/img/projet15.PNG";
import projet16 from "@/assets/img/projet16.PNG";


// Definir les options de navigation
const navigationOptions = {
  nextEl: ".swiper-next",
  prevEl: ".swiper-prev",
};

const projects = ref([
  {
    title: "Graphisme",
    description:
      "Visuel pour un événement de graphiste et designers.",
    image: projet1,
    tags: ["Photoshop"],
    liveLink: "/",
    codeLink: "",
  },
  {
    title: "Graphisme",
    description:
      "Logo d'un restaurent de mets Africain.",
    image: projet2,
    tags: ["InDesign"],
    liveLink: "/",
    codeLink: "",
  },
  {
    title: "Graphisme",
    description:
      "Visuel pour une entreprise de Snacks.",
    image: projet3,
    tags: ["Photoshop"],
    liveLink: "/",
    codeLink: "",
  },
  {
    title: "Graphisme",
    description: "Visuel pour une entreprise de vente de materiels informatique.",
    image: projet4,
    tags: ["Premiere Pro"],
    liveLink: "/",
    codeLink: "",
  },
  {
    title: "Graphisme",
    description: "Logo pour une entreprise de Stylisme et de Haute Couture.",
    image: projet5,
    tags: ["InDesign"],
    liveLink: "/",
    codeLink: "",
  },
  {
    title: "Graphisme",
    description:
      "Logo pour une entreprise de E-commerce.",
    image: projet6,
    tags: ["Photoshop"],
    liveLink: "/",
    codeLink: "",
  },

  {
    title: "Graphisme",
    description: "Visuel pour un salon de beauté.",
    image: projet7,
    tags: ["Illustrator"],
    liveLink: "/",
    codeLink: "",
  },

  {
    title: "Graphisme",
    description: "Visuel pour un restaurant Africain.",
    image: projet8,
    tags: ["InDesign"],
    liveLink: "/",
    codeLink: "",
  },

  

  {
    title: "Graphisme",
    description: "Affiche publicitaire pour boutique de mode.",
    image: projet9,
    tags: ["Photoshop"],
    liveLink: "/",
    codeLink: "",
  },

  {
    title: "Design UI/UX",
    description: "Formulaire d'inscription et de connection.",
    image: projet10,
    tags: ["Figma"],
    liveLink: "/",
    codeLink: "",
  },

  

  

  {
    title: "Design UI/UX",
    description: "Formulaire d'inscription et de connection.",
    image: projet14,
    tags: ["Figma"],
    liveLink: "/",
    codeLink: "",
  },

  {
    title: "Design UI",
    description: "Formulaire d'inscription et de connection.",
    image: projet15,
    tags: ["Figma", ],
    liveLink: "/",
    codeLink: "",
  },

  {
    title: "Design UI",
    description: "Formulaire d'inscription et de connection.",
    image: projet16,
    tags: ["Figma"],
    liveLink: "/",
    codeLink: "",
  },

  
]);
</script>

<style>
.swiper-button-next,
.swiper-button-prev {
  cursor: pointer;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Amélioration du touch sur mobile */
.swiper {
  touch-action: pan-y;
}

@media (max-width: 640px) {
  .swiper {
    touch-action: manipulation;
  }
  
  .swiper-slide {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
}
</style>
