import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import {
    Switch,
    Route
} from "react-router-dom";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: []
        };
    }
  render() {
    document.getElementsByTagName('body')[0].classList = ['sidebar-mini', 'layout-fixed'];
    return (
      <div>
        <Header />
        <Sidebar />
        <div className="content-wrapper">
            <Switch>
                {this.props.routes.map((route, i) => (
                  <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
        </div>
      </div>
    );
  }
};

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

export default Main;