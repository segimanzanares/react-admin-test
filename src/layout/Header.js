import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useHistory, useLocation } from "react-router-dom";
import auth from '../auth';

export default function Header() {
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/login" } };
    const logout = function() {
        auth.logout(() => history.replace(from))
    }
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a className="nav-link" role="button" href="#" ref={ref}
               onClick={(e) => {
                   e.preventDefault();
                   onClick(e);
               }}>
          {children}
        </a>
    ));
    const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
            return (
                <ul ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
                    {React.Children.toArray(children)}
                </ul>
            );
        },
    );
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars"></i></a>
                </li>
            </ul>
            <div className="navbar-nav ml-auto">
                <Dropdown className="nav-item user-menu">
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                        <img src="/avatar.png" className="user-image img-circle elevation-2" alt="User"/>
                        <span className="d-none d-md-inline mr-2">Segi Manzanares</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu as={CustomMenu} className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <li className="user-header bg-primary">
                            <img src="/avatar.png" className="img-circle elevation-2" alt="User"/>
                            <p>
                                Segi Manzanares
                                <small>Miembro desde 2020</small>
                            </p>
                        </li>

                        <li className="user-footer">
                            <a href="#" className="btn btn-default btn-flat">Profile</a>
                            <a href="#" className="btn btn-default btn-flat float-right" 
                                   onClick={(e) => {
                                       e.preventDefault();
                                       logout();
                                   }}>Logout</a>
                        </li>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </nav>
    );
}
