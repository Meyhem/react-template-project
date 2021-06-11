import styled from 'styled-components/macro'
import {
  space,
  layout,
  typography,
  color,
  flexbox,
  border,
  SpaceProps,
  LayoutProps,
  TypographyProps,
  ColorProps,
  FlexboxProps,
  BorderProps
} from 'styled-system'

type StyledProps = SpaceProps & LayoutProps & TypographyProps & ColorProps & FlexboxProps & BorderProps

export type BoxProps = React.PropsWithChildren<
  Omit<StyledProps & JSX.IntrinsicElements['div'], keyof React.ClassAttributes<any>> & {
    as?: React.ElementType
  }
>

export const Box = styled.div<BoxProps>`
  box-sizing: 'border-box';
  min-width: 0;

  ${space};
  ${layout};
  ${typography};
  ${color};
  ${flexbox};
  ${border}
`
