import axios from 'axios'

const BASE_URL = 'http://localhost:8000'

export async function axiosGetProducts(offset: number, limit: number) {
  try {
    const response = await axios.get(`${BASE_URL}/api/product/list`, {
      params: {
        offset,
        limit
      }
    })
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function axiosSearchProducts(search: string) {
  try {
    const response = await axios.get(`${BASE_URL}/api/product/search`, {
      params: {
        search
      }
    })
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function axiosFilteredPriceProducts(minPrice: number, maxPrice: number) {
  try {
    const response = await axios.get(`${BASE_URL}/api/product/filtered/price`, {
      params: {
        minPrice,
        maxPrice
      }
    })
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function axiosFilteredCategoryProducts(category: string) {
  try {
    const response = await axios.get(`${BASE_URL}/api/product/filtered/category`, {
      params: {
        category
      }
    })
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
