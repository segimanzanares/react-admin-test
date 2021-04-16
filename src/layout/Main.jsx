import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Switch } from "react-router-dom";
import RouteWithSubRoutes from '../utils/RouteWithSubRoutes';

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
