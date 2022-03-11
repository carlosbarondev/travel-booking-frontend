import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, ListGroup } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Swal from 'sweetalert2';

import { shippingModalChange, shippingModalChoose, stepChange } from '../../../actions/ui';
import { ShippingModal } from './ShippingModal';
import { shippingSetActive, shippingStartDelete, shippingStartDeleteBilling } from '../../../actions/shipping';


export const ShippingList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shippingModal } = useSelector(state => state.ui);
    const { nombre } = useSelector(state => state.auth);
    const { carrito } = useSelector(state => state.cart);
    const { envio, facturacion, predeterminado } = useSelector(state => state.shipping);

    useEffect(() => {
        dispatch(stepChange(2));
        localStorage.setItem('step', 2);
    }, [dispatch]);

    const handleSave = () => {
        if (document.querySelector("input[name=check_envio]:checked")) {
            if (facturacion) {
                const id = document.querySelector("input[name=check_envio]:checked").id;
                const enviar = envio.find(element => element._id === id);
                dispatch(stepChange(3));
                localStorage.setItem('step', 3);
                navigate("/payment", {
                    state: {
                        direccion: enviar,
                        facturacion: facturacion
                    }
                });
            } else {
                Swal.fire('Error', "No ha elegido una dirección de facturación", 'error');
            }
        } else {
            Swal.fire('Error', "No ha elegido una dirección de envío", 'error');
        }
    }

    const activar = (id, e) => {
        e.preventDefault();
        document.getElementById(id).checked = true;
    }

    const handleDelete = (idEnvio) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                if (idEnvio) {
                    dispatch(shippingStartDelete(idEnvio));
                } else {
                    dispatch(shippingStartDeleteBilling());
                }
            }
        })
    }

    const handleEdit = (idEnvio) => {
        if (idEnvio) {
            dispatch(shippingModalChoose(true));
            const enviar = envio.find(element => element._id === idEnvio);
            dispatch(shippingSetActive(enviar));
        } else {
            dispatch(shippingModalChoose(false));
        }
        dispatch(shippingModalChange(true));
    }

    const handleHide = () => {
        dispatch(shippingModalChange(false));
        dispatch(shippingSetActive());
    }

    return (
        <div className="animate__animated animate__fadeIn mb-4">
            <div className="row">
                <div className="col-12 col-md-7 col-lg-8">
                    <h4 className='mb-3'>Dirección de envío</h4>
                    <Form>
                        <TransitionGroup className="todo-list">
                            {
                                envio.map(direccion => (
                                    <CSSTransition
                                        key={direccion._id}
                                        timeout={500}
                                        classNames="item"
                                    >
                                        <div className="row mt-1">
                                            <div className="col-12 col-lg-8">
                                                <ListGroup>
                                                    <ListGroup.Item className="border-0" action onClick={(e) => activar(direccion._id, e)}>
                                                        {
                                                            predeterminado === direccion._id &&
                                                            <Form.Check
                                                                defaultChecked
                                                                type="radio"
                                                                id={direccion._id}
                                                                label={direccion.nombre}
                                                                name="check_envio"
                                                                style={{ "fontWeight": "bold", "pointerEvents": "none" }}
                                                            />
                                                        }
                                                        {
                                                            predeterminado !== direccion._id &&
                                                            <Form.Check
                                                                type="radio"
                                                                id={direccion._id}
                                                                label={direccion.nombre}
                                                                name="check_envio"
                                                                style={{ "fontWeight": "bold", "pointerEvents": "none" }}
                                                            />
                                                        }
                                                        <div className="mb-3">{direccion.direccion.calle}, {direccion.direccion.numero}, {direccion.direccion.codigo}, {direccion.direccion.poblacion}, {direccion.direccion.provincia}, {direccion.direccion.pais}</div>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-4 mb-lg-0" style={{ "display": "flex", "justifyContent": "right", "alignItems": "center" }}>
                                                <Button
                                                    className="me-1"
                                                    style={{ "width": "80px" }}
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    onClick={() => handleEdit(direccion._id)}
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    className="me-3"
                                                    style={{ "width": "80px" }}
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    onClick={() => handleDelete(direccion._id)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </div>
                                            <hr />
                                        </div>
                                    </CSSTransition>
                                ))
                            }
                        </TransitionGroup>
                    </Form>
                    <Button
                        className="mt-2 mb-5"
                        variant="primary"
                        onClick={() => {
                            dispatch(shippingModalChoose(true));
                            dispatch(shippingModalChange(true));
                        }}
                    >
                        {
                            envio.length === 0
                                ? <div>Añadir dirección</div>
                                : <div>Añadir otra dirección</div>
                        }
                    </Button>
                    {
                        envio.length !== 0 &&
                        <>
                            <h4>Dirección de facturación</h4>
                            <TransitionGroup className="todo-list">
                                <CSSTransition
                                    timeout={500}
                                    classNames="item"
                                >
                                    {
                                        facturacion
                                            ? <Form>
                                                <div className="row mt-1">
                                                    <div className="col-12 col-lg-8">
                                                        <ListGroup>
                                                            <ListGroup.Item className="border-0" action onClick={(e) => activar(facturacion._id, e)}>
                                                                <Form.Check
                                                                    defaultChecked
                                                                    type="radio"
                                                                    id={facturacion._id}
                                                                    label={nombre}
                                                                    name="check_facturacion"
                                                                    style={{ "fontWeight": "bold", "pointerEvents": "none" }}
                                                                />
                                                                <div className="mb-3">{facturacion.calle}, {facturacion.numero}, {facturacion.codigo}, {facturacion.poblacion}, {facturacion.provincia}, {facturacion.pais}</div>
                                                            </ListGroup.Item>
                                                        </ListGroup>
                                                    </div>
                                                    <div className="col-12 col-lg-4 mb-4 mb-lg-0" style={{ "display": "flex", "justifyContent": "right", "alignItems": "center" }}>
                                                        <Button
                                                            className="me-1"
                                                            style={{ "width": "80px" }}
                                                            variant="outline-secondary"
                                                            size="sm"
                                                            onClick={() => handleEdit()}
                                                        >
                                                            Editar
                                                        </Button>
                                                        <Button
                                                            className="me-3"
                                                            style={{ "width": "80px" }}
                                                            variant="outline-secondary"
                                                            size="sm"
                                                            onClick={() => handleDelete()}
                                                        >
                                                            Eliminar
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Form>
                                            : <Button
                                                className="mt-2 mb-5"
                                                variant="primary"
                                                onClick={() => {
                                                    dispatch(shippingModalChoose(false));
                                                    dispatch(shippingModalChange(true));
                                                }}
                                            >
                                                Añadir dirección
                                            </Button>
                                    }
                                </CSSTransition>
                            </TransitionGroup>
                        </>
                    }
                </div>
                <div className="col-12 col-md-5 col-lg-4">
                    <Card>
                        <Card.Header as="h5" className="text-center">TOTAL</Card.Header>
                        <Card.Body className="text-center">
                            <Card.Title>{carrito.reduce((n, { unidades, producto }) => n + unidades * producto.precio, 0).toFixed(2)} €</Card.Title>
                            <div className="mt-4 d-grid gap-2">
                                <Button
                                    className="mt-1"
                                    variant="warning"
                                    size="lg"
                                    onClick={handleSave}
                                >
                                    Guardar y continuar
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <ShippingModal
                show={shippingModal}
                onHide={handleHide}
            />
        </div>
    );
}