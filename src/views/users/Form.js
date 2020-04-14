import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import auth from '../../auth';
import { useHistory, useLocation } from "react-router-dom";

export default function Form(props) {
    const { register, handleSubmit, errors, setError } = useForm();
    const onSubmit = function() {
        console.log("On submit");
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} {...props}>
            <div className="form-group">
                <label>E-mail</label>
                <input type="text" name="email" autoFocus
                       ref={register({ required: true })}
                       className={ 'form-control ' + (errors.email ? 'is-invalid' : '') } />
                {
                    errors.email && errors.email.type === 'required' && 
                    <span className="invalid-feedback" role="alert"><strong>Please fill this field.</strong></span>
                }
                {
                    errors.email && errors.email.type === 'validate' && 
                    <span className="invalid-feedback" role="alert"><strong>{errors.email.message}</strong></span>
                }
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" name="password"
                       ref={register({ required: true })}
                       className={ 'form-control ' + (errors.password ? 'is-invalid' : '') } />
                {
                    errors.password && errors.password.type === 'required' && 
                    <span className="invalid-feedback" role="alert"><strong>Please fill this field.</strong></span>
                }
            </div>
        </form>
    );
}