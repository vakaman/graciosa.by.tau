import axios from 'axios'

export async function login(email: string, password: string): Promise<string> {
  const response = await axios.post('/api/auth/login', { email, password })
  return response.data.token
}
