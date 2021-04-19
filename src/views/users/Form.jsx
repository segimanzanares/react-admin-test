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
    const { register, handleSubmit, formState: { errors }, setError, setValue, clearErrors } = useForm({
        defaultValues: props.userData
    });
    const selectRole = () => setValue('role_id', props.userData.role_id)
    // Load roles
    dispatch(loadCatalogRolesIfNeeded(selectRole))

    const onImageCropped = (imageData) => {
        clearErrors('avatar')
        setImageData(imageData)
    }

    React.useEffect(() => {
        if (authError?.errors) {
            for (let key in authError.errors) {
                if (authError.errors.hasOwnProperty(key)) {
                    setError(key, { type: 'validate', message: authError.errors[key] })
                }
            }
        }
        if (userError?.errors) {
            for (let key in userError.errors) {
                if (userError.errors.hasOwnProperty(key)) {
                    setError(key, { type: 'validate', message: userError.errors[key] })
                }
            }
        }
    }, [authError, userError, setError])
    const onSubmit = function (data) {
        let formData = { ...data }
        if (imageData && imageData.contents !== null) {
            formData.avatar = imageData
        }
        if (formData.password != formData.password_confirmation) {
            setError('password', { type: 'validate', message: "La confirmación del campo contraseña no coincide." })
            return false
        }
        clearErrors()
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
            {props.mode === "edit" ? <input type="hidden" {...register("id")} /> : ''}
            {(['create', 'edit'].indexOf(props.mode) !== -1) ?
                <div className="form-group">
                    <label>Rol</label>
                    <select className={'custom-select ' + (errors && errors.role_id ? 'is-invalid' : '')}
                        {...register("role_id", { required: true })}
                        autoFocus>
                        {roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
                    </select>
                    {
                        errors && errors.role_id && errors.role_id.type === 'required' &&
                        <span className="invalid-feedback" role="alert"><strong>Please fill this field.</strong></span>
                    }
                    {
                        errors && errors.role_id && errors.role_id.type === 'validate' &&
                        <span className="invalid-feedback" role="alert"><strong>{errors.role_id.message}</strong></span>
                    }
                </div>
                : ''}
            <div className="form-group">
                <label>Nombre</label>
                <input type="text" autoFocus
                    {...register("first_name", { required: true })}
                    className={'form-control ' + (errors && errors.first_name ? 'is-invalid' : '')} />
                {
                    errors && errors.first_name && errors.first_name.type === 'required' &&
                    <span className="invalid-feedback" role="alert"><strong>Please fill this field.</strong></span>
                }
                {
                    errors && errors.first_name && errors.first_name.type === 'validate' &&
                    <span className="invalid-feedback" role="alert"><strong>{errors.first_name.message}</strong></span>
                }
            </div>
            <div className="form-group">
                <label>Apellidos</label>
                <input type="text"
                    {...register("last_name", { required: true })}
                    className={'form-control ' + (errors && errors.last_name ? 'is-invalid' : '')} />
                {
                    errors && errors.last_name && errors.last_name.type === 'required' &&
                    <span className="invalid-feedback" role="alert"><strong>Please fill this field.</strong></span>
                }
                {
                    errors && errors.last_name && errors.last_name.type === 'validate' &&
                    <span className="invalid-feedback" role="alert"><strong>{errors.last_name.message}</strong></span>
                }
            </div>
            <div className="form-group">
                <label>E-mail</label>
                <input type="text"
                    {...register("email", { required: true })}
                    className={'form-control ' + (errors && errors.email ? 'is-invalid' : '')} />
                {
                    errors && errors.email && errors.email.type === 'required' &&
                    <span className="invalid-feedback" role="alert"><strong>Please fill this field.</strong></span>
                }
                {
                    errors && errors.email && errors.email.type === 'validate' &&
                    <span className="invalid-feedback" role="alert"><strong>{errors.email.message}</strong></span>
                }
            </div>
            <div className="form-group">
                <label>Contraseña</label>
                <input type="password"
                    {...register("password")}
                    className={'form-control ' + (errors && errors.password ? 'is-invalid' : '')} />
                {
                    errors && errors.password && errors.password.type === 'validate' &&
                    <span className="invalid-feedback" role="alert"><strong>{errors.password.message}</strong></span>
                }
            </div>
            <div className="form-group">
                <label>Confirmar contraseña</label>
                <input type="password" className="form-control" {...register("password_confirmation")} />
            </div>
            <div className="form-group">
                <ImageCropper src={props.userData.avatar_path ? props.userData.avatar_path : ''}
                    hasError={errors && errors.avatar ? true : false}
                    onImageCropped={onImageCropped} />
                {
                    errors && errors.avatar && errors.avatar.type === 'validate' &&
                    <span className="invalid-feedback" role="alert"><strong>{errors.avatar.message}</strong></span>
                }
            </div>
        </form>
    );
}