import React from 'react'
import { Button as AntButton } from 'antd'
import { ButtonHTMLType } from 'antd/lib/button/button'
import styled, { DefaultTheme } from 'styled-components/macro'
import _ from 'lodash'
import { Dictionary } from '../../utils/types'

type SizeType = 'small' | 'middle' | 'large'

type ButtonVariants = 'default' | 'primary' | 'secondary' | 'transparent'
type IconPlacement = 'left' | 'right'

export interface ButtonProps {
  variant?: ButtonVariants
  size?: SizeType
  block?: boolean
  onClick?: (e: any) => void
  children?: React.ReactNode
  htmlType?: ButtonHTMLType
  disabled?: boolean
  icon?: React.ReactNode
  iconPlacement?: IconPlacement
  padding?: string
  loading?: boolean | { delay?: number }
}
const backgroundColors: Record<ButtonVariants, string> = {
  default: 'white',
  primary: 'primary',
  secondary: 'secondary',
  transparent: 'transparent'
}

const disabledBackgroundColors: Record<ButtonVariants, string> = {
  default: 'white',
  primary: 'primaryLighter',
  secondary: 'secondaryLighter',
  transparent: 'transparent'
}

const activeBackgroundColors: Record<ButtonVariants, string> = {
  default: 'primaryLighter',
  primary: 'primaryDarker',
  secondary: 'secondaryDarker',
  transparent: 'transparent'
}

const textColors: Record<ButtonVariants, string> = {
  default: 'primary',
  primary: 'buttonTextPrimary',
  secondary: 'buttonTextSecondary',
  transparent: 'primary'
}

const disabledTextColors: Record<ButtonVariants, string> = {
  default: 'primaryLighter',
  primary: 'buttonTextPrimary',
  secondary: 'buttonTextSecondary',
  transparent: 'primary'
}

const activeTextColors: Record<ButtonVariants, string> = {
  default: 'primary',
  primary: 'buttonTextPrimary',
  secondary: 'buttonTextSecondary',
  transparent: 'primary'
}

const heights: Record<SizeType, string> = {
  small: '28px',
  middle: '40px',
  large: '56px'
}

const fontSizes: Record<SizeType, string> = {
  small: '12px',
  middle: '14px',
  large: '16px'
}

const iconSizes: Record<SizeType, string> = {
  small: '14px',
  middle: '20px',
  large: '24px'
}

const getColorByType = (colors: Dictionary<string>, theme: DefaultTheme, variant: ButtonVariants = 'default') => {
  const color = colors[variant] ? colors[variant] : 'primary'
  // @ts-ignore
  return theme.colors[color] || color
}

const StyledButton = styled(AntButton)<ButtonProps>`
  border: none;
  font-weight: bold;
  padding: ${({ padding }) => padding || '3px 20px'};
  box-shadow: none;
  border-radius: 4px;
  &[ant-click-animating-without-extra-node]:after {
    animation: none;
  }

  color: ${({ variant, theme }) => getColorByType(textColors, theme, variant)};
  background-color: ${({ variant, theme }) => getColorByType(backgroundColors, theme, variant)};
  height: ${({ size }) => heights[size || 'middle']};
  font-size: ${({ size }) => fontSizes[size || 'middle']};

  display: flex;
  flex-direction: row;
  align-items: center;

  &[disabled] {
    color: ${({ variant, theme }) => getColorByType(disabledTextColors, theme, variant)};
    background-color: ${({ variant, theme }) => getColorByType(disabledBackgroundColors, theme, variant)};

    &:hover,
    &:active,
    &:focus {
      color: ${({ variant, theme }) => getColorByType(disabledTextColors, theme, variant)};
      background-color: ${({ variant, theme }) => getColorByType(disabledBackgroundColors, theme, variant)};
    }
  }

  &:active:hover:not([disabled]) {
    color: ${({ variant, theme }) => getColorByType(activeTextColors, theme, variant)};
    background-color: ${({ variant, theme }) => getColorByType(activeBackgroundColors, theme, variant)};
  }

  &:focus,
  &:hover {
    color: ${({ variant, theme }) => getColorByType(textColors, theme, variant)};
    background-color: ${({ variant, theme }) => getColorByType(backgroundColors, theme, variant)};
  }
`

const Icon = styled.span<{ size?: SizeType; iconPlacement: IconPlacement; noMargin: boolean }>`
  display: flex;
  font-size: ${({ size }) => iconSizes[size || 'middle']};
  margin-inline-start: ${({ iconPlacement, noMargin }) => (iconPlacement === 'right' && !noMargin ? '8px' : 'initial')};
  margin-inline-end: ${({ iconPlacement, noMargin }) => (iconPlacement === 'left' && !noMargin ? '8px' : 'initial')};
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
`

export const Button = ({ children, icon, iconPlacement, variant = 'default', ...rest }: ButtonProps) => {
  return (
    <StyledButton variant={variant} type="default" {...rest}>
      <ButtonContent>
        {icon && iconPlacement === 'left' && (
          <Icon size={rest.size} iconPlacement={iconPlacement || 'right'} noMargin={!children}>
            {icon}
          </Icon>
        )}
        {children}
        {icon && (_.isUndefined(iconPlacement) || iconPlacement === 'right') && (
          <Icon size={rest.size} iconPlacement={iconPlacement || 'right'} noMargin={!children}>
            {icon}
          </Icon>
        )}
      </ButtonContent>
    </StyledButton>
  )
}
