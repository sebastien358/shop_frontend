import { defineStore } from 'pinia'
import {
  axiosFilteredCategoryProducts,
  axiosFilteredPriceProducts,
  axiosGetProducts,
  axiosSearchProducts,
} from '@/shared/services/product.service.ts'

interface ProductState {
  product: object,
  isLoading: boolean,
  searchTerm: string,
  priceRange: [[number, number], [number, number], [number, number], [number, number], [number, number]],
  initPriceRange: [number, number],
  category: [string, string, string, string],
  initCategory: [string],
  offset: number,
  limit: number
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    product: [],
    isLoading: true,
    searchTerm: '',
    priceRange: [[0, 4000], [500, 1000], [1000, 1500], [1500, 2000], [2000, 4000]],
    initPriceRange: [0, 4000],
    category: ['all', 'desktop', 'gamer', 'streaming'],
    initCategory: ['all'],
    offset: 0,
    limit: 20
  }),
  actions: {
    async getProduct(append = false): Promise<void> {
      try {
        this.isLoading = true
        const response = await axiosGetProducts(this.offset, this.limit)
        if (response) {
          const products = Array.isArray(response) ? response : [response]
          this.product = append ? [...this.product, ...products] : products
        } else {
          console.log('La response est vide')
        }
      } catch(e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    async loadProducts(): Promise<true | undefined> {
      try {
        this.offset += this.limit
        await this.getProduct(true)
        return true
      } catch(e) {
        console.error(e)
      }
    },
    async searchProducts(search: string): Promise<void> {
      try {
        const response = await axiosSearchProducts(search)
        if (response) {
          this.product = response
        } else {
          this.product = []
        }
      } catch(e) {
        console.error(e)
      }
    },
    async filteredPrice(priceRange: number[]): Promise<void> {
      try {
        const [ minPrice, maxPrice ] = priceRange
        const response = await axiosFilteredPriceProducts(minPrice, maxPrice)
        if (response) {
          this.product = response
        } else {
          this.product = []
        }
      } catch(e) {
        console.error(e)
      }
    },
    async filteredCategory(category: string): Promise<void> {
      try {
        const response = await axiosFilteredCategoryProducts(category)
        if (category === 'all') {
          await this.getProduct()
        } else if(response) {
          this.product = response
        } else {
          this.product = []
        }
      } catch(e) {
        console.error(e)
      }
    },
    async initFilteredProducts(): Promise<void> {
      try {
        this.searchTerm = ''
        this.initPriceRange = [0, 4000]
        this.initCategory = ['all']
        this.offset = 0
        await this.getProduct()
      } catch(e) {
        console.error(e)
      }
    }
  }
})
