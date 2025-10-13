<script setup lang="ts">
import ShopProductList from '@/features/boutique/components/shop/ShopProductList.vue'
import ShopFilter from '@/features/boutique/components/shop/ShopFilter.vue'

defineProps<{
  products: products[]
}>()
</script>

<template>
  <div class="shop">
    <div>
      <ShopFilter class="shop-filter" />
    </div>
    <div>
      <ShopProductList :products="products" class="shop-product-list" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins' as m;

.shop {
  display: grid;
  grid-template-columns: 240px 1fr;
  .shop-product-list {
    overflow-y: auto;
    height: calc(100vh - 96px);
    padding: 10px;
    @include m.sm {
      padding: 10px;
    }
    @include m.md {
      padding: 10px;
    }
    @include m.lg {
      padding: 15px 15px 10px 15px;
    }
    @include m.xl {
      padding: 13px 13px 10px 13px;
    }
    @include m.xxl {
      padding: 15px 15px 10px 15px;
    }
  }
}
</style>
