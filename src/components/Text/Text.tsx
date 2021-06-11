import { Box, BoxProps } from '../FlexBox'
import styled from 'styled-components/macro'
import { Color } from '../../theme'

const StyledText = styled(Box)`
  color: ${({ color, theme }) => (color ? theme.colors[color as Color] : 'inherit')};
`

export type TextProps = {
  block?: boolean
  bold?: boolean
} & BoxProps

export const Text = ({ children, block, bold, color, ...rest }: TextProps) => {
  return (
    <StyledText
      as={block ? 'div' : 'span'}
      fontWeight={bold ? 'bold' : undefined}
      color={color || 'textPrimary'}
      {...rest}
    >
      {children}
    </StyledText>
  )
}
