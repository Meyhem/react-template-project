/* eslint-disable max-classes-per-file */
import React from 'react'

export type ViewportDimensions =
  | {
      viewportHeight: number
      viewportWidth: number
    }
  | undefined

export const ViewportSizeContext = React.createContext<ViewportDimensions>({
  viewportHeight: 0,
  viewportWidth: 0
})

type Props = {
  children: React.ReactNode
}

type State = {
  size?: ViewportDimensions
}

export class ViewportSizeContextProvider extends React.PureComponent<Props, State> {
  state: State = {
    size: undefined
  }

  componentDidMount() {
    window.addEventListener('resize', this.setViewport)

    this.setViewport()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setViewport)
  }

  setViewport = () => {
    this.setState({
      size: {
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth
      }
    })
  }

  render() {
    const { children } = this.props
    const { size } = this.state
    return <ViewportSizeContext.Provider value={size}>{children}</ViewportSizeContext.Provider>
  }
}

export const ViewportSizeContextConsumer = ViewportSizeContext.Consumer
