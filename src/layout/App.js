import React, { Component } from 'react';
//import Header from './Header';
//import Sidebar from './Sidebar';
import Main from './Main';
import Login from '../views/auth/Login';
import auth from '../auth';
import api from '../api';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useLocation
} from "react-router-dom";

const routes = [
    {
        path: "/login",
        exact: true,
        secureInnerRoute: true,
        component: Login
    },
    {
        path: "*",
        exact: true,
        authRequired: true,
        component: Main,
        routes: [
            {
                path: "/",
                exact: true,
                component: Home
            },
            {
                path: "/home",
                exact: true,
                component: Home
            },
            {
                path: "/*",
                component: NoMatch
            }
        ]
    }
];

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    {routes.map((route, i) => {
                        if (route.secureInnerRoute) {
                            return (
                                <SecureInnerRoute path={route.path} key={i}>
                                    <RouteWithSubRoutes key={i} {...route} />
                                </SecureInnerRoute>
                            );
                        }
                        else if (route.authRequired) {
                            return (
                                <PrivateRoute path={route.path} key={i}>
                                    <RouteWithSubRoutes key={i} {...route} />
                                </PrivateRoute>
                            );
                        }
                        else {
                            return (
                                <RouteWithSubRoutes key={i} {...route} />
                            );
                        }
                    })}
                </Switch>
            </Router>
        );
    }
}

function SecureInnerRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.isAuthenticated() ? (
                  <Redirect
                    to={{
                      pathname: "/home"
                    }}
                  />
                ) : (
                  children
                )
            }
        />
    );
}

function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.isAuthenticated() ? (
                  children
                ) : (
                  <Redirect
                    to={{
                      pathname: "/login",
                      state: { from: location }
                    }}
                  />
                )
            }
        />
    );
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

function Home() {
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    Home
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <h2>Home page</h2>
                </div>
            </section>
        </>
    );
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default App;