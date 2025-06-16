<template>
  <div class="data-table">
    <table>
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.field" @click="sortBy(col.field)" class="sortable">
            {{ col.label }}
            <span v-if="sortField === col.field">
              {{ sortOrder === 'asc' ? '▲' : '▼' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data" :key="row.id" @click="handleRowClick(row)" class="clickable-row">
          <td v-for="col in columns" :key="col.field">
            <span v-html="renderCell(col, row)"></span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">Anterior</button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">Próxima</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { ColumnModifier, RowModifier, CellModifier } from '@/components/data_tables/types'

const props = defineProps<{
  columns: ColumnModifier[]
  data: any[]
  totalItems: number
  itemsPerPage: number
  currentPage: number
  sortField: string
  sortOrder: 'asc' | 'desc'
  rowModifier?: RowModifier
  cellModifiers?: CellModifier[]
}>()

const emit = defineEmits(['pageChange', 'sortChange'])
const router = useRouter()

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

function changePage(newPage: number) {
  emit('pageChange', newPage)
}

function sortBy(field: string) {
  const newOrder = props.sortField === field && props.sortOrder === 'asc' ? 'desc' : 'asc'
  emit('sortChange', { field, order: newOrder })
}

function handleRowClick(row: any) {
  if (props.rowModifier?.link) {
    router.push(props.rowModifier.link(row))
  }
}

function renderCell(column: ColumnModifier, row: any): string {
  let value = column.format ? column.format(row[column.field], row) : row[column.field]

  for (const modifier of props.cellModifiers || []) {
    if (modifier.appliesTo(column, row)) {
      value = modifier.transform(value, column, row)
    }
  }

  return value
}
</script>
<style scoped>
.data-table {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
}

th,
td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th.sortable {
  cursor: pointer;
}

tr.clickable-row {
  cursor: pointer;
  transition: background 0.2s;
}

tr.clickable-row:hover {
  background-color: #f7f7f7;
}

.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  padding: 8px 15px;
  background-color: #c94f7c;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
