<template>
  <div class="flex items-center">
    <ChevronLeftIcon
      class="w-7 cursor-pointer"
      @click="setPage(currentPage - 1)"
    />

    <button
      v-if="currentPage > 1"
      class="p-2 cursor-pointer"
      type="button"
      @click="setPage(1)"
    >
      1
    </button>

    <div
      v-if="currentPage > 2"
      class="p-2"
    >
      ...
    </div>

    <button
      v-if="currentPage > 2"
      class="p-2"
      type="button"
      @click="setPage(currentPage - 1)"
    >
      {{ props.currentPage - 1 }}
    </button>

    <div class="py-1 px-2.5 mx-1.5 bg-sky-500 text-white rounded-full">
      {{ props.currentPage }}
    </div>

    <button
      v-if="currentPage < totalPage - 1"
      class="p-2"
      type="button"
      @click="setPage(currentPage + 1)"
    >
      {{ props.currentPage + 1 }}
    </button>

    <div
      v-if="currentPage < totalPage - 1"
      class="p-2"
    >
      ...
    </div>

    <button
      v-if="currentPage < totalPage"
      class="p-2"
      type="button"
      @click="setPage(props.totalPage)"
    >
      {{ props.totalPage }}
    </button>

    <ChevronRightIcon
      class="w-7 cursor-pointer"
      @click="setPage(currentPage + 1)"
    />
  </div>
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPage: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:currentPage'])

const setPage = page => {
  if (page < 1 || page > props.totalPage) return
  emit('update:currentPage', page)
}

</script>
