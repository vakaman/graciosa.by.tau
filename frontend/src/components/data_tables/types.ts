export interface ColumnModifier {
  label: string
  field: string
  format?: (value: any, row?: any) => string
}

export interface RowModifier {
  link?: (row: any) => string
}

export interface CellModifier {
  appliesTo: (column: ColumnModifier, row: any) => boolean
  transform: (value: any, column: ColumnModifier, row: any) => any
}