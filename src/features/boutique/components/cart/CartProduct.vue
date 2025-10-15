<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore.ts'
import type { CartProductInterface } from '@/shared/interfaces'
const cartStore = useCartStore()

defineProps<{
  item: CartProductInterface
}>()

async function addItemToCart(id: number) {
  try {
    await cartStore.addItemToCart(id)
  } catch(e) {
    console.error(e)
  }
}

async function deleteItemToCart(id: number) {
  try {
    await cartStore.deleteItemToCart(id)
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
        <font-awesome-icon @click="deleteItemToCart(item.id)" icon="fa-solid fa-minus" />
        <p class="quantity"><span>x</span>{{item.quantity}}</p>
        <font-awesome-icon @click="addItemToCart(item.id)" icon="fa-solid fa-plus" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cart-product {
  border: var(--border);
  padding: 20px 6px;
  border-radius: var(--border-radius);
  background-color: var(--text-primary-color);
  h4 {
    font-size: 13px;
  }
  .fa-minus {
    cursor: pointer;
    font-size: 15px;
    color: green;
  }
  .quantity {
    font-size: 14px;
    margin: 0 6px;
    span {
      margin-right: 2px;
    }
  }
  .fa-plus {
    cursor: pointer;
    font-size: 15px;
    color: red;
  }
  button {
    font-size: 11px;
    padding: 9px 8px;
  }
}
</style>
