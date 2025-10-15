<script setup lang="ts">
import ShopProduct from '@/features/boutique/components/shop/ShopProduct.vue'
import { useProductStore } from '@/stores/productStore.ts'
import type { ProductInterface } from '@/shared/interfaces'

const productStore = useProductStore()

defineProps<{
  products: ProductInterface[]
}>()

async function loadProducts() {
  try {
    await productStore.loadProducts()
  } catch(e) {
    console.error(e)
  }
}
</script>

<template>
  <div v-if="products.length > 0" class="d-flex flex-column">
    <div class="shop-list">
      <ShopProduct
        v-for="product in products"
        :product="product"
        :key="product.id"
      />
    </div>
    <div v-if="products.length && products.length > 0" class="d-flex align-items-center justify-content-center mt-10">
      <button @click="loadProducts()" class="btn btn-primary">Charger plus...</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins' as m;

.shop-list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  @include m.sm {
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
  }
  @include m.md {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  @include m.lg {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  @include m.xl {
    grid-template-columns: repeat(4, 1fr);
    gap: 13px;
  }
  @include m.xxl {
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }
}
</style>
