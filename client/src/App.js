import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';

import store from './store';
import { setUser, logOut } from './store/actions/authActions';
import setAuthToken from './utils/setAuthToken';

import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Settings from './components/layout/Settings';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const token = localStorage.jwtToken;
  if (token) {
    setAuthToken(token);

    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) { // Token expired
      store.dispatch(logOut());
      window.location.href = '/login';
    } else {
      store.dispatch(setUser(decoded));
    }
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <ProtectedRoute exact path="/settings" component={Settings} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
