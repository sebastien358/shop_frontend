<script setup lang="ts">
import Shop from '@/features/boutique/components/shop/Shop.vue'
import Cart from '@/features/boutique/components/cart/Cart.vue'
import { computed, onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore.ts'
import { useCartStore } from '@/stores/cartStore.ts'

const productStore = useProductStore()

const products = computed(() => productStore.product)

async function loadProducts() {
  try {
    await productStore.getProduct()
  } catch(e) {
    console.error(e)
  }
}

onMounted(async () => {
  try {
    await loadProducts()
  } catch(e) {
    console.error(e)
  }
})

// Récupératiopn du panier

const cartStore = useCartStore()

const cart = computed(() => cartStore.cart)

async function loadProductToCart() {
  try {
    await cartStore.getProductToCart()
  } catch(e) {
    console.error(e)
  }
}

onMounted(async () => {
  try {
    await loadProductToCart()
  } catch(e) {
    console.error(e)
  }
})
</script>

<template>
  <div class="boutique">
    <Shop
      :products="products"
    />
    <Cart
      :cart="cart"
      :total="cartStore.total"
      :itemToCart="cartStore.itemsToCartExisting"
    />
  </div>
</template>

<style scoped lang="scss">
</style>
