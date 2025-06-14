import axios from 'axios'

const API_URL = '/api/product/category'

export interface Category {
  id: number
  name: string
}

export async function getCategories(): Promise<Category[]> {
  const response = await axios.get<Category[]>(API_URL)
  return response.data
}

export async function createCategory(name: string): Promise<void> {
  await axios.post(API_URL, { name })
}

export async function updateCategory(id: number, name: string): Promise<void> {
  await axios.put(`${API_URL}/${id}`, { name })
}

export async function deleteCategory(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`)
}
