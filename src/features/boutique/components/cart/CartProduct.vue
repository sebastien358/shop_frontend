<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore.ts'
const cartStore = useCartStore()

defineProps<{
  item: string
}>()

async function deleteProductToCart(id: number) {
  try {
    await cartStore.deleteProductToCart(id)
  } catch(e) {
    console.error(e)
  }
}
</script>

<template>
  <div>
    <div class="d-flex align-items-center space-between cart-product">
      <h4>{{item.title}}</h4>
      <div class="d-flex align-items-center">
        <p class="quantity"><span>x</span>{{item.quantity}}</p>
        <button @click="deleteProductToCart(item.id)" class="btn btn-danger">
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cart-product {
  border: var(--border);
  padding: 10px 6px;
  border-radius: var(--border-radius);
  background-color: var(--text-primary-color);
  h4 {
    font-size: 13px;
  }
  .quantity {
    font-size: 14px;
    margin-right: 18px;
    span {
      margin-right: 2px;
    }
  }
  button {
    font-size: 11px;
    padding: 9px 8px;
  }
}
</style>
