import { ConnectedRouter } from 'connected-react-router'
import { Switch } from 'react-router'

import { history } from './utils/history'
import { Routes } from './routes'
import { LoadingFallback } from './components/Loading'
import { Route } from './components/Route'
import { importLazy } from './utils/import'

const Home = importLazy(() => import('./pages/Home'))

export const App = () => (
  <ConnectedRouter history={history}>
    <LoadingFallback>
      <Switch>
        <Route path={Routes.Home} exact component={Home} />
      </Switch>
    </LoadingFallback>
  </ConnectedRouter>
)
