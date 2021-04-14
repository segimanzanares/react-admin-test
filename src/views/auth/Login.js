import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { performLogin } from '../../actions/auth';

const Login = (props) => {
    const isAuthenticated = useSelector(store => {
        console.log(store);
        return store.auth.isAuthenticated;
    })

    React.useEffect(() => {
        console.log(isAuthenticated)
        if (isAuthenticated) {
            props.history.push('/home');
        }
    }, [isAuthenticated, props.history])

    const dispatch = useDispatch()
    const { register, handleSubmit, errors, setError } = useForm();
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [errorMessage, setErrorMessage] = useState(null);
    const login = function (data) {
        dispatch(performLogin(data.email, data.password));
        /*auth.login({
            username: data.email,
            password: data.password,
            remember: data.rememberMe
        }, () => history.replace(from), (error) => {
            if (error.status === 401) {
                setErrorMessage(error.data.message);
            }
            else if (error.status === 422) {
                setErrorMessage(error.data.message);
                for (var key in error.data.errors) {
                    if (error.data.errors.hasOwnProperty(key)) {
                        setError(key, 'validate', error.data.errors[key]);
                    }
                }
            }
        });*/
    }
    document.getElementsByTagName('body')[0].classList = ['login-page'];
    return (
        <div className="login-box">
            <div className="login-logo">
                <img src="/logo192.png" alt="Logo" />
            </div>
            <div className="card">
                <div className="card-body login-card-body">
                    <p className="login-box-msg">Iniciar sesión</p>
                    {
                        errorMessage &&
                        <div className="alert alert-danger">
                            <strong>{errorMessage}</strong>
                        </div>
                    }
                    <form onSubmit={handleSubmit(login)}>
                        <div className="form-group">
                            <label>E-mail</label>
                            <div className="input-group mb-3">
                                <input type="text" name="email" autoFocus
                                    ref={register({ required: true })}
                                    className={'form-control ' + (errors.email ? 'is-invalid' : '')} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                                {
                                    errors.email && errors.email.type === 'required' &&
                                    <span className="invalid-feedback" role="alert"><strong>Please fill this field.</strong></span>
                                }
                                {
                                    errors.email && errors.email.type === 'validate' &&
                                    <span className="invalid-feedback" role="alert"><strong>{errors.email.message}</strong></span>
                                }
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-group mb-3">
                                <input type="password" name="password"
                                    ref={register({ required: true })}
                                    className={'form-control ' + (errors.password ? 'is-invalid' : '')} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                                {
                                    errors.password && errors.password.type === 'required' &&
                                    <span className="invalid-feedback" role="alert"><strong>Please fill this field.</strong></span>
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <div className="icheck-primary">
                                    <input type="checkbox" id="remember" name="rememberMe" ref={register} />
                                    <label htmlFor="remember">
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                            <div className="col-4">
                                <button type="submit" className="btn btn-primary btn-block">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Login)