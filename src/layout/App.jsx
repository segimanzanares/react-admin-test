import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import RouteWithSubRoutes from '../utils/RouteWithSubRoutes';
import routes from '../routes';

const App = () => {
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

function SecureInnerRoute({ children, ...rest }) {
    const isAuthenticated = useSelector(store => {
        return store.auth.isAuthenticated;
    });
    let location = useLocation();
    if (isAuthenticated) {
        let redirectTo = location.state && location.state.from ? location.state.from.pathname : "/home"
        return <Redirect to={{
            pathname: redirectTo
        }}/>
    }
    return children;
}

function PrivateRoute({ children, ...rest }) {
    const isAuthenticated = useSelector(store => {
        return store.auth.isAuthenticated;
    });
    let location = useLocation();
    if (isAuthenticated) {
        return children;
    }
    return <Redirect to={{
        pathname: "/login",
        state: { from: location }
    }}/>
}

export default App