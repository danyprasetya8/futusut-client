<template>
  <div class="relative">
    <div>
      <button
        type="button"
        class="flex justify-between w-full rounded-md border border-gray-300 px-4 py-2.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150 ease-in-out" 
        @click="visibleItems = !visibleItems"
      >
        <div>
          {{ props.selectedItem.value || props.selectedItem }}
        </div>
        <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" />
      </button>
    </div>

    <div
      v-if="visibleItems"
      class="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-0"
      @click="visibleItems = false"
    />

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
        class="z-10 origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none max-h-44 overflow-y-scroll"
      >
        <div class="py-1">
          <div
            v-for="(item, i) in props.items"
            :key="i"
            class="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
            @click="itemClickHandler(item)"
          >
            {{ item.value || item }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  @apply w-1.5;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #b5b5b5;
  border-radius: 12px; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/solid'
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  selectedItem: {
    type: [Object, Number, String],
    required: true
  }
})

const emit = defineEmits(['update:selectedItem'])

const visibleItems = ref(false)

const itemClickHandler = item => {
  visibleItems.value = false
  emit('update:selectedItem', item)
}
</script>
