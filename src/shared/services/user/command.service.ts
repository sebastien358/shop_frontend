import axios from 'axios'

const BASE_URL = 'http://localhost:8000'

// Affichage de la commande au paiment

export async function axiosGetCommandUser() {
  try {
    const response = await axios.get(`${BASE_URL}/api/command/user`)
    if (response.status >= 200 || response.status < 300) {
      return response.data
    } else {
      throw new Error(`Error recovery command payment : ${response.status}`)
    }
  } catch(e) {
    console.log(e)
    throw e
  }
}

// Affichage de la liste des commandes d'un utilisateur

export async function axiosGetCommandUserList() {
  try {
    const response = await axios.get(`${BASE_URL}/api/command/user/list`)
    if (response.status >= 200 || response.status < 300) {
      return response.data
    } else {
      throw new Error(`Error recovery commands user : ${response.status}`)
    }
  } catch(e) {
    console.log(e)
    throw e
  }
}

// Récupération d'une commande pour modifier les données utilisateur

export async function axiosGetCurrentUserId(id: number) {
  try {
    const response = await axios.get(`${BASE_URL}/api/command/user/${id}`)
    if (response.status >= 200 || response.status < 300) {
      return response.data
    } else {
      throw new Error(`Error recovery command payment : ${response.status}`)
    }
  } catch(e) {
    console.log(e)
    throw e
  }
}

// Passer une commande utilidateur

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

// Éditer via command les données utilisateur = adresse, ect...

export async function axiosEditCommandUserAddress(dataAddress, id) {
  try {
    const response = await axios.post(`${BASE_URL}/api/command/edit/${id}`, dataAddress)
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
