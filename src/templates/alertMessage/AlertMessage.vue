<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  message: string
  type: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

let timeoutId = null

onMounted(() => {
  if (props.type === 'success') {
    timeoutId = setTimeout(() => {
      emit('close')
      router.push({path: '/boutique'})
    }, 2000)
  } else {
    timeoutId = setTimeout(() => {
      emit('close')
    }, 4000)
  }
})

onUnmounted(() => {
  clearTimeout(timeoutId)
})
</script>

<template>
  <div v-if="message" :class="type === 'success' ? 'alert-success' : 'alert-error'">
    {{ message }}
  </div>
</template>

<style scoped lang="scss">
.alert-success,
.alert-error {
  font-size: 12px;
  margin-top: 5px;
}

.alert-success {
  color: green;
}

.alert-error {
  color: red;
}
</style>
