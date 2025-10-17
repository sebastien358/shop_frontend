<script setup lang="ts">
import CommandProgress from '@/templates/commandProgress/CommandProgress.vue'
import { ref } from "vue";

const currentStep = ref<number>(3)
</script>

<template>
  <div>
    <CommandProgress :currentStep="currentStep" />
  </div>
</template>

<style scoped lang="scss">
</style>