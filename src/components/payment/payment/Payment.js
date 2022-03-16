import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Col, ListGroup, Row, Spinner } from "react-bootstrap";

import "./payment.css";
import { PaymentForm } from "./PaymentForm";
import { fetch_Token } from "../../../helpers/fetch";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51KZH9rK7t3f78Hp2q0mtyopW0RtVqrg0MxOhtmG7KCKeYZMyuEZjsrFrCcWEhSjB6rQY9EkAxBLoxB3fl6o0iMf400VxcbHZvO");


export const Payment = () => {

    const location = useLocation();
    const { phone, billing } = location.state;

    const { uid, email, name } = useSelector(state => state.auth);
    const { booking } = useSelector(state => state.booking);

    const [clientSecret, setClientSecret] = useState("");
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch_Token(`payments/${uid}`, { email, name, phone, billing, idHotel: booking.idHotel, items: booking }, 'POST')
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
                setChecking(true);
            });
    }, [uid, email, name, phone, billing, booking]);

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    };

    const copyText = (entryText) => {
        navigator.clipboard.writeText(entryText);
    }

    return (
        checking
            ? <div className="d-flex justify-content-center mt-2 mt-sm-5 animate__animated animate__fadeIn mb-5">
                <Row>
                    <Col xs={12} lg={5} className="align-self-center mb-4">
                        <div className='d-flex justify-content-center'>
                            <div>
                                <h4>Tarjetas Test Stripe</h4>
                                <ul>
                                    <li>La web utiliza Stripe como método de pago</li>
                                    <li><strong>Los pagos son reales</strong></li>
                                    <li>Stripe pone a disposición  del usuario las siguientes tarjetas para realizar los test de funcionamiento</li>
                                </ul>
                                <div className='d-flex justify-content-center'>
                                    <ListGroup className='mt-3'>
                                        <ListGroup.Item className='border-0'>
                                            <div className="d-flex">
                                                <div style={{ "width": "35px" }}>
                                                    <i className="fa-solid fa-check fa-xl me-2"></i>
                                                </div>
                                                <b> El pago se efectúa correctamente</b>
                                            </div>
                                            <div className='mt-2 ms-5'>
                                                Número de tarjeta:
                                                <span className="ms-4 float-end text-primary">
                                                    4242 4242 4242 4242
                                                    <button className="ms-2 buttonClipboard" onClick={() => copyText('4242 4242 4242 4242')}><i className="fa-solid fa-clipboard"></i></button>
                                                </span>
                                            </div>
                                            <div className='ms-5'>
                                                Caducidad:
                                                <span className="float-end text-primary">
                                                    Cualquier fecha futura
                                                </span>
                                            </div>
                                            <div className='ms-5'>
                                                CVC:
                                                <span className="float-end text-primary">
                                                    Cualquier número CVC aleatorio
                                                </span>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item className='border-0'>
                                            <div className="d-flex">
                                                <div style={{ "width": "35px" }}>
                                                    <i className="fa-solid fa-exclamation fa-xl ms-1 me-2"></i>
                                                </div>
                                                <b> El pago requiere autenticación</b>
                                            </div>
                                            <div className='mt-2 ms-5'>
                                                Número de tarjeta:
                                                <span className="ms-4 float-end">
                                                    <span>4000 0025 0000 3155</span>
                                                </span>
                                            </div>
                                            <div className='ms-5'>Caducidad: <span className="float-end">Cualquier fecha futura</span></div>
                                            <div className='ms-5'>CVC: <span className="float-end">Cualquier número CVC aleatorio</span></div>
                                        </ListGroup.Item>
                                        <ListGroup.Item className='border-0'>
                                            <div className="d-flex">
                                                <div style={{ "width": "35px" }}>
                                                    <i className="fa-solid fa-xmark fa-xl me-2"></i>
                                                </div>
                                                <b> Se rechaza el pago</b>
                                            </div>
                                            <div className='mt-2 ms-5'>
                                                Número de tarjeta:
                                                <span className="ms-4 float-end">
                                                    4000 0000 0000 9995
                                                </span>
                                            </div>
                                            <div className='ms-5'>Caducidad: <span className="float-end">Cualquier fecha futura</span></div>
                                            <div className='ms-5'>CVC: <span className="float-end">Cualquier número CVC aleatorio</span></div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} lg={7}>
                        <div className='d-flex justify-content-center mt-2 ms-4'>
                            <div className="Checkout">
                                {clientSecret && (
                                    <Elements options={options} stripe={stripePromise}>
                                        <PaymentForm />
                                    </Elements>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            : <div className="d-flex justify-content-center align-items-center" style={{ "height": "25rem" }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
    );
}