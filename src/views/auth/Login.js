import React, {Component} from 'react';
import auth from '../../auth';
import {
    Redirect
} from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false
        };
    }

    login() {
        auth.login();
        this.setState({
            authenticated: true
        });
    }
    
    render() {
        document.getElementsByTagName('body')[0].classList = ['login-page'];
        return !this.state.authenticated ? (
            <div className="login-box">
                <div className="login-logo">
                    <img src="/logo192.png" alt="Logo" />
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <div className="alert alert-danger">
                            <strong>error</strong>
                        </div>
                        <form ref="form">
                            <div className="form-group">
                                <label>E-mail</label>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" name="email" 
                                           v-model="email" required autoFocus
                                           v-bind-classNName="{ 'is-invalid': errors.email }" />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope"></span>
                                        </div>
                                    </div>
                                    <span className="invalid-feedback" role="alert" v-if="errors.email !== null">
                                        <strong v-for="msg in errors.email">msg</strong>
                                    </span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <div className="input-group mb-3">
                                    <input type="password" className="form-control" 
                                           name="password" v-model="password" required
                                           v-bind-classNName="{ 'is-invalid': errors.password }" />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock"></span>
                                        </div>
                                    </div>
                                    <span className="invalid-feedback" role="alert" v-if="errors.password !== null">
                                        <strong v-for="msg in errors.password">msg</strong>
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="remember" v-model="remember" />
                                        <label htmlFor="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <button type="button" className="btn btn-primary btn-block" onClick={() => this.login()}>Login</button>
                                </div>
                            </div>
                            <p className="mb-1">
                                <router-link to="/password/reset">
                                    I forgot my password
                                </router-link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        ) : (
            <Redirect
                to={{
                  pathname: "/home"
                }}
              />
        );
    }
}
