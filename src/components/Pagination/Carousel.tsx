import React from 'react'

import { Carousel as AntCarousel } from 'antd'
import { CarouselProps as AntCarouselProps } from 'antd/lib/carousel'
import styled from 'styled-components/macro'
import { themeColor } from '../../theme'

export type CarouselProps = React.PropsWithChildren<AntCarouselProps>

const StyledCarousel = styled(AntCarousel)`
  padding-bottom: 80px;

  .slick-dots {
    &.slick-dots-bottom {
      bottom: 0;
    }

    > li {
      width: auto;
      height: auto;
      transform: rotate(45deg);
      margin-left: 10px;
      margin-right: 10px;

      &.slick-active {
        width: auto;
        > button {
          background: ${themeColor('secondary')};
          border: none;
        }
      }

      > button {
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 2px;
        border: 1px solid ${themeColor('primary')};
        opacity: 1;
      }
    }
  }
`

export const Carousel = ({ children, ...rest }: CarouselProps) => {
  return <StyledCarousel {...rest}>{children}</StyledCarousel>
}
