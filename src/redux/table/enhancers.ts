import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { ColumnSorting, Identifier, TableKey } from './types'
import { RootState } from '../types'
import { selectPagination, selectSelection, selectSorting, selectVisibleColumns } from './selectors'
import { TableActions } from './actions'
import { Dictionary } from '../../utils/types'

export const withColumnVisibility = (tableKey: TableKey) =>
  connect(
    (state: RootState) => ({
      visibleColumns: selectVisibleColumns(state, { tableKey })
    }),
    (d: Dispatch) => ({
      onSelectionChange: (visibleColumns: string[]) => d(TableActions.setVisibleColumns({ tableKey, visibleColumns }))
    })
  )

export const withPagination = (tableKey: TableKey) =>
  connect(
    (state: RootState) => ({
      pagination: selectPagination(state, { tableKey })
    }),
    (d: Dispatch) => ({
      onPaginationChange: (current: number, pageSize: number, total: number) => {
        d(TableActions.changePagination({ tableKey: tableKey, pagination: { current, pageSize, total } }))
      }
    })
  )

export const withSorting = (tableKey: TableKey) =>
  connect(
    (state: RootState) => ({
      sorting: selectSorting(state, { tableKey })
    }),
    (d: Dispatch) => ({
      onSortingChange: (sorting: Dictionary<ColumnSorting>) =>
        d(TableActions.setSorting({ tableKey: tableKey, sorting }))
    })
  )

export const withRowSelection = (tableKey: TableKey) =>
  connect(
    (state: RootState) => ({
      rowSelection: selectSelection(state, { tableKey })
    }),
    (d: Dispatch) => ({
      onRowSelectionChange: (selection: Identifier[]) => d(TableActions.setSelection({ tableKey: tableKey, selection }))
    })
  )
