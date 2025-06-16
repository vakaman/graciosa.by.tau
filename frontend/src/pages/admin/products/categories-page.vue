<template>
  <div class="categories-page">
    <h1>Cadastro de Categorias</h1>
    <form @submit.prevent="submitCategory">
      <input v-model="name" type="text" placeholder="Nome da Categoria" required />
      <button type="submit" class="button button-create">Salvar Categoria</button>
    </form>
    <hr>
    <h2>Listagem de Categorias</h2>
    <DataTableClient :columns="columns" :data="categories" @selectionChange="updateSelected" />
    <button @click="deleteSelected" :disabled="selectedIds.length === 0" class="button button-delete"> Deletar
      Selecionados </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DataTableClient from '@/components/data_tables/data-table-client-side.vue'
import { getCategories, createCategory, deleteCategory, type Category } from '@/services/category-service'
import { notifyError, notifySuccess } from '@/services/notification-service'
import { formatDate } from '@/utils/date-formatter'

const name = ref('')
const categories = ref<Category[]>([])
const selectedIds = ref<number[]>([])

const columns = [
  { label: 'ID', field: 'id' },
  { label: 'Nome', field: 'name' },
  { label: 'Data de criação', field: 'createdAt', format: (value: string) => formatDate(value, 'dd/MM/yyyy HH:mm:ss') }
]

async function loadCategories() {
  try {
    categories.value = await getCategories()
  } catch (error) {
    console.error('Erro ao buscar categorias', error)
    notifyError('Erro ao buscar categorias')
  }
}

async function submitCategory() {
  try {
    await createCategory(name.value)
    name.value = ''
    await loadCategories()
    notifySuccess('Categoria cadastrada com sucesso!')
  } catch (error) {
    console.error('Erro ao cadastrar categoria', error)
    notifyError('Erro ao cadastrar categoria')
  }
}

async function deleteSelected() {
  try {
    for (const id of selectedIds.value) {
      await deleteCategory(id)
    }
    await loadCategories()
    selectedIds.value = []
    notifySuccess('Categorias deletadas com sucesso!')
  } catch (error) {
    console.error('Erro ao deletar categorias', error)
    notifyError('Erro ao deletar categorias')
  }
}

function updateSelected(ids: number[]) {
  selectedIds.value = ids
}

onMounted(() => {
  loadCategories()
})
</script>
<style scoped>
.categories-page {
  padding: 20px;
  max-width: 700px;
}

.actions {
  margin: 20px 0;
  text-align: right;
}
</style>
