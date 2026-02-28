import axios from 'axios'


// create a preconfigured axios instance using a Vite environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:5000',
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let refreshing = false
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config
    if (err.response?.status === 401 && !original._retry && !refreshing) {
      original._retry = true
      refreshing = true
      try {
        const role = localStorage.getItem('role')
        const refreshToken = localStorage.getItem('refreshToken')
        const endpoint = (role === 'admin' || role === 'superadmin')
          ? '/auth/admin/refresh' : '/auth/provider/refresh'
        const { data } = await axios.post('/api/v1' + endpoint, { refreshToken })
        localStorage.setItem('accessToken', data.data.accessToken)
        localStorage.setItem('refreshToken', data.data.refreshToken)
        original.headers.Authorization = 'Bearer ' + data.data.accessToken
        return api(original)
      } catch {
        localStorage.clear()
        window.location.href = '/login'
      } finally { refreshing = false }
    }
    return Promise.reject(err)
  }
)

export default api
