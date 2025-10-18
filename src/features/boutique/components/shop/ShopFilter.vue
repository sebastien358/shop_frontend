<script setup lang="ts">
import { useProductStore } from '@/stores/productStore.ts'

const productStore = useProductStore()

// filtrer search

async function inputSearchTerm() {
  try {
    await productStore.searchProducts(productStore.searchTerm)
  } catch(e) {
    console.error(e)
  }
}

// Filtrer par prix

async function isSelectPriceRance(priceRange: number[]) {
  try {
    await productStore.filteredPrice(priceRange)
    productStore.initPriceRange = priceRange
  } catch(e) {
    console.error(e)
  }
}

// Filtrer par catégorie

async function isSelectCategory(category: string) {
  try {
    await productStore.filteredCategory(category)
    productStore.initCategory = category
  } catch(e) {
    console.error(e)
  }
}

function priceDisplay(priceRange: number[]) {
  return priceRange[0] === 0 ? 'Tous les produits' : priceRange[0] === 2000 ? 'Plus de 2000' : `Entre ${priceRange[0]} et ${priceRange[1]}`
}

function isSelect(priceRange: number[]) {
  return priceRange[0] === productStore.initPriceRange[0] && priceRange[1] === productStore.initPriceRange[1]
}

function resetFilters() {
  productStore.initFilteredProducts()
}
</script>

<template>
  <div class="d-flex flex-column space-between shop-filter">
    <div class="d-flex flex-column flex-fill">
      <!-- Filtration search -->
      <div class="d-flex flex-column shop-filter_search">
        <h4>Rechercher</h4>
        <input @input="inputSearchTerm()" v-model="productStore.searchTerm" type="text" placeholder="Rechercher" />
      </div>
      <!-- Filtrer par prix -->
      <div class="d-flex flex-column shop-filter_price">
        <h4>Filtrer par prix</h4>
        <div v-for="(priceRange, index) in productStore.priceRange" :key="index" class="price-range">
          <input @click="isSelectPriceRance(priceRange)" :checked="isSelect(priceRange)" type="radio" name="priceRange" />
          <span>{{ priceDisplay(priceRange) }}</span>
        </div>
      </div>
      <!-- Filtrer par catégories -->
      <div class="d-flex flex-column shop-filter_category">
        <h4>Filtrer par catégories</h4>
        <p @click="isSelectCategory(category)" v-for="(category, index) in productStore.category" :key="index">
          <span :class="{'active': productStore.initCategory.includes(category)}" class="category">{{ category }}</span>
        </p>
      </div>
    </div>
    <!-- Réinitialisation -->
    <div class="d-flex flex-column shop-filter_reinitialisation">
      <p class="nbr-products">Nombre de produits: <span>{{ productStore.product.length }}</span></p>
      <button @click="resetFilters()" class="btn btn-danger">Réinitialser</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.shop-filter {
  border-right: var(--border);
  padding: 15px 10px 6px 10px;
  min-height: 100%;
  &_search {
    margin-bottom: 20px;
    h4 {
      font-size: 15px;
      margin-bottom: 3px;
    }
    input {
      border: 0;
      border: var(--border);
      padding: 9px;
      outline: none;
    }
  }
  &_price {
    h4 {
      font-size: 15px;
      margin-bottom: 10px;
    }
    .price-range {
      line-height: 30px;
      font-size: 15px;
      span {
        margin-left: 3px;
      };
    }
  }
  &_category {
    margin-top: 14px;
    cursor: pointer;
    line-height: 33px;
    h4 {
      font-size: 15px;
    }
    .active {
      color: var(--success-2);
    }
    .category {
      font-size: 16px;
    }
  }
  &_reinitialisation {
    .nbr-products {
      font-size: 14px;
      margin-bottom: 4px;
      span {
        color: var(--success-2);
      }
    }
  }
}
</style>
