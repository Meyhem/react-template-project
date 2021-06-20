import { ConnectedRouter } from 'connected-react-router'
import { Switch } from 'react-router'
import { AuthRoute, OnlyUnauthRoute } from './components/Route'
import { BucketPage } from './pages/Bucket'
import { DashboardPage } from './pages/Dashboard'
import { LoginPage } from './pages/Login'
import { history } from './utils/history'
import { Routes } from './utils/routes'

export const App = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <OnlyUnauthRoute path="/" exact component={LoginPage} />
      <OnlyUnauthRoute path={Routes.Login} exact component={LoginPage} />
      <AuthRoute path={Routes.Dashboard} exact component={DashboardPage} />
      <AuthRoute path={Routes.Bucket} exact component={BucketPage} />
    </Switch>
  </ConnectedRouter>
)
