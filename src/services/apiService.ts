import axios from 'axios'
import store from '../store'

const apiService = axios.create({
  baseURL: 'https://iapitest.eva.guru',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor
apiService.interceptors.request.use(
  (config) => {
    const token = store.state.auth.accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default apiService 