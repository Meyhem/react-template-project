import { createCachedSelector } from 're-reselect'
import { createSelector } from 'reselect'
import { paramSelector } from '../../utils/selectors'
import { RootState } from '../types'
import { TableKey } from './types'

type WithTableKey = { tableKey: TableKey }

const selectState = (state: RootState) => state.table

const selectTable = createCachedSelector(
  selectState,
  paramSelector<WithTableKey>(),
  (table, { tableKey }) => table[tableKey]
)((_state, { tableKey }) => tableKey)

export const selectVisibleColumns = createSelector(selectTable, t => t.visibleColumns)

export const selectPagination = createSelector(selectTable, t => t.pagination)

export const selectSorting = createSelector(selectTable, t => t.sorting)

export const selectSelection = createSelector(selectTable, t => t.rowSelection)
