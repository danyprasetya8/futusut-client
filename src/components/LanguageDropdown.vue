<template>
  <div class="relative inline-block text-left">
    <div>
      <button
        type="button"
        class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150 ease-in-out" 
        @click="visibleItems = !visibleItems"
      >
        {{ selectedLanguage.text }}
        <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" />
      </button>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="visibleItems"
        class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <div
            v-for="language in LANGUAGES"
            :key="language.id"
            class="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
            @click="changeLanguage(language)"
          >
            {{ language.text }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/solid'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import config from '@/constant/config'

const LANGUAGES = config.languages

const { locale } = useI18n()

const visibleItems = ref(false)

const selectedLanguage = computed(() => LANGUAGES.find(l => l.id === locale.value))

const changeLanguage = language => {
  locale.value = language.id
  visibleItems.value = false
}
</script>
