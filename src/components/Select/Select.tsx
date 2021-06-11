import React from 'react'
import { Select as AntSelect } from 'antd'
import { SelectProps as AntSelectProps, SelectValue } from 'antd/lib/select'
import styled, { DefaultTheme } from 'styled-components/macro'
import _ from 'lodash'

type SizeType = 'small' | 'middle' | 'large' | 'normal'

export type SelectVariants = 'primary' | 'secondary' | 'default'
export type SelectOption = { value: string; label: string }

export interface SelectProps extends React.PropsWithChildren<AntSelectProps<SelectValue>> {
  variant?: SelectVariants
  options?: SelectOption[]
}

export const Option = AntSelect.Option
export const OptionGroup = AntSelect.OptGroup

const selectHeights: Record<SizeType, string> = {
  small: '32px',
  normal: '40px',
  middle: '40px',
  large: '56px'
}

function getSelectBackground(variant: SelectVariants | undefined, theme: DefaultTheme) {
  if (!variant) return theme.colors.primary

  return {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    default: '#fff'
  }[variant]
}

function getSelectBorder(variant: SelectVariants | undefined, theme: DefaultTheme) {
  if (!variant) return theme.colors.primary
  return {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    default: theme.colors.primary
  }[variant]
}

function getSelectColor(variant: SelectVariants | undefined, theme: DefaultTheme) {
  if (!variant) return theme.colors.primary

  return {
    primary: theme.colors.textPrimaryInverse,
    secondary: theme.colors.textPrimaryInverse,
    default: theme.colors.primary
  }[variant]
}

const StyledSelect = styled(AntSelect)<SelectProps>`
  &.ant-select {
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    min-height: ${({ size }) => selectHeights[size || 'normal']};

    .ant-select-selector {
      min-height: ${({ size }) => selectHeights[size || 'normal']};
      border: 1px solid ${({ theme, variant }) => getSelectBorder(variant, theme)};
      border-radius: 4px;
      background-color: ${({ theme, variant }) => getSelectBackground(variant, theme)};
      color: ${({ theme, variant }) => getSelectColor(variant, theme)};
      padding: 0 14px;

      .ant-select-selection-item {
        display: flex;
        align-items: center;
        line-height: ${({ size }) => selectHeights[size || 'normal']};
        background-color: ${({ theme, variant }) => getSelectBackground(variant, theme)};
      }

      .ant-select-selection-placeholder {
        opacity: 1;
        height: ${({ size }) => selectHeights[size || 'normal']};
        line-height: ${({ size }) => selectHeights[size || 'normal']};
        color: ${({ theme, variant }) => getSelectColor(variant, theme)};
        font-weight: bold;
      }
    }
    .ant-select-arrow {
      color: ${({ theme, variant }) => getSelectColor(variant, theme)};
    }

    &.ant-select-disabled {
      opacity: 0.75;

      * {
        cursor: not-allowed !important;
      }

      .ant-select-selector {
        color: rgba(0, 0, 0, 0.65);
      }
    }

    .ant-select-selector {
      border: 1px solid #d9d9d9;
      transition: all 0.3s;

      &:hover {
        border-color: #40a9ff;
      }
    }

    &.ant-select-sm {
      height: 28px;

      .ant-select-selector {
        height: 28px;
      }
    }

    .ant-select-selection-overflow {
      .ant-select-selection-search-input {
        outline-color: transparent;
        border-color: transparent;
      }
    }
  }
`

const defaultProps: SelectProps = {
  variant: 'default'
}

export const Select = ({ children, options, value, onSelect, ...rest }: SelectProps) => {
  return (
    <StyledSelect
      {...defaultProps}
      {..._.omit(rest, 'error')}
      value={_.isEmpty(value) ? undefined : value}
      onSelect={onSelect}
    >
      {!options && children}
      {options &&
        _.map(options, (opt, i) => (
          <Option key={i} value={opt.value} label={opt.label}>
            {opt.label}
          </Option>
        ))}
    </StyledSelect>
  )
}
