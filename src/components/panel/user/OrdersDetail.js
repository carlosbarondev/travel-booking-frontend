import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { normalizeText } from 'normalize-text';
import { lightFormat } from 'date-fns';

import { invoicePdf } from "../../../helpers/invoicePdf";
import { SummaryModal } from "../../payment/summary/SummaryModal";

export const OrdersDetail = () => {

    const location = useLocation();
    const { booking } = location.state;
    const { name } = useSelector(state => state.auth);

    const [modalShow, setModalShow] = useState(false);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <Container className="animate__animated animate__fadeIn mb-5">
            <Card className="mt-4">
                <Card.Header as="h4">
                    Detalles de la reserva
                    <div className="vr ms-3 me-3"></div>
                    <button className="buttonLink" onClick={() => invoicePdf(name, booking)}>Imprimir Factura</button>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={12} sm={5}>
                            <Card.Title>Dirección de facturación</Card.Title>
                            <Card.Text>
                                {name}
                                <br />
                                {booking.user.billing.line1} {booking.user.billing.line2}
                                <br />
                                {booking.user.billing.postal_code}
                                <br />
                                {booking.user.billing.city} {booking.user.billing.state}
                                <br />
                                {booking.user.billing.country}
                            </Card.Text>
                        </Col>
                        <Col xs={12} sm={5} className="mt-4 mt-sm-0">
                            <Card.Title>Método de pago</Card.Title>
                            <Card.Text>
                                <Image className="mg-fluid" style={{ "height": "25px" }} src="https://images-na.ssl-images-amazon.com/images/G/30/checkout/payselect/card-logos-small/visa._CB658923706_.gif" />
                                <span> **** {booking.digits}</span>
                            </Card.Text>
                            <Card.Title>Fecha</Card.Title>
                            <Card.Text>
                                {new Date(booking.date).toLocaleDateString("es-ES", options)}
                            </Card.Text>
                        </Col>
                        <Col xs={12} sm={2} className="mt-4 mt-sm-0">
                            <Card.Title>Total:</Card.Title>
                            <Card.Text>
                                <b>EUR {booking.total}</b>
                            </Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Row className="align-items-center">
                        <Col xs={4} sm={3} md={2} className="d-flex justify-content-center align-items-center" style={{ "height": "8rem" }}>
                            <Image src={booking.hotel.img ? booking.hotel.img : "/assets/no-image.png"} fluid />
                        </Col>
                        <Col xs={8} sm={9} md={5}>
                            <Link className="linkHotel" style={{ "fontSize": "18px" }} to={`/hoteles/${normalizeText(booking.hotel.name.replace(/\s+/g, "-"))}`}>{booking.hotel.name}</Link>
                            <div style={{ "fontSize": "14px" }}>Estancia: {lightFormat(new Date(booking.booking.date.startDate), 'dd/MM/yyyy')} - {lightFormat(new Date(booking.booking.date.endDate), 'dd/MM/yyyy')} {`${booking.booking.days === 1 ? `(${booking.booking.days} noche)` : `(${booking.booking.days} noches)`}`}</div>
                            <b>{booking.total}€</b>
                        </Col>
                        <Col xs={12} sm={12} md={5} className="text-center mt-3">
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => setModalShow(booking._id)}
                            >
                                Editar opinión sobre la reserva
                            </Button>
                        </Col>
                    </Row>
                    <SummaryModal
                        id={booking.booking.idHotel}
                        setModalShow={setModalShow}
                        show={modalShow === booking._id}
                        onHide={() => setModalShow("")}
                    />
                </Card.Body>
            </Card>
        </Container>
    )
}