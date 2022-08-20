import apiClient from 'services/axios'
import store from 'store'

export async function addProduct(payload) {
  return apiClient
    .post('/products/', { ...payload })
    .then(response => {
      if (response) {
        console.log("🚀 ~ file: index.js ~ line 9 ~ addProduct ~ response", response)
        return response.data
      }
      return false;
    })
    .catch(err => console.log(err))
}

export async function getProductsByCategory(id) {
  return apiClient
    .get(`/categories/${id}`)
    .then(response => {
      return response ? response.data.products : false;
    })
    .catch(err => console.log(err))
}

export async function getProducts() {
  return apiClient
    .get(`/products/`)
    .then(response => {
      return response ? response.data.data : false;
    })
    .catch(err => console.log(err))
}