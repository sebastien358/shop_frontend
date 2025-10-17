import axios from 'axios'

const BASE_URL = 'http://localhost:8000'

export async function axiosGetCommandUser() {
  try {
    const response = await axios.get(`${BASE_URL}/api/command/list`)
    if (response.status >= 200 || response.status < 300) {
      return response.data
    } else {
      throw new Error(`rror recovery commands : ${response.status}`)
    }
  } catch(e) {
    console.log(e)
    throw e
  }
}

export async function axiosAddCommandUser(dataAddress) {
  try {
    const response = await axios.post(`${BASE_URL}/api/command/add`, dataAddress)
    if (response.status >= 200 || response.status < 300) {
      return response.data
    } else {
      throw new Error(`error add command : ${response.status}`)
    }
  } catch(e) {
    console.log(e)
    throw e
  }
}
