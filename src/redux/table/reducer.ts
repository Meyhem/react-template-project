import { getType } from 'typesafe-actions'
import { TableActions } from './actions'
import { TableConfig, TableKey, TableState } from './types'

const initialTableConfig = (pageSize?: number) => ({
  pagination: { current: 1, total: 0, pageSize: pageSize || 10 },
  rowSelection: [],
  sorting: {},
  visibleColumns: undefined
})

const initialState: TableState = {
  [TableKey.TestTable]: initialTableConfig()
}

const updateTableConfig = (state: TableState, tkey: TableKey, config: Partial<TableConfig>) => ({
  ...state,
  [tkey]: { ...state[tkey], ...config }
})

export const reducer = (state: TableState = initialState, action: TableActions): TableState => {
  switch (action.type) {
    case getType(TableActions.setVisibleColumns):
      return updateTableConfig(state, action.payload.tableKey, { visibleColumns: action.payload.visibleColumns })

    case getType(TableActions.setPagination):
    case getType(TableActions.changePagination):
      return updateTableConfig(state, action.payload.tableKey, {
        pagination: {
          ...action.payload.pagination
        }
      })
    case getType(TableActions.setSorting):
      return updateTableConfig(state, action.payload.tableKey, {
        sorting: action.payload.sorting
      })

    case getType(TableActions.setSelection):
      return updateTableConfig(state, action.payload.tableKey, {
        rowSelection: action.payload.selection
      })

    case getType(TableActions.resetTable):
      return updateTableConfig(state, action.payload.tableKey, initialState[action.payload.tableKey])

    case getType(TableActions.setPage):
      return updateTableConfig(state, action.payload.tableKey, {
        pagination: {
          ...state[action.payload.tableKey].pagination,
          current: action.payload.page
        }
      })
    default:
      return state
  }
}
