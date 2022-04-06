import { useEffect, useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Swal from "sweetalert2";

import { fetch_Token } from "../../../helpers/fetch";
import { UsersModal } from "./UsersModal";

export const Users = () => {

    const [users, setUsers] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetch_Token("users");
                const body = await resp.json();
                setUsers(body.users);
                setChecking(true);
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error.message, 'error');
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id, state, disable) => {
        if (disable) {
            try {
                if (state) {
                    const resp = await fetch_Token(`users/${id}`, {}, 'DELETE');
                    const body = await resp.json();
                    const newUsers = [...users];
                    newUsers[users.findIndex(user => user._id === body.user._id)].state = false;
                    setUsers(newUsers);
                    Swal.fire('Usuario deshabilitado', "", 'success');
                } else {
                    const resp = await fetch_Token(`users/${id}`, { state: true }, 'PUT');
                    const body = await resp.json();
                    const newUsers = [...users];
                    newUsers[users.findIndex(user => user._id === body._id)].state = true;
                    setUsers(newUsers);
                    Swal.fire('Usuario habilitado', "", 'success');
                }
            } catch (error) {
                console.log(error.message);
                return Swal.fire('Error', error.message, 'error');
            }
        } else {
            Swal.fire('Usuario bloqueado', "El webmaster ha bloqueado este usuario", 'info');
        }
    }

    return (
        checking && <div className="animate__animated animate__fadeIn mt-4 mb-5">
            <h3>Gestión de Usuarios</h3>
            <Card className="mt-4">
                <Card.Header>
                    <Row className="align-items-center">
                        <Col xs={6} sm={6} md={3}>
                            Correo
                        </Col>
                        <Col xs={0} sm={0} md={3} className="disable-card-header">
                            Nombre
                        </Col>
                        <Col xs={0} sm={0} md={3} className="disable-card-header">
                            Estado
                        </Col>
                        <Col xs={6} sm={6} md={3}>
                        </Col>
                    </Row>
                </Card.Header>
                <ListGroup variant="flush">
                    {
                        users.map(user =>
                            <ListGroup.Item key={user._id}>
                                <Row className="align-items-center">
                                    <Col xs={6} sm={6} md={3}>
                                        {user.email}
                                    </Col>
                                    <Col xs={0} sm={0} md={3} className="disable-card-header">
                                        {user.name}
                                    </Col>
                                    <Col xs={0} sm={0} md={3} className="disable-card-header">
                                        {
                                            user.state ? <span className="text-success">Activo</span> : <span className="text-danger">Deshabilitado</span>
                                        }
                                    </Col>
                                    <Col xs={6} sm={6} md={3}>
                                        <div className="d-flex">
                                            <Button
                                                className="me-1 flex-grow-1"
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => setModalShow(user._id)}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                className="flex-grow-1"
                                                variant={user.estado ? "outline-danger" : "outline-success"}
                                                size="sm"
                                                onClick={() => handleDelete(user._id, user.state, user.disable)}
                                            >
                                                {
                                                    user.state ? "Eliminar" : "Habilitar"
                                                }
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                                <UsersModal
                                    id={user._id}
                                    email={user.email}
                                    name={user.name}
                                    users={users}
                                    setUsers={setUsers}
                                    setModalShow={setModalShow}
                                    show={modalShow === user._id}
                                    onHide={() => setModalShow("")}
                                />
                            </ListGroup.Item>
                        )
                    }
                </ListGroup>
            </Card>
        </div>
    )
}