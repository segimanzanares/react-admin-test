import React, { Component } from 'react';
//import Header from './Header';
//import Sidebar from './Sidebar';
import Main from './Main';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const routes = [
    {
        path: "/login",
        component: Login
    },
    {
        path: "",
        exact: true,
        component: Main,
        routes: [
            {
                path: "/home",
                component: Home
            }
        ]
    }
];

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    {routes.map((route, i) => (
                      <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </Router>
        );
    }
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
  return <h2>Login</h2>;
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

export default App;