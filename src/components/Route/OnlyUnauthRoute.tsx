import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { isUserLoggedIn } from '../../redux/auth/selectors'
import { Routes } from '../../utils/routes'

type Props = RouteProps

export const OnlyUnauthRoute = ({ ...rest }: Props) => {
  const loggedIn = useSelector(isUserLoggedIn)
  return loggedIn ? <Redirect to={Routes.Dashboard} /> : <Route {...rest} />
}
