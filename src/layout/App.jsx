import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
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
    if (isAuthenticated) {
        return <Redirect to={{
            pathname: "/home"
        }}/>
    }
    return children;
}

function PrivateRoute({ children, ...rest }) {
    const isAuthenticated = useSelector(store => {
        return store.auth.isAuthenticated;
    });
    if (isAuthenticated) {
        return children;
    }
    return <Redirect to={{
        pathname: "/login",
        //state: { from: location }
    }}/>
}

export default App