import { defineStore } from 'pinia'
import { useProductStore } from '@/stores/productStore.ts'
import { axiosAddProductToCart, axiosDeleteProductToCart, axiosGetProductToCart } from '@/shared/services/cart.service.ts'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: []
  }),
  getters: {
    itemsToCartExisting(state) {
      return state.cart.length > 0 ? 'Liste des produits' : 'Le panier est vide...'
    },
    total(state) {
      const initialValue = 0
      return state.cart.reduce((acc, product) => acc + product.price * product.quantity, initialValue)
    }
  },
  actions: {
    async getProductToCart() {
      try {
        const response = await axiosGetProductToCart()
        if (response) {
          this.cart = Array.isArray(response) ? response : [response]
          console.log(this.cart)
        } else {
          console.log('La response est vide')
        }
      } catch(e) {
        console.error(e)
      }
    },
    async addProductToCart(id: number) {
      try {
        const productStore = useProductStore()
        const product = productStore.product.find((p) => p.id === id)
        if (product) {
          const itemToCart = {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1
          }
          await axiosAddProductToCart([itemToCart])
          await this.getProductToCart()
        }
      } catch(e) {
        console.error(e)
      }
    },
    async deleteProductToCart(id: number) {
      try {
        const itemToCart = this.cart.find((p) => p.id === id)
        if (itemToCart) {
          await axiosDeleteProductToCart(id)
          await this.getProductToCart()
        }
      } catch(e) {
        console.error(e)
      }
    }
  }
})
