<template>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400&display=swap');
</style>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup>
</script>
