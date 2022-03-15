import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, ListGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { stepChange } from '../../../actions/ui';
import { BillingAddressModal } from './BillingAddressModal';
import { fetch_Token } from '../../../helpers/fetch';

export const BillingAddress = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { booking } = useSelector(state => state.booking);
    const { name, uid } = useSelector(state => state.auth);

    const [modalShow, setModalShow] = useState(false);
    const [billing, setBilling] = useState(false);
    const [phone, setPhone] = useState(false);
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const resp = await fetch_Token(`users/${uid}`);
            const { user } = await resp.json();
            setPhone(user.phone);
            setBilling(user.billing);
            dispatch(stepChange(2));
            localStorage.setItem('step', 2);
            setChecking(true);
        }
        fetchData();
    }, [dispatch, uid]);

    const handleSave = () => {
        if (document.querySelector("input[name=check]:checked")) {
            // const id = document.querySelector("input[name=check]:checked").id;
            dispatch(stepChange(3));
            localStorage.setItem('step', 3);
            navigate("/pago", {
                state: {
                    billing: billing,
                }
            });
        } else {
            Swal.fire('Error', "No ha elegido una dirección", 'error');
        }
    }

    const activar = (id, e) => {
        e.preventDefault();
        document.getElementById(id).checked = true;
    }

    const handleDelete = () => {
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
                async function fetchData() {
                    const resp = await fetch_Token(`users/${uid}`, { billing: null }, 'PUT');
                    const body = await resp.json();
                    if (body.msg) {
                        Swal.fire('Error', body.msg, 'error');
                    } else {
                        setBilling(null);
                    }
                }
                fetchData();
            }
        })
    }

    return (
        checking &&
        <div className="animate__animated animate__fadeIn mb-4">
            <div className="row">
                <div className="col-12 col-md-7 col-lg-8">
                    <h4 className='mb-3'>Dirección de facturación</h4>
                    <Form>
                        {
                            billing
                                ? <div className="row mt-1">
                                    <div className="col-12 col-lg-8">
                                        <ListGroup>
                                            <ListGroup.Item className="border-0" action onClick={(e) => activar("checkId", e)}>
                                                <Form.Check
                                                    defaultChecked
                                                    type="radio"
                                                    id="checkId"
                                                    label={name}
                                                    name="check"
                                                    style={{ "fontWeight": "bold", "pointerEvents": "none" }}
                                                />
                                                <div className="mb-3">{billing.line1}, {billing.line2}, {billing.postal_code}, {billing.city}, {billing.state}, {billing.country}</div>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                    <div className="col-12 col-lg-4 mb-4 mb-lg-0" style={{ "display": "flex", "justifyContent": "right", "alignItems": "center" }}>
                                        <Button
                                            className="me-1"
                                            style={{ "width": "80px" }}
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => setModalShow("open")}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            className="me-3"
                                            style={{ "width": "80px" }}
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={handleDelete}
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                    <hr />
                                </div>
                                : <Button
                                    className="mt-2 mb-5"
                                    variant="primary"
                                    onClick={() => setModalShow("open")}
                                >
                                    Añadir dirección
                                </Button>
                        }
                    </Form>
                </div>
                <div className="col-12 col-md-5 col-lg-4">
                    <Card>
                        <Card.Header as="h5" className="text-center">TOTAL</Card.Header>
                        <Card.Body className="text-center">
                            <Card.Title>{booking.total}€</Card.Title>
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
            <BillingAddressModal
                billing={billing}
                setBilling={setBilling}
                setModalShow={setModalShow}
                phone={phone}
                setPhone={setPhone}
                show={modalShow === "open"}
                onHide={() => setModalShow("")}
            />
        </div>
    );
}