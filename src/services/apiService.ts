import axios from 'axios'
import store from '../store'

const apiService = axios.create({
  baseURL: 'https://iapitest.eva.guru',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Function to refresh the access token
async function refreshAccessToken() {
  const refreshToken = store.state.auth.refreshToken
  if (!refreshToken) {
    throw new Error('No refresh token available')
  }

  const response = await axios.post('https://iapitest.eva.guru/oauth/refresh', {
    refreshToken
  })

  const newAccessToken = response.data.Data.AccessToken
  store.commit('auth/SET_ACCESS_TOKEN', newAccessToken)
  return newAccessToken
}

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

// Add a response interceptor
apiService.interceptors.response.use(
  (response) => response,
  async (error) => {
    /* 
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const newAccessToken = await refreshAccessToken()
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return apiService(originalRequest)
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
        // Optionally, handle logout or redirect to login
      }
    } */

    return Promise.reject(error)
  }
)

export default apiService 