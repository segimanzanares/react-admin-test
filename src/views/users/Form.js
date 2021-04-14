import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { performUpdateProfile } from '../../actions/auth';

export default function Form(props) {
    const dispatch = useDispatch()
    const authError = useSelector(store => {
        return store.auth.error;
    })

    React.useEffect(() => {
        if (authError?.errors) {
            for (let key in authError.errors) {
                if (authError.errors.hasOwnProperty(key)) {
                    setError(key, 'validate', authError.errors[key]);
                }
            }
        }
    }, [authError])
    const { register, handleSubmit, errors, setError, setValue } = useForm({
        defaultValues: props.userData
    });
    /*setValue('first_name', props.userData.first_name);
    setValue('last_name', props.userData.last_name);
    setValue('email', props.userData.email);
    setValue('password', '');*/
    const onSubmit = function(data) {
        dispatch(performUpdateProfile(data));
    }
    const { userData, closeModal, ...newProps } = props;
    return (
        <form onSubmit={handleSubmit(onSubmit)} {...newProps}>
            <div className="form-group">
                <label>Nombre</label>
                <input type="text" name="first_name" autoFocus
                       ref={register({ required: true })}
                       className={ 'form-control ' + (errors.first_name ? 'is-invalid' : '') } />
                {
                    errors.first_name && errors.first_name.type === 'required' &&
                    <span className="invalid-feedback" role="alert"><strong>Please fill this field.</strong></span>
                }
                {
                    errors.first_name && errors.first_name.type === 'validate' &&
                    <span className="invalid-feedback" role="alert"><strong>{errors.first_name.message}</strong></span>
                }
            </div>
            <div className="form-group">
                <label>Apellidos</label>
                <input type="text" name="last_name" autoFocus
                       ref={register({ required: true })}
                       className={ 'form-control ' + (errors.last_name ? 'is-invalid' : '') } />
                {
                    errors.last_name && errors.last_name.type === 'required' &&
                    <span className="invalid-feedback" role="alert"><strong>Please fill this field.</strong></span>
                }
                {
                    errors.last_name && errors.last_name.type === 'validate' &&
                    <span className="invalid-feedback" role="alert"><strong>{errors.last_name.message}</strong></span>
                }
            </div>
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
                       className={ 'form-control ' + (errors.password ? 'is-invalid' : '') } />
                {
                    errors.password && errors.password.type === 'required' &&
                    <span className="invalid-feedback" role="alert"><strong>Please fill this field.</strong></span>
                }
            </div>
        </form>
    );
}