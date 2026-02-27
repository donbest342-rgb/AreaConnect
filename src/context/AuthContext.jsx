import { createContext, useContext, useState, useCallback } from 'react'
import api from '../api/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  })
  const [role, setRole]   = useState(() => localStorage.getItem('role') || null)
  const [loading, setLoading] = useState(false)

  const saveSession = (userData, roleStr, accessToken, refreshToken) => {
    localStorage.setItem('user',         JSON.stringify(userData))
    localStorage.setItem('role',         roleStr)
    localStorage.setItem('accessToken',  accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    setUser(userData)
    setRole(roleStr)
  }

  const logout = useCallback(async () => {
    try {
      const r = localStorage.getItem('role')
      const endpoint = (r === 'admin' || r === 'superadmin')
        ? '/auth/admin/logout' : '/auth/provider/logout'
      await api.post(endpoint)
    } catch {}
    localStorage.clear()
    setUser(null)
    setRole(null)
  }, [])

  const loginProvider = async (email, password) => {
    setLoading(true)
    try {
      const { data } = await api.post('/auth/provider/login', { email, password })
      const d = data.data
      saveSession(d.provider, 'provider', d.accessToken, d.refreshToken)
      return { ok: true }
    } catch (err) {
      return { ok: false, message: err.response?.data?.message || 'Login failed' }
    } finally { setLoading(false) }
  }

  const loginAdmin = async (email, password) => {
    setLoading(true)
    try {
      const { data } = await api.post('/auth/admin/login', { email, password })
      const d = data.data
      saveSession(d.admin, d.admin.role, d.accessToken, d.refreshToken)
      return { ok: true }
    } catch (err) {
      return { ok: false, message: err.response?.data?.message || 'Login failed' }
    } finally { setLoading(false) }
  }

  const registerProvider = async (formData) => {
    setLoading(true)
    try {
      const { data } = await api.post('/auth/provider/register', formData)
      const d = data.data
      saveSession(d.provider, 'provider', d.accessToken, d.refreshToken)
      return { ok: true }
    } catch (err) {
      return { ok: false, message: err.response?.data?.message || 'Registration failed', errors: err.response?.data?.errors }
    } finally { setLoading(false) }
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, loginProvider, loginAdmin, registerProvider, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
