import React from 'react'
import styled, { css } from 'styled-components/macro'
import { Input as AntInput } from 'antd'
import { InputProps as AntInputProps } from 'antd/lib/input'
import { SizeType } from 'antd/lib/config-provider/SizeContext'

import { Color, themeColor } from '../../theme'

export type InputProps = AntInputProps & { error?: any; bordered?: boolean; background?: Color }

type InputTransientProps = { $error?: any }

function sizeTypeToIconFontSize(size: SizeType) {
  return { small: '16px', middle: '20px', large: '26px' }[size || 'middle']
}

function sizeToFontSize(size: SizeType) {
  return { small: '12px', middle: '14px', large: '16px' }[size || 'middle']
}

function sizeToPaddingY(size: SizeType) {
  return { small: '4px', middle: '8px', large: '12px' }[size || 'small']
}

const StyledInput = styled(AntInput)<InputProps & InputTransientProps>`
  border-radius: 4px;
  font-size: ${({ size }) => sizeToFontSize(size)};
  padding-top: ${({ size }) => sizeToPaddingY(size)};
  padding-bottom: ${({ size }) => sizeToPaddingY(size)};
  border-width: ${({ bordered }) => (bordered ? '2px' : '1px')};

  ${({ background }) =>
    background &&
    css`
      background: ${themeColor(background)};

      .ant-input {
        background: ${themeColor(background)};
      }
    `}

  & .ant-input::placeholder {
    font-size: ${({ size }) => sizeToFontSize(size)};
  }

  & .ant-input-suffix {
    font-size: ${({ size }) => sizeTypeToIconFontSize(size)};
  }

  &.ant-input-affix-wrapper {
    height: 40px;

    ${({ $error }) =>
      $error &&
      css`
        border: 2px solid ${themeColor('danger')};
      `};
  }

  &.ant-input-affix-wrapper.ant-input-affix-wrapper-lg {
    height: 56px;
  }
`

export const Input = ({ error, ...rest }: InputProps) => {
  return <StyledInput $error={error} {...rest} />
}
