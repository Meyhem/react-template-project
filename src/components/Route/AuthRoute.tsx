import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { isUserLoggedIn } from '../../redux/auth/selectors'
import { Routes } from '../../utils/routes'

type Props = {
  component: React.ElementType
} & RouteProps

export const AuthRoute = ({ component: Component, ...rest }: Props) => {
  const loggedIn = useSelector(isUserLoggedIn)

  return (
    <Route
      {...rest}
      render={props => {
        if (!loggedIn) {
          return (
            <Redirect
              to={{
                pathname: Routes.Login
              }}
            />
          )
        }

        return <Component {...props} />
      }}
    />
  )
}
