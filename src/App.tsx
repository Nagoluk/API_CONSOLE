import React from 'react';
import store from './store/toolkit/store'
import {Provider} from 'react-redux';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'antd/dist/antd.css';


import LoginPage from './containers/LoginPage';
import { Console } from './containers/ConsolePage';

function App() {
  return (
    <Router>
      <Provider store={store}>
          <Switch>
            <Route path="/" exact>
              <LoginPage />
            </Route>

            <Route path="/console">
              <Console/>
            </Route>
          </Switch>
      </Provider>
    </Router>
  );
}

export default App;
