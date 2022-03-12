<template>
  <div :class="`w-${props.size}`">
    <div
      v-for="i in 3"
      :key="i"
      :class="{
        'w-full h-1 bg-black rounded-sm': true,
        'mb-1': i !== 3
      }"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: '7'
  }
})
</script>
