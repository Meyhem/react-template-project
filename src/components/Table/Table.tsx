import React from 'react'
import _ from 'lodash'
import { ConfigProvider, Table as AntTable } from 'antd'
import { TableProps as AntTableProps, ColumnType as AntColumnType } from 'antd/lib/table'
import styled from 'styled-components/macro'
import { SorterResult, TableRowSelection } from 'antd/lib/table/interface'
import { themeColor, themeFontSize, themeSpace } from '../../theme'
import { Pagination, PaginationProps } from '../Pagination'
import { Dictionary } from '../../utils/types'
import { Flex } from '../FlexBox'
import { DownOutlined, UpOutlined } from '../Icons'

export type ColumnSorting = { order: 'ascend' | 'descend' }

/**
 * selectable - can be chosen in visibility selector
 *
 * fixed - shown in visibility selector as disabled and always selected
 *
 * non-selectable - not shown in visibility selector
 */
export type VisibilityType = 'selectable' | 'fixed' | 'non-selectable'
export interface ColumnType extends AntColumnType<any> {
  id: string
  visibilityType?: VisibilityType
  defaultHidden?: boolean
}

export interface TableProps<T> extends Omit<AntTableProps<T>, 'pagination' | 'rowSelection'> {
  columns: ColumnType[]
  visibleColumns?: string[]
  pagination?: PaginationProps
  sorting?: Dictionary<ColumnSorting>
  rowSelection?: string[]
  maxVisibleColumns?: number
  renderActions?(): JSX.Element
  onPaginationChange?(page: number, pageSize: number, total: number): void
  onSortingChange?(sorting: Dictionary<ColumnSorting>): void
  onRowSelectionChange?(keys: React.ReactText[]): void
  renderEmpty?: (componentName?: string) => React.ReactNode
}

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${themeColor('borderPrimary')};
  border-radius: 4px;
  padding-bottom: ${themeSpace(1)};
`

const ActionArea = styled.div`
  display: flex;
  padding: ${themeSpace(1)};
  border-bottom: 1px solid ${themeColor('borderPrimary')};
`

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
`

const StyledTable = styled(AntTable)`
  &.ant-table-wrapper {
    width: 100%;
    padding: ${themeSpace(2)};

    .ant-table {
      .ant-table-thead {
        border: 1px solid black;
        > tr > th {
          color: ${themeColor('primary')};
          font-weight: bold;
          background: ${themeColor('bgPrimary')};
        }
      }

      .ant-table-column-sorter {
        display: none;
      }
    }
  }

  .ant-table-cell {
    font-size: ${themeFontSize('small')};
  }

  th.ant-table-cell {
    user-select: none;
  }

  td.break-all {
    word-break: break-all;
  }
` as React.ComponentType as new <T>() => React.Component<AntTableProps<T>>

function filterColumnsByVisibility(columns: ColumnType[], visibleColumns?: string[]) {
  return _.isUndefined(visibleColumns) || _.isEmpty(visibleColumns)
    ? // eslint-disable-next-line lodash/prefer-reject
      _.filter(columns, c => !c.defaultHidden)
    : _.filter(
        columns,
        c => _.includes(visibleColumns, c.id) || _.includes(['fixed', 'non-selectable'], c.visibilityType)
      )
}

function mergeSortConfig(columns: ColumnType[], sorting?: Dictionary<ColumnSorting>) {
  if (!sorting) return columns

  return _.map(columns, col => {
    const colSortConfig = sorting[col.id]
    if (!colSortConfig) return col

    return { ...col, sortOrder: colSortConfig.order }
  })
}

function addSortingIcon(columns: ColumnType[]) {
  return _.map(columns, col => ({
    ...col,
    title: (
      <Flex alignItems="center">
        {col.title}
        {col.sorter && (
          <Flex
            ml={1}
            flexDirection="column"
            justifyContent="center"
            fontSize={_.isUndefined(col.sortOrder) ? '0.5em' : 'auto'}
            pr={_.isUndefined(col.sortOrder) ? '7px' : '0'}
          >
            {(_.isUndefined(col.sortOrder) || col.sortOrder === 'ascend') && (
              <UpOutlined color={col.sortOrder === 'ascend' ? 'primary' : 'primaryLighter'} />
            )}
            {(_.isUndefined(col.sortOrder) || col.sortOrder === 'descend') && (
              <DownOutlined color={col.sortOrder === 'descend' ? 'primary' : 'primaryLighter'} />
            )}
          </Flex>
        )}
      </Flex>
    )
  }))
}

function limitColumnCount(columns: ColumnType[], limit?: number) {
  if (_.isUndefined(limit)) return columns

  return _.take(columns, limit)
}

export const Table = <T extends object>({
  visibleColumns,
  columns,
  pagination,
  sorting,
  rowSelection,
  maxVisibleColumns,
  renderActions,
  onPaginationChange,
  onSortingChange,
  onRowSelectionChange,
  renderEmpty,
  ...rest
}: TableProps<T>) => {
  columns = filterColumnsByVisibility(columns, visibleColumns)
  columns = limitColumnCount(columns, maxVisibleColumns)
  columns = mergeSortConfig(columns, sorting)
  columns = addSortingIcon(columns)

  const selection: TableRowSelection<any> | undefined = rowSelection
    ? {
        selectedRowKeys: rowSelection || [],
        onChange: onRowSelectionChange || _.noop
      }
    : undefined

  return (
    <TableContainer>
      {renderActions && <ActionArea>{renderActions()}</ActionArea>}
      <ConfigProvider renderEmpty={renderEmpty}>
        <StyledTable<T>
          pagination={false}
          columns={columns}
          rowSelection={selection}
          onChange={(_pagination, _filters, sorter) => {
            if (_.isObject(sorter)) {
              const singleSort = sorter as SorterResult<object>
              const id = _.get(sorter, 'column.id')
              let newSortState = {}

              if (!_.isUndefined(id)) {
                newSortState = { [id]: { order: singleSort.order } }
              }

              onSortingChange && onSortingChange(newSortState)
            }
            // TODO: If multi sort is required, implement logic for _.isArray(sorter)
          }}
          {...rest}
        />
      </ConfigProvider>
      {pagination && pagination.total !== 0 && (
        <StyledPagination
          {...pagination}
          onChange={(page, pageSize) => onPaginationChange && onPaginationChange(page, pageSize || 0, pagination.total)}
        />
      )}
    </TableContainer>
  )
}
