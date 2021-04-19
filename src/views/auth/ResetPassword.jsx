import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { performResetPassword, requestClientTokenIfNeeded } from '../../actions/auth';

const ResetPassword = () => {
    const params = useParams()
    const queryParams = new URLSearchParams(useLocation().search)
    const dispatch = useDispatch()
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        defaultValues: {
            email: queryParams.get('email'),
            token: params.token,
        }
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const authError = useSelector(store => {
        return store.auth.error;
    })
    dispatch(requestClientTokenIfNeeded())
    React.useEffect(() => {
        if (authError) {
            setErrorMessage(authError.message)
            if (authError.errors) {
                for (let key in authError.errors) {
                    if (authError.errors.hasOwnProperty(key)) {
                        setError(key, { type: 'validate', message: authError.errors[key] })
                    }
                }
            }
        }
    }, [authError])

    const resetPassword = function (data) {
        if (data.password != data.password_confirmation) {
            setError('password', { type: 'validate', message: "La confirmación del campo contraseña no coincide." })
            return false
        }
        setErrorMessage(null)
        dispatch(performResetPassword(data))
    }
    document.getElementsByTagName('body')[0].classList.remove('hold-transition', 'sidebar-mini', 'layout-fixed')
    document.getElementsByTagName('body')[0].classList.add('login-page')
    return (
        <div className="login-box">
            <div className="login-logo">
                <div><img src="assets/img/logo.png" alt="Logo" /></div>
            </div>
            <div className="card">
                <div className="card-body login-card-body">
                    {errorMessage ? <div className="alert alert-danger">
                        <strong>{errorMessage}</strong>
                    </div>
                        : ''}
                    <p className="login-box-msg">
                        Ingresa tu nueva contraseña
                    </p>
                    <form onSubmit={handleSubmit(resetPassword)}>
                        <input type="hidden" {...register("token")}/>
                        <div className="form-group">
                            <input type="email" readOnly
                                placeholder="E-mail"
                                {...register("email", { required: true })}
                                className={'form-control ' + (errors.email ? 'is-invalid' : '')} />
                            {
                                errors.email && errors.email.type === 'required' &&
                                <span className="invalid-feedback" role="alert"><strong>Por favor completa este campo.</strong></span>
                            }
                            {
                                errors.email && errors.email.type === 'validate' &&
                                <span className="invalid-feedback" role="alert"><strong>{errors.email.message}</strong></span>
                            }
                        </div>
                        <div className="form-group">
                            <input type="password" autoFocus
                                placeholder="Contraseña"
                                {...register("password", { required: true })}
                                className={'form-control ' + (errors.password ? 'is-invalid' : '')} />
                            {
                                errors.password && errors.password.type === 'required' &&
                                <span className="invalid-feedback" role="alert"><strong>Por favor completa este campo.</strong></span>
                            }
                            {
                                errors.password && errors.password.type === 'validate' &&
                                <span className="invalid-feedback" role="alert"><strong>{errors.password.message}</strong></span>
                            }
                        </div>
                        <div className="form-group">
                            <input type="password"
                                placeholder="Confirmar contraseña"
                                {...register("password_confirmation", { required: true })}
                                className={'form-control ' + (errors.password_confirmation ? 'is-invalid' : '')} />
                            {
                                errors.password_confirmation && errors.password_confirmation.type === 'required' &&
                                <span className="invalid-feedback" role="alert"><strong>Por favor completa este campo.</strong></span>
                            }
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary btn-block">Actualizar contraseña</button>
                            </div>
                        </div>
                    </form>
                    <p className="mt-3 mb-1">
                        <Link to="/login">Login</Link>
                    </p>
                    <div className="text-center mt-3">
                        Copyright © Naba Software 2021
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;