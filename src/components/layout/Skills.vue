<template>
  <section id="competences" class="scroll-mt-16">
    <SectionHeader title="Mes compétences" class="scroll-mt-16" />
    <div class="grid grid-cols-2 md:grid-cols-3 gap-8 bg-transparent py-10">
      <SkillsRing label="Illustrator" :value="90" />
      <SkillsRing label="Photoshop" :value="85" />
      <SkillsRing label="InDesign" :value="80" />
      <SkillsRing label="Premiere Pro" :value="80" />
      <SkillsRing label="After Effects" :value="75" />
      <SkillsRing label="Canva" :value="95" />
      <SkillsRing label="Figma" :value="80" />
      <SkillsRing label="Sketch" :value="60" />
      <SkillsRing label="InkScape" :value="70" />
    </div>
  </section>
</template>

<script setup>
import SectionHeader from "../UI/SectionHeader.vue";
import SkillsRing from "./SkillsRing.vue";
</script>
