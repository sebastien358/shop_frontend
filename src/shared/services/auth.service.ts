import axios from 'axios'
import { useAuthStore } from '@/stores/authStore.ts'

const BASE_URL = 'http://localhost:8000'

export async function axiosLogin(dataLogin) {
  try {
    const { email, password } = dataLogin
    const response = await axios.post(`${BASE_URL}/api/login_check`, {
      username: email,
      password
    })
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error('Error registration user')
    }
  } catch(e) {
    console.error(e)
    throw e
  }
}

export async function axiosMeInfo() {
  try {
    const response = await axios.get(`${BASE_URL}/api/user/me`)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error('Error recovery user info')
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}

// Récupération d'un utilisateur

export async function axiosGetCurrentUserId(id: number) {
  try {
    const response = await axios.get(`${BASE_URL}/api/user/${id}`)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error('Error recovery user info')
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}

export async function axiosRegister(dataRegister) {
  try {
    const { email, password } = dataRegister
    const response = await axios.post(`${BASE_URL}/api/register`, {
      email,
      password
    })
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error('Error registration user')
    }
  } catch(e) {
    console.error(e)
    throw e
  }
}

export async function axiosEditUser(dataRegister, id: number) {
  try {
    const { email, password } = dataRegister
    const response = await axios.post(`${BASE_URL}/api/user/edit/${id}`, {
      email,
      password
    })
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error('Error registration user')
    }
  } catch(e) {
    console.error(e)
    throw e
  }
}

export async function axiosEmailExistingLogin(dataLogin) {
  try {
    const { email } = dataLogin
    const response = await axios.post(`${BASE_URL}/api/user/email/existing`, {
      email
    })
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error('Error email existing login user')
    }
  } catch(e) {
    console.error(e)
    throw e
  }
}

export async function axiosEmailExistingRegister(dataRegister) {
  try {
    const { email } = dataRegister
    const response = await axios.post(`${BASE_URL}/api/user/email/existing`, {
      email
    })
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error('Error email existing register user')
    }
  } catch(e) {
    console.error(e)
    throw e
  }
}

export async function axiosEmailExistingRequestPassword(dataRequestPassword) {
  try {
    const { email } = dataRequestPassword
    const response = await axios.post(`${BASE_URL}/api/user/email/existing`, {
      email
    })
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error('Error email existing reset password user')
    }
  } catch(e) {
    console.error(e)
    throw e
  }
}

export async function axiosRequestPassword(email) {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/request-password`, {
      email: email
    })
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error('Error reset password')
    }
  } catch(e) {
    console.error(e)
    throw e
  }
}

export async function axiosResetPassword(dataResetPassword, token) {
  try {
    const { password } = dataResetPassword
    const response = await axios.post(`${BASE_URL}/api/user/reset-password/${token}`, {
      password
    })
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error('Error reset password')
    }
  } catch(e) {
    console.error(e)
    throw e
  }
}

const authMiddleWare = (config) => {
  const authStore = useAuthStore()
  const token = authStore.token
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  }
  return config
}

axios.interceptors.request.use(authMiddleWare)



