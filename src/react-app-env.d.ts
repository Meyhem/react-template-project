/// <reference types="react-scripts" />

declare module '*.png'
declare module '*.svg'
declare module '*.json' {
  const content: any
  export default content
}

declare module '@fvilers/disable-react-devtools' {
  export const disableReactDevTools: () => void
}

import { theme } from './theme'

type ThemeInterface = typeof theme

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeInterface {}
}

import { RootState } from './redux/types'
declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultRootState extends RootState {}
}
