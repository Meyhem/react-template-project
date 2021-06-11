import React from 'react'

import { Pagination as AntPagination } from 'antd'
import _ from 'lodash'
import styled from 'styled-components/macro'

import { Select, Option } from '../Select'
import { themeColor } from '../../theme'
import { Flex } from '../FlexBox'

export interface PaginationProps {
  current: number
  total: number
  pageSize: number
  showQuickJumper?: boolean
  onChange?(page: number, pageSize?: number): void
}

const StyledPagination = styled(AntPagination)`
  &.ant-pagination {
    .ant-pagination-prev,
    .ant-pagination-next {
      & > .ant-pagination-item-link {
        border: none;
        font-weight: bold;
        /* font-size: 1.2em; */
        color: ${themeColor('textMuted')};

        &:hover {
          color: ${themeColor('primary')};
        }
      }
    }

    display: flex;
    margin: 10px auto;

    .ant-pagination-item {
      border: none;

      > a {
        color: ${themeColor('primary')};
        font-weight: bold;
        font-size: 1.2em;

        &:hover {
          color: ${themeColor('primary')};
        }
      }

      &.ant-pagination-item-active {
        > a {
          color: ${themeColor('primary')};
        }
      }
    }
  }
`

const StyledSelect = styled(Select)`
  width: auto;
  margin-left: auto;
  margin-right: auto;
`

// Renders rel=prev / rel=next on pagination prev/next navigation
const renderSeoFriendlyPaginationNav = (
  _page: number,
  type: 'prev' | 'next' | string,
  original: React.ReactElement<HTMLElement>
): React.ReactNode => {
  if (_.includes(['prev', 'next'], type)) {
    return React.cloneElement(original, { rel: type } as Partial<HTMLButtonElement>)
  }

  return original
}

export const Pagination = ({ current, total, pageSize, showQuickJumper, onChange, ...rest }: PaginationProps) => {
  const numOfPages = _.ceil(total / pageSize)

  return (
    <Flex display="flex" flexWrap="wrap" margin="-10px" alignItems="center" {...rest}>
      <StyledPagination
        current={current}
        total={total}
        pageSize={pageSize}
        showQuickJumper={showQuickJumper}
        onChange={onChange}
        showSizeChanger={false}
        itemRender={renderSeoFriendlyPaginationNav}
      />
      {numOfPages > 1 && (
        <StyledSelect
          variant="primary"
          placeholder="Go to page"
          onChange={v => onChange && onChange(Number(v), pageSize)}
          value={current}
        >
          {_.times(numOfPages, i => (
            <Option key={i + 1} value={i + 1}>
              {i + 1}
            </Option>
          ))}
        </StyledSelect>
      )}
    </Flex>
  )
}
