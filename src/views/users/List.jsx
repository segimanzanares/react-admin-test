import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loadUsersIfNeeded, fetchUsers } from '../../actions/users';

const UsersList = () => {
    const [options, setOptions] = useState({
        name: null,
        email: null
    });
    const users = useSelector(store => {
        return store.users.data;
    })
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(loadUsersIfNeeded())
    }, [])

    const handleInputChange = (event) => {
        setOptions({
            ...options,
            [event.target.name]: event.target.value
        })
    }

    const createUser = () => {
        console.log("Create user");
    }

    const filter = () => {
        dispatch(fetchUsers(options))
    }

    const toggleUserStatus = (user) => {
        console.log("toggleUserStatus")
        console.log(user);
    }

    const goEditUser = () => {

    }

    const deleteUser = () => {

    }

    return (
        <Fragment>
            <div className="content-header">
                <div className="container-fluid">
                    <h1 className="m-0 text-dark"><strong>Usuarios</strong></h1>
                </div>
            </div>

            <section className="content">
                <div className="card">
                    <div className="card-header">
                        <div className="float-left">
                            <h3 className="card-title">Listado de usuarios</h3>
                        </div>
                        <div className="float-right">
                            <button className="btn btn-primary" onClick={createUser}>
                                <i className="fa fa-plus-square"></i> Crear usuario
                            </button>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="card-body">
                        <div className="form-inline table-filters">
                            <div className="form-group">
                                <label className="control-label">Nombre</label>
                                <input type="text" name="name" className="form-control" onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label className="control-label">E-mail</label>
                                <input type="text" name="email" className="form-control" onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-secondary" onClick={filter}>
                                    <i className="fa fa-search"></i> Filtrar
                                </button>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>E-mail</th>
                                        <th width="150" className="text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user, i) => {
                                            return <tr key={i}>
                                                <td>{user.full_name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <div className="table-button-container text-center">
                                                        <a href="#" className="action-link" onClick={() => toggleUserStatus(user)}>
                                                            <i className="fa fa-check"></i>
                                                        </a>
                                                        <a href="#" className="action-link text-info" onClick={() => goEditUser(user)}>
                                                            <i className="fa fa-pencil-alt"></i>
                                                        </a>
                                                        <a href="#" className="action-link text-danger" onClick={() => deleteUser(user)}>
                                                            <i className="fa fa-trash"></i>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                            <div>
                                <div className="d-flex justify-content-between p-2">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default UsersList;