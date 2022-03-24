<template>
  <div
    v-for="i in 2"
    :key="i"
    class="mb-5 p-5 shadow rounded-lg bg-white text-sm"
  >
    <div
      v-for="i in 8"
      :key="i"
      :class="{
        'mb-2.5 w-1/2': i % 2,
        'mb-8': !(i % 2)
      }"
    >
      <div class="h-5 bg-gray-400 animate-pulse rounded-full" />
    </div>
  </div>
</template>
