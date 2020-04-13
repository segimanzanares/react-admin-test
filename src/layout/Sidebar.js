import React, {Component} from 'react';

export default class Sidebar extends Component {
    render() {
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="#" className="brand-link">
                  <img src="AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3"
                       style={{opacity: .8}} />
                  <span className="brand-text font-weight-light">AdminLTE 3</span>
                </a>
                <div className="sidebar">
                  
                  <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                      <img src="avatar.png" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                      <a href="#" className="d-block">Alexander Pierce</a>
                    </div>
                  </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                          <li className="nav-item has-treeview menu-open">
                            <a href="#" className="nav-link active">
                              <i className="nav-icon fas fa-tachometer-alt"></i>
                              <p>
                                Dashboard
                                <i className="right fas fa-angle-left"></i>
                              </p>
                            </a>
                            <ul className="nav nav-treeview">
                              <li className="nav-item">
                                <a href="./index.html" className="nav-link active">
                                  <i className="far fa-circle nav-icon"></i>
                                  <p>Dashboard v1</p>
                                </a>
                              </li>
                              <li className="nav-item">
                                <a href="./index2.html" className="nav-link">
                                  <i className="far fa-circle nav-icon"></i>
                                  <p>Dashboard v2</p>
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }
}