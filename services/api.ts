import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Create Axios instance
const api = axios.create({
  baseURL: 'https://adinathjewellery.in/api/',
  //baseURL: 'http://192.168.2.100/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to attach token
api.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        config.headers.Authorization = token
      }
    } catch (error) {
      console.error('Error retrieving auth token:', error)
    }
    return config
  },
  error => Promise.reject(error)
)

// Function to manually set the auth header (can be used in App.js)
export const setAuthHeader = async (token : any) => {
  try {
    const authToken = token || (await AsyncStorage.getItem('token'))
    if (authToken) {
      api.defaults.headers.common.Authorization = authToken
    }
  } catch (error) {
    console.error('Error setting auth header:', error)
  }
}

// Response interceptor to handle token refresh
api.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response?.status
    const originalRequest = error.config

    // 🔁 Only retry if status is 401 or 409 and we haven't retried yet
    if ((status === 401 || status === 409) && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken')
        const UserName = await AsyncStorage.getItem('user')

        const refreshResponse = await axios.post('https://msuresh.co.in/api/auth/refresh', {
          refreshToken,
          UserName,
        })

        const newToken = refreshResponse.data.tokens
        const newRefreshToken = refreshResponse.data.refreshToken

        // Store new tokens
        await AsyncStorage.setItem('token', newToken)
        await AsyncStorage.setItem('refreshToken', newRefreshToken)

        // Set new token to header
        originalRequest.headers.Authorization = newToken

        return api(originalRequest) // Retry original request
      } catch (refreshError) {
        await AsyncStorage.multiRemove(['token', 'refreshToken', 'user'])
        console.error('Token refresh failed:', refreshError)

        // Remove invalid tokens and user info

        // Optionally, trigger logout or redirect here
        return Promise.reject(refreshError)
      }
    }

    // Don't refresh on 400 or other errors
    return Promise.reject(error)
  }
)

// Optional: Call this once in App.js before any API calls
// ;(async () => {
//   await setAuthHeader(tokens)
// })()

export default api