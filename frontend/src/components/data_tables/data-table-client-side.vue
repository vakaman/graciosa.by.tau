<template>
  <div class="data-table">
    <!-- Search -->
    <div class="table-header">
      <input v-model="search" @input="onSearchChange" type="text" placeholder="Pesquisar..." />
    </div>

    <table>
      <thead>
        <tr>
          <th>
            <input type="checkbox" v-model="allSelected" @change="toggleSelectAll" />
          </th>
          <th v-for="col in columns" :key="col.field">
            {{ col.label }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in paginatedData" :key="row.id">
          <td>
            <input type="checkbox" v-model="selected" :value="row.id" />
          </td>
          <td v-for="col in columns" :key="col.field">
            {{ col.format ? col.format(row[col.field]) : row[col.field] }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="pagination">
      <div class="page-size">
        <label>Itens por página:</label>
        <select v-model="itemsPerPage">
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>

      <div class="page-nav">
        <button :disabled="page === 1" @click="page--">Anterior</button>
        <span>Página {{ page }} de {{ totalPages }}</span>
        <button :disabled="page === totalPages" @click="page++">Próxima</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Column {
  label: string
  field: string
  format?: (value: any) => string
}

const props = defineProps<{
  columns: Column[]
  data: any[]
}>()

const emit = defineEmits(['selectionChange'])

const search = ref('')
const selected = ref<number[]>([])
const allSelected = ref(false)
const page = ref(1)
const itemsPerPage = ref(10)

watch(selected, () => emit('selectionChange', selected.value))
watch(() => props.data, () => {
  selected.value = []
  allSelected.value = false
  page.value = 1
})

const filteredData = computed(() => {
  if (!search.value) return props.data
  return props.data.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(search.value.toLowerCase())
    )
  )
})

const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage.value))

const paginatedData = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value
  return filteredData.value.slice(start, start + itemsPerPage.value)
})

function onSearchChange() {
  page.value = 1
}

function toggleSelectAll() {
  if (allSelected.value) {
    selected.value = paginatedData.value.map((item) => item.id)
  } else {
    selected.value = []
  }
}

watch(filteredData, () => {
  if (page.value > totalPages.value) {
    page.value = totalPages.value || 1
  }
})
</script>

<style scoped>
.data-table {
  margin-top: 20px;
}

.table-header {
  margin-bottom: 15px;
}

input[type="text"] {
  width: 300px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-size select {
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

button {
  padding: 8px 15px;
  background-color: #c94f7c;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
