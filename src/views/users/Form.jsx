import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { performUpdateProfile } from '../../actions/auth';
import { performCreateUser, performUpdateUser } from '../../actions/users';
import { loadCatalogRolesIfNeeded } from '../../actions/catalogs';
import ImageCropper from '../../components/ImageCropper'

export default function Form(props) {
    const dispatch = useDispatch()
    const authError = useSelector(store => {
        return store.auth.error;
    })
    const userError = useSelector(store => {
        return store.users.error;
    })
    const roles = useSelector(store => {
        return store.catalogs.roles;
    })
    const [imageData, setImageData] = useState(null)
    const selectRole = () => setValue('role_id', props.userData.role_id)
    // Load roles
    dispatch(loadCatalogRolesIfNeeded(selectRole))

    const onImageCropped = (imageData) => {
        setImageData(imageData)
    }

    React.useEffect(() => {
        if (authError?.errors) {
            for (let key in authError.errors) {
                if (authError.errors.hasOwnProperty(key)) {
                    setError(key, 'validate', authError.errors[key]);
                }
            }
        }
        if (userError?.errors) {
            for (let key in userError.errors) {
                if (userError.errors.hasOwnProperty(key)) {
                    setError(key, 'validate', userError.errors[key]);
                }
            }
        }
    }, [authError, userError])
    const { register, handleSubmit, errors, setError, setValue } = useForm({
        defaultValues: props.userData
    });
    const onSubmit = function (data) {
        let formData = {...data}
        if (imageData && imageData.contents !== null) {
            formData.avatar = imageData
        }
        if (props.mode === "profile") {
            dispatch(performUpdateProfile(formData));
        }
        else if (props.mode === "create") {
            dispatch(performCreateUser(formData));
        }
        else if (props.mode === "edit") {
            dispatch(performUpdateUser(formData));
        }
    }
    const { userData, closeModal, ...newProps } = props;
    return (
        <form onSubmit={handleSubmit(onSubmit)} {...newProps}>
            {props.mode === "edit" ? <input type="hidden" name="id" ref={register()} /> : ''}
            {(['create', 'edit'].indexOf(props.mode) !== -1) ?
                <div className="form-group">
                    <label>Rol</label>
                    <select className={'custom-select ' + (errors.role_id ? 'is-invalid' : '')} name="role_id"
                        ref={register({ required: true })}
                        autoFocus>
                        {roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
                    </select>
                    {
                        errors.role_id && errors.role_id.type === 'required' &&
                        <span className="invalid-feedback" role="alert"><strong>Please fill this field.</strong></span>
                    }
                    {
                        errors.role_id && errors.role_id.type === 'validate' &&
                        <span className="invalid-feedback" role="alert"><strong>{errors.role_id.message}</strong></span>
                    }
                </div>
                : ''}
            <div className="form-group">
                <label>Nombre</label>
                <input type="text" name="first_name" autoFocus
                    ref={register({ required: true })}
                    className={'form-control ' + (errors.first_name ? 'is-invalid' : '')} />
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
                    className={'form-control ' + (errors.last_name ? 'is-invalid' : '')} />
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
                    className={'form-control ' + (errors.email ? 'is-invalid' : '')} />
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
                    className={'form-control ' + (errors.password ? 'is-invalid' : '')} />
                {
                    errors.password && errors.password.type === 'required' &&
                    <span className="invalid-feedback" role="alert"><strong>Please fill this field.</strong></span>
                }
            </div>
            <div className="form-group">
                <ImageCropper src={props.userData.avatar ? props.userData.avatar.path : ''} onImageCropped={onImageCropped} />
            </div>
        </form>
    );
}