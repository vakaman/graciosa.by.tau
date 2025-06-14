import axios from 'axios'

export async function login(email: string, password: string): Promise<string> {
  const response = await axios.post('/api/account/login', { email, password })
  return response.data.token
}

export function isAuthenticated(): boolean {
  const token = localStorage.getItem('jwt')
  return !!token
}

export function logout(): void {
  localStorage.removeItem('jwt')
}