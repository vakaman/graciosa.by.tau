import axios from 'axios'

const API_URL = '/api/product'

export interface Product {
    id: number
    name: string
    description: string
    categoryId: number
    createdAt: string
    updatedAt: string
}

export interface ProductFilters {
    name?: string
    exactName?: boolean
    description?: string
    exactDescription?: boolean
    categoryId?: number
}

export interface PaginatedResult<T> {
    data: T[]
    total: number
    page: number
    limit: number
}

export interface ProductVariant {
    id: number
    color: string
    size: string
    price: number
    sku: string
    createdAt: string
    updatedAt: string
}

export interface ProductWithVariants {
    id: number
    name: string
    description: string
    categoryId: number
    createdAt: string
    updatedAt: string
    variants: ProductVariant[]
}

export interface VariantDetails {
  id: number
  color: string
  size: string
  sku: string
  prices: {
    id: number
    type: string
    valueInCents: number
    supplierName: string
    createdAt: string
  }[]
}

export async function getVariantDetails(productId: number, variantId: number): Promise<VariantDetails> {
  const response = await axios.get(`${API_URL}/${productId}/variant/${variantId}`)
  return response.data
}

export async function getProductDetails(productId: number): Promise<ProductWithVariants> {
    const response = await axios.get<ProductWithVariants>(`${API_URL}/${productId}/details`)
    return response.data
}

export async function getProductsPaginated(
    page = 1,
    limit = 20,
    filters: ProductFilters = {},
    sort: { field: string; order: string }
): Promise<PaginatedResult<Product>> {
    const params: any = {
        page,
        limit,
        ...filters,
        orderBy: sort.field,
        order: sort.order,
    }

    const response = await axios.get<PaginatedResult<Product>>(`${API_URL}/paginated`, { params })
    return response.data
}

export async function createProduct(
    name: string,
    description: string,
    categoryId: number
): Promise<void> {
    await axios.post(API_URL, { name, description, categoryId })
}
