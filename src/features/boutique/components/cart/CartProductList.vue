<script setup lang="ts">
import CartProduct from '@/features/boutique/components/cart/CartProduct.vue'

defineProps<{
  cart: cart[]
}>()
</script>

<template>
  <div class="cart-product-list">
    <CartProduct
      v-for="item in cart"
      :item="item"
      :key="item.id"
    />
  </div>
</template>

<style scoped lang="scss">
.cart-product-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
