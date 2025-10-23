<script setup lang="ts">
</script>

<template>
  <div>
    <router-view v-slot="{Component, route}">
      <Component :is="Component" :key="route.fullPath" />
    </router-view>
  </div>
</template>

<style scoped lang="scss"></style>
