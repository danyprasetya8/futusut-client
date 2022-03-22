<template>
  <table class="w-full">
    <thead>
      <tr>
        <th
          v-for="(header) in props.headers"
          :key="header.value"
          class="p-5 text-left border-b border-gray-200"
        >
          <div class="h-5 bg-gray-400 animate-pulse rounded-full" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="i in 5"
        :key="i"
      >
        <td
          v-for="header in props.headers"
          :key="header.value"
          class="p-5"
        >
          <div class="h-5 bg-gray-400 animate-pulse rounded-full" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  headers: {
    type: Array,
    required: true
  }
})
</script>
