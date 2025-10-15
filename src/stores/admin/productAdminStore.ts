import { defineStore } from 'pinia'
import { axiosAddProductAdmin } from '@/shared/services/admin/productAdmin.service.ts'
import { useProductStore } from '@/stores/productStore.ts'

export const useProductAdminStore = defineStore('productAdmin', {
  state: () => ({
    product: []
  }),
  actions: {
    async addAdminProduct(dataProduct): Promise<void> {
      try {
        const { title, price, description, category, images } = dataProduct
        const formData = new FormData()
        formData.append('title', title)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('category', category)
        if (images.length && images.length > 0) {
          images.forEach((image) => {
            formData.append('filename[]', image)
          })
        }
        const response = await axiosAddProductAdmin(formData)
        if (response) {
          const productStore = useProductStore()
          this.product.push(response)
          productStore.product.push(response)
          return response
        }
      } catch(e) {
        console.log(e)
      }
    }
  }
})
