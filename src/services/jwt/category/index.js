import apiClient from 'services/axios'
import store from 'store'

// export async function login(email, password) {
//   return apiClient
//     .post('/auth/token/', {
//       email,
//       password,
//     })
//     .then(response => {
//       if (response) {
//         const { access } = response.data
//         if (access) {
//           store.set('accessToken', access)
//         }
//         return response.data
//       }
//       return false
//     })
//     .catch(err => console.log(err))
// }

export async function login(email, password) {
  return apiClient
    .post('/auth/token/', {
      email,
      password,
    })
    .then(response => {
      if (response) {
        const { access } = response.data
        if (access) {
          store.set('accessToken', access)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function getCategories() {
  return apiClient
    .get(`/categories`)
    .then(response => {
      return response ? response.data : false;
    })
    .catch(err => console.log(err))
}