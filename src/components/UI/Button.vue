<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <svg
      v-if="icon"
      :class="iconClasses"
      fill="currentColor"
      viewBox="0 0 24 24"
      v-html="icon"
    ></svg>
    <span>{{ text }}</span>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  text: { type: String, required: true },
  variant: { type: String, default: "primary" },
  size: { type: String, default: "md" },
  icon: { type: String, default: "" },
  type: { type: String, default: "button" },
  fullWidth: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

defineEmits(["click"]);

const baseClasses =
  "font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 flex items-center justify-center gap-2 touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c409c4]";

const variantClasses = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-yellow-400 text-gray-900 hover:bg-yellow-500 dark:bg-gradient-to-r dark:from-[#6a11cb] dark:to-[#c409c4] dark:text-white dark:hover:opacity-90";
    case "secondary":
      return "bg-yellow-400 text-gray-900 hover:bg-yellow-500 dark:bg-gradient-to-r dark:from-[#6a11cb] dark:to-[#c409c4] dark:text-white dark:hover:opacity-90";
    default:
      return "bg-yellow-400 text-gray-900 hover:bg-yellow-500 dark:bg-gradient-to-r dark:from-[#6a11cb] dark:to-[#c409c4] dark:text-white dark:hover:opacity-90";
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "py-2 px-4 text-sm";
    case "md":
      return "py-3 px-6 text-sm sm:text-base min-h-[48px]";
    case "lg":
      return "py-4 px-8 text-base sm:text-lg min-h-[52px]";
    default:
      return "py-3 px-6 text-sm sm:text-base min-h-[48px]";
  }
});

const widthClasses = computed(() => {
  return props.fullWidth ? "w-full" : "w-full sm:w-auto";
});

const buttonClasses = computed(() => {
  const disabledClasses = props.disabled
    ? "opacity-60 cursor-not-allowed pointer-events-none transform-none hover:shadow-none"
    : "";
  return [
    baseClasses,
    variantClasses.value,
    sizeClasses.value,
    widthClasses.value,
    disabledClasses,
  ].join(" ");
});

const iconClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "w-4 h-4 flex-shrink-0";
    case "md":
      return "w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0";
    case "lg":
      return "w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0";
    default:
      return "w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0";
  }
});
</script>
