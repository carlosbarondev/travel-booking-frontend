import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { normalizeText } from 'normalize-text';
import { lightFormat } from 'date-fns';

import { fetch_Token } from "../../../helpers/fetch";
import { invoicePdf } from "../../../helpers/invoicePdf";

export const Orders = () => {

    const navigate = useNavigate();

    const { name, uid } = useSelector(state => state.auth);

    const [bookings, setBookings] = useState();
    const [checking, setChecking] = useState(false);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetch_Token(`bookings/${uid}`);
                const body = await resp.json();
                if (body.msg) {
                    return Swal.fire('Error', body.msg, 'error');
                } else {
                    setBookings(body.bookings);
                    setChecking(true);
                }
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error.message, 'error');
            }
        }
        fetchData();
    }, [uid]);

    const handleCancel = (booking) => {
        const limit = new Date();
        limit.setDate(limit.getDate() + 2);
        const startDate = new Date(booking.booking.date.startDate);
        startDate.setDate(startDate.getDate());
        if (startDate < new Date().getDate()) {
            return Swal.fire('La fecha ya ha pasado', "", 'error');
        } else if (startDate < limit) {
            return Swal.fire('Quedan menos de tres días', "Ya no se puede cancelar la reserva", 'error');
        } else {
            Swal.fire({
                title: '¿Está seguro?',
                text: "No podrá revertir esto",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Cancelar reserva',
                cancelButtonText: 'Volver'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const resp = await fetch_Token(`bookings/${booking._id}`, {}, "DELETE");
                        const body = await resp.json();
                        if (body.msg) {
                            return Swal.fire('Error', body.msg, 'error');
                        } else {
                            setBookings(bookings.filter(item => item._id !== booking._id));
                        }
                    } catch (error) {
                        console.log(error);
                        return Swal.fire('Error', error.message, 'error');
                    }
                }
            })
        }
    }

    return (
        checking && <div className="animate__animated animate__fadeIn mt-4 mb-5">
            <h3>Mis Reservas</h3>
            {
                bookings.length === 0
                    ? <div className="center_column mt-5">
                        <b>No ha realizado ninguna reserva todavía,</b>
                        <div>pero te animamos a ver nuestros hoteles</div>
                        <Button className="mt-3" variant="warning" onClick={() => navigate(`/`)}>Buscar hotel</Button>
                    </div>
                    :
                    bookings.map(booking => (
                        <Card key={booking._id} className="mt-4">
                            <Card.Header>
                                <Row className="ms-2">
                                    <Col md={3} className="mb-2">
                                        <Row>
                                            Reserva realizada
                                        </Row>
                                        <Row>
                                            {new Date(booking.date).toLocaleDateString("es-ES", options)}
                                        </Row>
                                    </Col>
                                    <Col md={3} className="mb-2">
                                        <Row>
                                            Total
                                        </Row>
                                        <Row>
                                            {booking.total}€
                                        </Row>
                                    </Col>
                                    <Col className="mb-2">
                                        <Row className="me-1 disable-float">
                                            Reserva nº {booking.idBooking}
                                        </Row>
                                        <Row className="disable-float">
                                            <span>
                                                <button className="buttonLink" onClick={() => navigate("/panel/reservas/detalles", {
                                                    state: {
                                                        booking: booking
                                                    }
                                                })}>Ver los detalles de la reserva</button>
                                                <div className="vr ms-2 me-2"></div>
                                                <button className="buttonLink" onClick={() => handleCancel(booking)}>Cancelar reserva</button>
                                            </span>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Row className="align-items-center mb-3">
                                    <Col xs={2} md={1} className="d-flex justify-content-center align-items-center" style={{ "height": "5rem" }}>
                                        <Image style={{ "maxHeight": "70%" }} src={booking.hotel.img ? booking.hotel.img : "/assets/no-image.png"} fluid />
                                    </Col>
                                    <Col xs={5} md={6}>
                                        <Link className="linkHotel" style={{ "fontSize": "18px" }} to={`/hoteles/${normalizeText(booking.hotel.name.replace(/\s+/g, "-"))}`}>{booking.hotel.name}</Link>
                                        <div style={{ "fontSize": "14px" }}>Estancia: {lightFormat(new Date(booking.booking.date.startDate), 'dd/MM/yyyy')} - {lightFormat(new Date(booking.booking.date.endDate), 'dd/MM/yyyy')} {`${booking.booking.days === 1 ? `(${booking.booking.days} noche)` : `(${booking.booking.days} noches)`}`}</div>
                                    </Col>
                                    <Col xs={5} md={5} className="text-center mt-2">
                                        <div className="d-grid">
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={() => invoicePdf(name, booking)}
                                            >
                                                Imprimir factura
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))
            }
        </div>
    )
};