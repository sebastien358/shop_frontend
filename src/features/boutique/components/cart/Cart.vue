<script setup lang="ts">
import CartProductList from '@/features/boutique/components/cart/CartProductList.vue'
import { computed, reactive } from 'vue'
import { useAuthStore } from '@/stores/authStore.ts'
import { useRouter } from 'vue-router'

const state = reactive<{
  open: boolean
}>({
  open: false
})

const props = defineProps<{
  cart: any
  total: number
  itemsToCartExisting: number
}>()

// gestion des roles et redirection

const authStore = useAuthStore()
const router = useRouter()

function toGoCommand() {
  if (authStore.roleUser() && props.cart.length > 0) {
    router.push({path: '/command'})
  } else if(authStore.roleUser() && props.cart.length === 0) {
    router.push({path: '/boutique'})
  } else {
    router.push({path: '/login'})
  }
}
</script>

<template>
  <div class="cart-fixed">
    <div @click="state.open = true" v-if="!state.open" class="toggle-cart">
      <div class="nbr-products"><span>{{ cart.length }}</span></div>
      <font-awesome-icon icon="fa-solid fa-basket-shopping" />
    </div>
    <div v-else class="d-flex flex-column cart">
      <h4>Panier</h4>
      <span :class="cart.length > 0 ? 'product-data' : 'no-product'">{{ itemsToCartExisting }}</span>
      <CartProductList :cart="cart" />
      <button @click="toGoCommand()" class="btn btn-success"> Commander ({{ total }})€</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@mixin displayCenter {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-fixed {
  position: fixed;
  bottom: 20px;
  right: 20px;
  .toggle-cart {
    cursor: pointer;
    position: relative;
    height: 70px;
    width: 70px;
    background-color: var(--primary-1);
    border-radius: 50%;
    @include displayCenter();
    .nbr-products {
      position: absolute;
      height: 13px;
      width: 13px;
      border-radius: 50%;
      background-color: var(--danger-1);
      @include displayCenter();
      top: 0;
      right: 8px;
    }
    .nbr-products span {
      color: var(--text-primary-color);
      font-size: 9px;
    }
    .fa-basket-shopping {
      color: var(--text-primary-color);
      font-size: 17px;
    }
  }
  .cart {
    width: 530px;
    padding: 10px 10px 5px 10px;
    border: var(--border);
    background-color: var(--text-primary-color);
    h4 {
      margin-bottom: 10px;
    }
    button {
      margin-top: 6px;
    }
    .product-data, .no-product {
      margin-bottom: 10px;
      text-align: center;
    }
    .product-data {
      font-size: 13px;
      color: var(--success-2);
    }
    .no-product {
      font-weight: 500;
      font-size: 13px;
      color: var(--danger-1);
    }
  }
}
</style>
