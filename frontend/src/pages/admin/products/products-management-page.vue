<template>
  <div class="products-page">
    <h1>Gerenciamento de Produtos</h1>

    <div class="actions">
      <button v-if="!isCreating" @click="isCreating = true">Novo Produto</button>
      <button v-else @click="isCreating = false">Voltar</button>
    </div>

    <transition name="fade" mode="out-in">
      <div v-if="!isCreating" key="list" class="products-list">

        <div class="filters">
          <input v-model="filters.name" placeholder="Filtrar por nome" @input="handleFilterChange" />
          <input v-model="filters.description" placeholder="Filtrar por descrição" @input="handleFilterChange" />
          <select v-model="filters.categoryId" @change="handleFilterChange">
            <option value="">Todas as categorias</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>

        <DataTable
          :columns="columns"
          :data="products"
          :totalItems="total"
          :itemsPerPage="itemsPerPage"
          :currentPage="currentPage"
          :sortField="sort.field"
          :sortOrder="sort.order"
          :rowModifier="rowModifier"
          :cellModifiers="cellModifiers"
          @pageChange="handlePageChange"
          @sortChange="handleSortChange"
        />
      </div>

      <div v-else key="form" class="product-form">
        <h2>Novo Produto</h2>
        <form @submit.prevent="submitForm">
          <div><label>Nome:</label><input v-model="productName" type="text" required /></div>
          <div><label>Descrição:</label><textarea v-model="productDescription" required /></div>
          <div>
            <label>Categoria:</label>
            <select v-model="productCategoryId" required>
              <option disabled value="">Selecione uma categoria</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>
          <button type="submit" class="button button-create">Salvar Produto</button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCategories, type Category } from '@/services/category-service'
import { createProduct, getProductsPaginated, type Product } from '@/services/product.service'
import DataTable from '@/components/data_tables/data-table-server-side.vue'
import { notifySuccess } from '@/services/notification-service'
import type { ColumnModifier, RowModifier, CellModifier } from '@/components/data_tables/types.ts'

type SortOrder = 'asc' | 'desc'

const isCreating = ref(false)
const productName = ref('')
const productDescription = ref('')
const productCategoryId = ref<number | null>(null)

const categories = ref<Category[]>([])
const products = ref<Product[]>([])
const total = ref(0)

const itemsPerPage = 10
const currentPage = ref(1)
const sort = ref<{ field: string; order: SortOrder }>({ field: 'createdAt', order: 'desc' })

const filters = ref<{ name?: string; description?: string; categoryId?: number | string }>({
  name: '',
  description: '',
  categoryId: ''
})

const columns: ColumnModifier[] = [
  { label: 'ID', field: 'id' },
  { label: 'Nome', field: 'name' },
  { label: 'Descrição', field: 'description' },
  { label: 'Categoria', field: 'categoryId', format: (value: number) => getCategoryName(value) }
]

const rowModifier: RowModifier = {
  link: (row: Product) => `/admin/products/${row.id}/manage`
}

const cellModifiers: CellModifier[] = [
  {
    appliesTo: (column, _row) => column.field === 'name',
    transform: (value, _column, row) => value
  }
]

async function fetchCategories() {
  categories.value = await getCategories()
}

async function fetchProducts() {
  const result = await getProductsPaginated(
    currentPage.value,
    itemsPerPage,
    {
      name: filters.value.name || undefined,
      description: filters.value.description || undefined,
      categoryId: filters.value.categoryId ? Number(filters.value.categoryId) : undefined
    },
    sort.value
  )
  products.value = result.data
  total.value = result.total
}

async function submitForm() {
  if (productCategoryId.value == null) return
  await createProduct(productName.value, productDescription.value, productCategoryId.value)
  notifySuccess(`Produto "${productName.value}" cadastrado com sucesso!`)
  productName.value = ''
  productDescription.value = ''
  productCategoryId.value = null
  isCreating.value = false
  await fetchProducts()
}

function handlePageChange(page: number) {
  currentPage.value = page
  fetchProducts()
}

function handleSortChange(newSort: { field: string; order: SortOrder }) {
  sort.value = newSort
  fetchProducts()
}

function handleFilterChange() {
  currentPage.value = 1
  fetchProducts()
}

function getCategoryName(categoryId: number): string {
  const category = categories.value.find(c => c.id === categoryId)
  return category ? category.name : 'N/A'
}

onMounted(async () => {
  await fetchCategories()
  await fetchProducts()
})
</script>

<style scoped>
.products-page { padding: 20px; }
.actions { margin-bottom: 20px; }
.filters { margin-bottom: 20px; display: flex; gap: 10px; }
.filters input, .filters select {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
button {
  padding: 10px 20px;
  background-color: #c94f7c;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;
}
</style>
