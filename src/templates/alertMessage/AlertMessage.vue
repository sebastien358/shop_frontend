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

let resetTimeout;

onMounted(() => {
  if (props.type === 'success') {
    resetTimeout = setTimeout(() => {
      router.push({path: '/boutique'})
      emit('close')
    }, 2000)
  } else {
    resetTimeout = setTimeout(() => {
      emit('close')
    }, 3000)
  }
})

onUnmounted(() => {
  clearTimeout(resetTimeout)
})

</script>

<template>
  <div v-if="message" :class="props.type === 'success' ? 'alert-success' : 'alert-error'">
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
