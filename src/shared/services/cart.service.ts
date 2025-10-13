import axios from 'axios'

const BASE_URL = 'http://localhost:8000'

export async function axiosGetProductToCart() {
  try {
    const response = await axios.get(`${BASE_URL}/api/cart/items/list`)
    if (response.status >= 200 || response.status < 300) {
      return response.data
    } else {
      throw new Error('Error cart to items')
    }
  } catch(e) {
    console.error(e)
    throw e
  }
}

export async function axiosAddProductToCart(itemToCart) {
  try {
    const response = await axios.post(`${BASE_URL}/api/cart/to/items`, itemToCart, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch(e) {
    console.error(e)
    throw e
  }
}

export async function axiosDeleteProductToCart(id: number) {
  try {
    const response = await axios.delete(`${BASE_URL}/api/cart/delete/item/${id}`)
    return response.data
  } catch(e) {
    console.error(e)
    throw e
  }
}
