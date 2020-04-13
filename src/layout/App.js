import React, { Component } from 'react';
//import Header from './Header';
//import Sidebar from './Sidebar';
import Main from './Main';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
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

const fakeAuth = {
    isAuthenticated: () => {
        return localStorage.getItem('isAuthenticated') == 1;
    },
    authenticate(cb) {
        localStorage.setItem('isAuthenticated', 1);
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        localStorage.setItem('isAuthenticated', 0);
        setTimeout(cb, 100);
    }
};

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
                fakeAuth.isAuthenticated() ? (
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
                fakeAuth.isAuthenticated() ? (
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

function Login() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
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