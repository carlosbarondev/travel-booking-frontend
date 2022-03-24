import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { normalizeText } from 'normalize-text';
import { lightFormat } from 'date-fns';

import { fetch_Token } from "../../../helpers/fetch";
import { SummaryModal } from "./SummaryModal";
import { invoicePdf } from "../../../helpers/invoicePdf";
import { bookingAddAdults, bookingAddChildren, bookingAddDate, bookingAddDays, bookingClear } from "../../../actions/booking";

export const Summary = () => {

    const [searchParams] = useSearchParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { uid, name } = useSelector(state => state.auth);
    const { booking } = useSelector(state => state.booking);

    const [modalShow, setModalShow] = useState(false);
    const [checking, setChecking] = useState(false);
    const [summary, setSummary] = useState();

    useEffect(() => {

        async function fetchData() {

            if (booking?.total) { // Se ejecuta cuando el usuario llega desde la pantalla de pago

                const payment = await fetch_Token(`payments/${searchParams.get("payment_intent")}`);

                const body = await payment.json();

                if (body.msg) { // Si hay errores
                    Swal.fire('Error', body.msg, 'error');
                } else {

                    const user = await fetch_Token(`payments/user/${uid}`);

                    const bodyUser = await user.json();

                    if (bodyUser.msg) { // Si hay errores
                        Swal.fire('Error', bodyUser.msg, 'error');
                    } else {
                        const d = new Date(booking.date.endDate);
                        d.setDate(d.getDate() - 1); // Se resta 1 a la fecha de salida porque no es un día reservado
                        const send = await fetch_Token(`bookings`, {
                            idBooking: searchParams.get("payment_intent"),
                            user: uid,
                            booking: booking,
                            date: new Date(body.paymentIntent.created * 1000),
                            billing: bodyUser.customer.billing,
                            payment_method: body.paymentIntent.charges.data[0].payment_method_details.card.brand,
                            digits: body.paymentIntent.charges.data[0].payment_method_details.card.last4,
                            total: body.paymentIntent.amount,
                            room: booking.roomId,
                            start: booking.date.startDate,
                            end: d.toISOString()
                        }, 'POST');

                        const bodyBooking = await send.json();

                        if (bodyBooking.msg) { // Si hay errores
                            Swal.fire('Error', bodyBooking.msg, 'error');
                        } else {

                            await fetch_Token(`hotels/${booking.idHotel}`, { // Actualizar la habitación con la fecha de la reserva
                                idRoom: booking.idRoom,
                                date: booking.date
                            }, 'PUT');

                            setSummary(bodyBooking);
                            localStorage.removeItem("booking");
                            dispatch(bookingClear());
                            localStorage.setItem('order', JSON.stringify(bodyBooking));
                            const d = new Date();
                            d.setDate(d.getDate() + 2)
                            dispatch(bookingAddDate({
                                startDate: new Date().toISOString(),
                                endDate: d.toISOString()
                            }));
                            dispatch(bookingAddDays(2));
                            dispatch(bookingAddAdults(2));
                            dispatch(bookingAddChildren(0));
                            setChecking(true);
                        }

                    }
                }
            } else { // Se ejecuta cuando el usuario recarga el navegador
                setSummary(JSON.parse(localStorage.getItem('order')));
                setChecking(true);
            }
        }
        fetchData();
    }, [dispatch, booking, searchParams, uid]);

    return (
        checking &&
        <Container className="animate__animated animate__fadeIn mb-5">
            <Card className="mt-4">
                <Card.Header as="h4">
                    Detalles de la reserva
                    <div className="vr ms-3 me-3"></div>
                    <button className="buttonLink" onClick={() => invoicePdf(name, summary)}>Imprimir Factura</button>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={12} sm={5}>
                            <Card.Title>Dirección de facturación</Card.Title>
                            <Card.Text>
                                {name}
                                <br />
                                {summary.user.billing.line1} {summary.user.billing.line2}
                                <br />
                                {summary.user.billing.postal_code}
                                <br />
                                {summary.user.billing.city} {summary.user.billing.state}
                                <br />
                                {summary.user.billing.country}
                            </Card.Text>
                        </Col>
                        <Col xs={12} sm={5} className="mt-4 mt-sm-0">
                            <Card.Title>Método de pago</Card.Title>
                            <Card.Text>
                                <Image className="mg-fluid" style={{ "height": "25px" }} src="https://images-na.ssl-images-amazon.com/images/G/30/checkout/payselect/card-logos-small/visa._CB658923706_.gif" />
                                <span> **** {summary.digits}</span>
                            </Card.Text>
                        </Col>
                        <Col xs={12} sm={2} className="mt-4 mt-sm-0">
                            <Card.Title>Importe total:</Card.Title>
                            <Card.Text>
                                <b>EUR {summary.total}</b>
                            </Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card key={summary.idBooking} className="justify-content-center">
                <Card.Body>
                    <Row className="align-items-center">
                        <Col xs={3} sm={3} md={2} className="d-flex justify-content-center align-items-center" style={{ "height": "8rem" }}>
                            <Image style={{ "maxHeight": "70%" }} src={summary.hotel.img ? summary.hotel.img : "/assets/no-image.png"} fluid />
                        </Col>
                        <Col xs={9} sm={9} md={4}>
                            <Link className="linkHotel" style={{ "fontSize": "18px" }} to={`/hoteles/${normalizeText(summary.hotel.name.replace(/\s+/g, "-"))}`}>{summary.hotel.name}</Link>
                            <div style={{ "fontWeight": "normal", "fontSize": "14px" }}>Estancia: {lightFormat(new Date(summary.booking.date.startDate), 'dd/MM/yyyy')} - {lightFormat(new Date(summary.booking.date.endDate), 'dd/MM/yyyy')} {`${summary.booking.days === 1 ? `(${summary.booking.days} noche)` : `(${summary.booking.days} noches)`}`}</div>
                            <b>{(summary.total)}€</b>
                        </Col>
                        <Col xs={12} sm={12} md={6} className="text-center mt-3">
                            <Button
                                variant="outline-secondary"
                                onClick={() => setModalShow(summary.idBooking)}
                            >
                                Escribir una opinión sobre la reserva
                            </Button>
                        </Col>
                    </Row>
                    <SummaryModal
                        id={summary.booking.idHotel}
                        setModalShow={setModalShow}
                        show={modalShow === summary.idBooking}
                        onHide={() => setModalShow("")}
                    />
                </Card.Body>
            </Card>
            <Button variant="warning" size="lg" onClick={() => navigate("/")} className="float-end mt-5 mb-5">Seguir buscando</Button>
        </Container>
    )
}