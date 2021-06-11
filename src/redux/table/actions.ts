import { ActionType, createAction } from 'typesafe-actions'
import { Dictionary } from '../../utils/types'
import { ColumnSorting, Identifier, TableKey } from './types'

const setVisibleColumns = createAction('TABLE/SET_VISIBLE_COLUMNS')<{
  tableKey: TableKey
  visibleColumns: Identifier[]
}>()

const setPagination = createAction('TABLE/SET_PAGINATION')<{
  tableKey: TableKey
  pagination: { current: number; total: number; pageSize: number }
}>()

const changePagination = createAction('TABLE/CHANGE_PAGINATION')<{
  tableKey: TableKey
  pagination: { current: number; total: number; pageSize: number }
}>()

const setSorting = createAction('TABLE/SET_SORTING')<{
  tableKey: TableKey
  sorting: Dictionary<ColumnSorting>
}>()

const setSelection = createAction('TABLE/SET_SELECTION')<{
  tableKey: TableKey
  selection: Identifier[]
}>()

const resetTable = createAction('TABLE/RESET')<{
  tableKey: TableKey
}>()

const setPage = createAction('TABLE/set-page')<{
  tableKey: TableKey
  page: number
}>()

export const TableActions = {
  changePagination,
  setVisibleColumns,
  setPagination,
  setSorting,
  setSelection,
  resetTable,
  setPage
}

export type TableActions = ActionType<typeof TableActions>
