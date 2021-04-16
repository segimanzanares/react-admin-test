import React from 'react';
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
    let location = useLocation();
    const isActiveRoute = (paths) => {
        return paths.indexOf(location.pathname) !== -1;
    };
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="#" className="brand-link">
                <img src="/AdminLTELogo.png" alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{ opacity: .8 }} />
                <span className="brand-text font-weight-light">AdminLTE 3</span>
            </a>
            <div className="sidebar">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className={'nav-item has-treeview ' + (isActiveRoute(["/home", "/test"]) ? 'menu-open' : '')}>
                            <a href="#" className={'nav-link ' + (isActiveRoute(["/home", "/test"]) ? 'active' : '')}>
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Dashboard
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <NavLink to="/home" className="nav-link" activeClassName="active">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Home</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/test" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Otro</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/users" className="nav-link">
                                <i className="fas fa-users nav-icon"></i>
                                <p>Usuarios</p>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar