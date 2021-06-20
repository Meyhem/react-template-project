import _ from 'lodash'
import { createGlobalStyle, css, DefaultTheme, FlattenInterpolation, ThemedStyledProps } from 'styled-components/macro'

export const theme = {
  colors: {
    primary: '#0278d3',
    secondary: '#02d3be',
    info: '#17a2b8',
    success: '#28a745',
    warning: '#ff7400',
    danger: '#dc3545',

    bgPrimary: '#f9f9f9',
    bgSecondary: '#E0E0E0',

    borderPrimary: '#CACACA',
    borderSecondary: 'rgba(128, 128, 128, 0.5)',

    textPrimary: 'black',
    textSecondary: '#222',
    textMuted: '#a2a2a2',
    textPrimaryInverse: 'white'
  },
  fontSizes: {
    small: '12px',
    normal: '14px',
    medium: '16px',
    large: '24px',
    extraLarge: '32px'
  },
  breakpoints: ['768px', '1024px', '1920px'],
  space: ['0px', '8px', '16px', '24px', '32px', '40px']
}

export type Color = keyof DefaultTheme['colors']
export type FontSize = keyof DefaultTheme['fontSizes']
export type TitleFontSize = keyof DefaultTheme['fontSizes']
export type Spaces = number
export type Breakpoints = 0 | 1 | 2

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    font-family: 'JetBrains Mono';
    font-size: ${({ theme }) => theme.fontSizes.small};
    font-weight: normal;
    width: 100%;
    height: 100%;
    margin: 0;
    color: ${({ theme }) => theme.colors.textPrimary};
    display: flex;
  }
`

export function themeColor(color: Color): (p: ThemedStyledProps<unknown, DefaultTheme>) => string {
  return ({ theme }) => theme.colors[color]
}

export function themeSpace(space: Spaces): (p: ThemedStyledProps<unknown, DefaultTheme>) => string {
  return ({ theme }) => theme.space[space]
}

export function themeFontSize(size: FontSize): (p: ThemedStyledProps<unknown, DefaultTheme>) => string {
  return ({ theme }) => theme.fontSizes[size]
}

export function brkmax(
  max: Breakpoints | string,
  styles: FlattenInterpolation<ThemedStyledProps<unknown, DefaultTheme>>
) {
  if (_.isString(max)) {
    return css`
      @media (max-width: ${max}) {
        ${styles}
      }
    `
  }

  return css`
    @media (max-width: ${theme.breakpoints[max]}) {
      ${styles}
    }
  `
}
