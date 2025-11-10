<template>
  <header>
    <div
      class="fixed top-0 left-0 w-full bg-transparent backdrop-filter dark:bg-black-900/95 backdrop-blur-md shadow-lg z-50 transition-all duration-300"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 lg:h-20">
          <!-- Logo -->
          <div
            class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white"
          >
            <span class="hidden sm:inline">Roseline Dako</span>
            <span class="sm:hidden">Roseline Dako</span>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center space-x-8">
            <ul class="flex items-center space-x-6">
              <li v-for="(item, index) in Menu" :key="index">
                <a
                  :href="item.href"
                  @click="scrollToSection(item.href)"
                  :class="[
                    'text-base font-medium transition-colors duration-200 cursor-pointer relative group',
                    activeSection === item.id
                      ? 'text-yellow-500 dark:text-[rgb(221,16,239)]'
                      : 'text-gray-900 dark:text-white hover:text-yellow-500 dark:hover:text-[rgb(221,16,239)]',
                  ]"
                >
                  {{ item.name }}
                  <span
                    :class="[
                      'absolute -bottom-1 left-0 h-0.5 bg-yellow-500 dark:bg-[rgb(221,16,239)] transition-all duration-300',
                      activeSection === item.id
                        ? 'w-full'
                        : 'w-0 group-hover:w-full',
                    ]"
                  ></span>
                </a>
              </li>
            </ul>

            <!-- Theme toggle -->
            <button
              @click="toggleTheme"
              class="p-2.5 lg:p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-yellow-400 dark:hover:bg-[rgb(221,16,239)] hover:text-gray-900 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
              aria-label="Toggle theme"
            >
              <svg
                class="w-5 h-5 lg:w-6 lg:h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  v-if="isDark"
                  d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
                />
                <path
                  v-else
                  d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                />
              </svg>
            </button>
          </nav>

          <!-- Mobile menu button -->
          <div class="lg:hidden flex items-center space-x-3">
            <!-- Theme toggle mobile -->
            <button
              @click="toggleTheme"
              class="p-2 sm:p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-yellow-400 dark:hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md"
              aria-label="Toggle theme"
            >
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  v-if="isDark"
                  d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
                />
                <path
                  v-else
                  d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                />
              </svg>
            </button>

            <!-- Hamburger button -->
            <button
              @click="toggleMobileMenu"
              class="p-2 sm:p-2.5 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 active:scale-95 hover:shadow-sm"
              aria-label="Toggle menu"
            >
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="2"
              >
                <path
                  v-if="!isMobileMenuOpen"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div
          v-if="isMobileMenuOpen"
          class="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
        >
          <div class="px-4 py-6 space-y-1">
            <a
              v-for="(item, index) in Menu"
              :key="index"
              :href="item.href"
              @click="handleMobileMenuClick(item.href)"
              :class="[
                'block px-3 py-3 text-base font-medium rounded-md transition-all duration-200 cursor-pointer',
                activeSection === item.id
                  ? 'text-yellow-500 dark:text-[rgb(221,12,239)] bg-yellow-50 dark:bg-yellow-900/20'
                  : 'text-gray-900 dark:text-white hover:text-[rgb(221,12,239)] dark:hover:text-[rgb(221,12,239)] hover:bg-gray-50 dark:hover:bg-gray-800',
              ]"
            >
              {{ item.name }}
            </a>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useTheme } from "../../composables/useTheme";
import { useActiveSection } from "../../composables/useActiveSection";

const { isDark, toggleTheme } = useTheme();
const { activeSection } = useActiveSection();
const isMobileMenuOpen = ref(false);

const Menu = ref([
  { name: "Services", href: "#services", id: "services" },
  { name: "Compétences", href: "#competences", id: "compétences" },
  { name: "Cursus", href: "#pourquoi", id: "pourquoi" },
  { name: "Projets", href: "#projets", id: "projets" },
  { name: "Contacts", href: "#contact", id: "contact" },
]);

const scrollToSection = (href) => {
  const section = document.querySelector(href);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const handleMobileMenuClick = (href) => {
  scrollToSection(href);
  isMobileMenuOpen.value = false;
};
</script>
