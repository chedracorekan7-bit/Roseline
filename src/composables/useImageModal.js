import { ref } from 'vue'

const isModalOpen = ref(false)
const currentImage = ref('')
const currentTitle = ref('')

export function useImageModal() {
  const openModal = (image, title) => {
    currentImage.value = image
    currentTitle.value = title
    isModalOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    isModalOpen.value = false
    currentImage.value = ''
    currentTitle.value = ''
    document.body.style.overflow = 'auto'
  }

  return {
    isModalOpen,
    currentImage,
    currentTitle,
    openModal,
    closeModal
  }
}