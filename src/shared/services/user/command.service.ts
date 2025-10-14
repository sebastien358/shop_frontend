import axios from 'axios'

const BASE_URL = 'http://localhost:8000'

export async function axiosAddCommandUser(dataAddress) {
  try {
    console.log(dataAddress)
    const response = await axios.post(`${BASE_URL}/api/command/add`, dataAddress)
    if (response.status >= 200 || response.status < 300) {
      return response.data
    } else {
      throw new Error('error add command')
    }
  } catch(e) {
    console.log(e)
    throw e
  }
}
