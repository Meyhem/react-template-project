import styled from 'styled-components/macro'
import { Box, BoxProps } from './Box'

export type FlexProps = BoxProps

const StyledFlex = styled(Box)`
  display: flex;
`

export const Flex = ({ children, ...rest }: FlexProps) => {
  return <StyledFlex {...rest}>{children}</StyledFlex>
}
