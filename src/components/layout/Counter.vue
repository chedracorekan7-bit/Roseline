<template>
   <section class="mt-12 sm:mt-16 lg:mt-20 w-full relative text-white flex justify-center px-4 sm:px-6 lg:px-8">
    <header
      class="absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#00c6cc] via-[#785ae4] to-yellow-300 opacity-30 dark:opacity-20 blur-[60px] sm:blur-[80px] lg:blur-[100px] left-4 sm:left-6 lg:left-10 top-0"
    ></header>
    <header
      class="absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#00c6cc] via-[#785ae4] to-yellow-300 opacity-30 dark:opacity-20 blur-[60px] sm:blur-[80px] lg:blur-[100px] right-4 sm:right-6 lg:right-10 bottom-0"
    ></header>

    <ul 
    ref="statsSection"
    class="relative z-10 p-4 sm:p-6 lg:p-8 mx-auto w-full max-w-6xl rounded-2xl sm:rounded-3xl border bg-slate-900 text-white dark:bg-white/10 dark:text-white backdrop-blur-sm shadow-lg grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-12 border-purple-500 dark:border-blue-500 divide-y sm:divide-y-0 sm:divide-x divide-blue-900 dark:divide-blue-900">
<li v-for="element in numbers" :key="element.id" class="text-center py-2 sm:py-0">
    <h2 class="font-semibold flex justify-center text-2xl sm:text-3xl lg:text-4xl w-full text-white dark:text-white"> 
        + <Countup v-if="hasIntersected" :endVal="element.number" :duration="2" /> </h2>
        <p class="mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base text-white dark:text-white">{{ element.title }}</p>
</li>
    </ul>
   </section>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Countup from 'vue-countup-v3'

const numbers = ref([
    {id:1, number:15, title:"Projets réalisés"},
    {id:2, number:200, title:"Heures de Design "},
    {id:3, number:120, title:"Clients satisfaits"},
    {id:4, number:3, title:"Années d'expérience"},
])
    
const statsSection = ref(null);
const hasIntersected= ref(false);

onMounted(()=>{
    const observer = new IntersectionObserver(
        ([entry]) =>{
            if(entry.isIntersecting) {
                hasIntersected.value=true;
                observer.disconnect(); 
            }
        },
        {threshold:0.5}
    );

    if(statsSection.value){
        observer.observe(statsSection.value)
    }
})
</script>