import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { loadUsersIfNeeded, fetchUsers, performDeleteUser, performToggleUser, clearError } from '../../actions/users';
import Paginator from '../../components/Paginator';
import UserForm from './Form';
import { showConfirmDialog, handleSort } from '../../utils/helpers'
import api from '../../api'

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
        take: 20,
        sort: 'name|asc'
    });
    const modalBodyStyle = {
        maxHeight: window.innerHeight - 200
    }
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
    const location = useLocation()
    const history = useHistory()
    React.useEffect(() => {
        dispatch(loadUsersIfNeeded())
        if (/\/users\/[0-9]+$/.test(location.pathname)) {
            let userId = location.pathname.replace("/users/", "")
            if (users && users.length > 0) {
                // Buscar record
                let u = users.filter(r => r.id == userId)
                if (u.length > 0) {
                    editUser(u[0])
                }
            }
            else {
                api('get', `/users/${userId}`)
                    .then(r => editUser(r.data))
            }
        }
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
        dispatch(fetchUsers({ ...options, page: page }))
    }

    const handleCloseModal = () => {
        dispatch(clearError());
        setShowModal(false);
        history.push("/users")
    }

    const createUser = () => {
        setFormMode("create")
        setUserData(emptyUserData)
        setShowModal(true)
    }

    const filter = () => {
        dispatch(fetchUsers({ ...options }))
    }

    const toggleUserStatus = (user) => {
        dispatch(performToggleUser(user))
    }

    const goEditUser = (user) => {
        history.push(`/users/${user.id}`)
    }

    const editUser = (user) => {
        setFormMode("edit")
        setUserData({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            role_id: user.role_id,
            avatar_path: user.avatar?.path
        })
        setShowModal(true)
    }

    const deleteUser = (user) => {
        showConfirmDialog({
            title: "Eliminar usuario",
            msg: "¿Estas seguro de eliminar el usuario seleccionado?",
            icon: 'question',
            callback: function () {
                dispatch(performDeleteUser(user))
            }
        });
    }

    const onSort = (sortBy, direction) => {
        let sort = `${sortBy}|${direction}`
        setOptions({
            ...options,
            sort
        });
        dispatch(fetchUsers({ ...options, sort }))
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
                                        <th sortable="name" onClick={(e) => handleSort(e, onSort)} className="asc">Nombre</th>
                                        <th sortable="email" onClick={(e) => handleSort(e, onSort)}>E-mail</th>
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
                                                        <a href="#" className={'action-link ' + (user.is_active == 1 ? 'text-success' : 'text-danger')}
                                                            onClick={(e) => { e.preventDefault(); toggleUserStatus(user) }}>
                                                            <i className="fa fa-check"></i>
                                                        </a>
                                                        <a href="#" className="action-link text-info" onClick={(e) => { e.preventDefault(); goEditUser(user) }}>
                                                            <i className="fa fa-pencil-alt"></i>
                                                        </a>
                                                        <a href="#" className="action-link text-danger" onClick={(e) => { e.preventDefault(); deleteUser(user) }}>
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
                <Modal.Body style={modalBodyStyle}>
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