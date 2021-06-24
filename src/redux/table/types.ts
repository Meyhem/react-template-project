import { Dictionary } from '../../utils/types'

export enum TableKey {
  TestTable = 'TestTable'
}

export type Identifier = string

export type SortOrder = 'ascend' | 'descend'

export interface ColumnSorting {
  order: SortOrder
}

export interface PaginationConfig {
  current: number
  total: number
  pageSize: number
}

export interface TableConfig {
  sorting: Dictionary<ColumnSorting>
  visibleColumns?: Identifier[]
  rowSelection: Identifier[]
  pagination: PaginationConfig
}

export type TableState = Record<TableKey, TableConfig>
