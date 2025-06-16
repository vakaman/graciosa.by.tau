import type { CellModifier, ColumnModifier, RowModifier } from "./types"

export interface DataTableProps {
  columns: ColumnModifier[]
  data: any[]
  totalItems: number
  itemsPerPage: number
  currentPage: number
  sortField: string
  sortOrder: 'asc' | 'desc'
  rowModifier?: RowModifier
  cellModifiers?: CellModifier[]
}