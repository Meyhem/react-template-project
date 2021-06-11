import { useContext } from 'react'
import { useTheme } from 'styled-components/macro'
import _ from 'lodash'

import {
  ViewportSizeContext,
  ViewportDimensions as ImportedViewportDimensions
} from '../components/ViewPortSizeContextProvider'

export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'wide'

export type ViewportDimensions = ImportedViewportDimensions & {
  device: DeviceType
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isWide: boolean
}

export function useViewportSize(): undefined | ViewportDimensions {
  const theme = useTheme()
  const viewPort = useContext(ViewportSizeContext)

  if (!viewPort) return undefined

  // @ts-ignore
  const pixelValueBreakpoints = _.map(theme.breakpoints, b => parseInt(b, 10))

  const isMobile = viewPort.viewportWidth < pixelValueBreakpoints[0]
  const isTablet = !isMobile && viewPort.viewportWidth < pixelValueBreakpoints[1]
  const isDesktop = !isMobile && !isTablet && viewPort.viewportWidth < pixelValueBreakpoints[2]
  const isWide = !isMobile && !isTablet && !isDesktop && viewPort.viewportWidth >= pixelValueBreakpoints[2]
  const device: DeviceType = (isMobile && 'mobile') || (isTablet && 'tablet') || (isDesktop && 'desktop') || 'wide'

  return {
    ...viewPort,
    isMobile,
    isTablet,
    isDesktop,
    isWide,
    device
  }
}
