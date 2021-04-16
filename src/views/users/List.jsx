import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, Modal, Button } from 'react-bootstrap';
import { loadUsersIfNeeded, fetchUsers, clearError } from '../../actions/users';
import Paginator from '../../components/Paginator';
import UserForm from './Form';

const UsersList = () => {
    let emptyUserData = {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        role_id: null
    }
    const [options, setOptions] = useState({
        name: null,
        email: null,
        page: 1,
        take: 20
    });
    const [showModal, setShowModal] = useState(false);
    const [formMode, setFormMode] = useState("create");
    const [userData, setUserData] = useState(emptyUserData);
    const users = useSelector(store => {
        return store.users.data;
    })
    const total = useSelector(store => {
        return store.users.total;
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

    const onPageChange = (page) => {
        setOptions({
            ...options,
            page: page
        });
        dispatch(fetchUsers({...options, page: page}))
    }

    const handleCloseModal = () => {
        dispatch(clearError());
        setShowModal(false);
    }

    const createUser = () => {
        console.log("Create user");
        setFormMode("create")
        setUserData(emptyUserData)
        setShowModal(true)
    }

    const filter = () => {
        dispatch(fetchUsers({...options}))
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
                                    <Paginator collectionSize={total}
                                        page={options.page}
                                        pageSize={options.take}
                                        maxSize={5}
                                        onPageChange={onPageChange}>
                                    </Paginator>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{formMode === 'create' ? "Crear" : "Editar"} usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserForm id="userForm" userData={userData} mode={formMode} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" form="userForm">
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default UsersList;