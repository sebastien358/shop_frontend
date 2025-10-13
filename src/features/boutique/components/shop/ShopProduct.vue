<script setup lang="ts">

import { useCartStore } from '@/stores/cartStore.ts'

const cartStore = useCartStore()

const props = defineProps<{
  product: string
}>()

async function addProductToCart(id: number) {
  try {
    await cartStore.addProductToCart(id)
  } catch(e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="d-flex flex-column shop-product">
    <div class="shop-product_image">
      <img src="@/assets/images/3030285.webp" class="img-product" />
      <div class="shop-product_content">
        <h3>{{ props.product.title }}</h3>
        <p>{{ props.product.description }}</p>
        <div class="d-flex align-items-center space-between">
          <p>Prix:{{ props.product.price }}€</p>
          <button @click="addProductToCart(props.product.id)" class="btn btn-primary">
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.shop-product {
  border: var(--border);
  border-radius: var(--border-radius);
  background-color: var(--text-primary-color);
  &_image .img-product {
    border-bottom: var(--border);
    border-top-right-radius: var(--border-radius);
    border-top-left-radius: var(--border-radius);
    height: 350px;
  }
  &_content {
    padding: 10px;
    h3 {
      font-size: 15px;
      margin-bottom: 10px;
    }
    p {
      font-size: 14px;
      margin-bottom: 10px;
    }
  }
}
</style>
