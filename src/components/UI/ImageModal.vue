<template>
  <Teleport to="body">
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
      @click="closeModal"
    >
      <div class="relative max-w-7xl max-h-full">
        <button
          @click="closeModal"
          class="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
        >
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        <img
          :src="currentImage"
          :alt="currentTitle"
          class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          @click.stop
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useImageModal } from '@/composables/useImageModal'

const { isModalOpen, currentImage, currentTitle, closeModal } = useImageModal()
</script>