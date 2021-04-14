import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Switch, Route } from "react-router-dom";


export default function Main(props) {
    document.getElementsByTagName('body')[0].classList = ['sidebar-mini', 'layout-fixed'];
    return (
        <div>
            <Header />
            <Sidebar />
            <div className="content-wrapper">
                <Switch>
                    {props.routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </div>
        </div>
    );
};

function RouteWithSubRoutes(route) {
    return (
        <Route path={route.path}
            render={props => (
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}
