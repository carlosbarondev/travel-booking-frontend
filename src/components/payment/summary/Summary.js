import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { normalizeText } from 'normalize-text';

import { fetch_Token } from "../../../helpers/fetch";
import { SummaryModal } from "./SummaryModal";
import { invoicePdf } from "../../../helpers/invoicePdf";

export const Summary = () => {

    const [searchParams] = useSearchParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { uid, nombre } = useSelector(state => state.auth);
    const { carrito } = useSelector(state => state.cart);

    const [modalShow, setModalShow] = useState(false);
    const [checking, setChecking] = useState(false);
    const [resumen, setResumen] = useState();

    useEffect(() => {

        async function fetchData() {

            if (carrito.length > 0) { // Se ejecuta cuando el usuario llega desde la pantalla de pago

                const pago = await fetch_Token(`pagos/${searchParams.get("payment_intent")}`);

                const bodyPago = await pago.json();

                if (bodyPago.msg) { // Si hay errores
                    Swal.fire('Error', bodyPago.msg, 'error');
                } else {

                    const usuario = await fetch_Token(`pagos/usuario/${uid}`);

                    const bodyUsuario = await usuario.json();

                    if (bodyUsuario.msg) { // Si hay errores
                        Swal.fire('Error', bodyUsuario.msg, 'error');
                    } else {

                        const productoEnviar = carrito.map(prod => {
                            return {
                                unidades: prod.unidades,
                                producto: prod.producto._id
                            }
                        })

                        const pedido = await fetch_Token(`pedidos`, {
                            idPedido: searchParams.get("payment_intent"),
                            usuario: uid,
                            producto: productoEnviar,
                            fecha: new Date(bodyPago.paymentIntent.created * 1000),
                            direccionEnvio: bodyUsuario.customer.shipping,
                            direccionFacturacion: bodyUsuario.customer.address,
                            metodoPago: bodyPago.paymentIntent.charges.data[0].payment_method_details.card.brand,
                            digitos: bodyPago.paymentIntent.charges.data[0].payment_method_details.card.last4,
                            total: bodyPago.paymentIntent.amount
                        }, 'POST');

                        const bodyPedido = await pedido.json();

                        if (bodyPedido.msg) { // Si hay errores
                            Swal.fire('Error', bodyPedido.msg, 'error');
                        } else {
                            setResumen(bodyPedido);
                            localStorage.removeItem("carrito");
                            localStorage.setItem('pedido', JSON.stringify(bodyPedido));
                            setChecking(true);
                        }

                    }
                }
            } else { // Se ejecuta cuando el usuario recarga el navegador
                setResumen(JSON.parse(localStorage.getItem('pedido')));
                setChecking(true);
            }
        }
        fetchData();
    }, [carrito, dispatch, searchParams, uid]);

    return (
        checking &&
        <Container className="animate__animated animate__fadeIn mb-5">
            <Card className="mt-4">
                <Card.Header as="h4">
                    Detalles del pedido
                    <div className="vr ms-3 me-3"></div>
                    <button className="botonLink" onClick={() => invoicePdf(nombre, resumen)}>Imprimir Factura</button>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={12} sm={5}>
                            <Card.Title>Dirección de envío</Card.Title>
                            <Card.Text>
                                {resumen.direccionEnvio.name}
                                <br />
                                {resumen.direccionEnvio.address.line1} {resumen.direccionEnvio.address.line2}
                                <br />
                                {resumen.direccionEnvio.address.postal_code}
                                <br />
                                {resumen.direccionEnvio.address.city} {resumen.direccionEnvio.address.state}
                                <br />
                                {resumen.direccionEnvio.address.country}
                            </Card.Text>
                        </Col>
                        <Col xs={12} sm={5} className="mt-4 mt-sm-0">
                            <Card.Title>Método de pago</Card.Title>
                            <Card.Text>
                                <Image className="mg-fluid" style={{ "height": "25px" }} src="https://images-na.ssl-images-amazon.com/images/G/30/checkout/payselect/card-logos-small/visa._CB658923706_.gif" />
                                <span> **** {resumen.digitos}</span>
                            </Card.Text>
                        </Col>
                        <Col xs={12} sm={2} className="mt-4 mt-sm-0">
                            <Card.Title>Importe total:</Card.Title>
                            <Card.Text>
                                <b>EUR {resumen.total / 100}</b>
                            </Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {
                resumen.producto.map(prod => (
                    <Card key={prod.producto._id} className="justify-content-center">
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col xs={3} sm={3} md={2} className="d-flex justify-content-center align-items-center" style={{ "height": "8rem" }}>
                                    <Image style={{ "maxHeight": "70%" }} src={prod.producto.img ? prod.producto.img : "/assets/no-image.png"} fluid />
                                </Col>
                                <Col xs={9} sm={9} md={4}>
                                    <Link className="linkProducto" style={{ "fontSize": "18px" }} to={`/${normalizeText(prod.producto.categoria.nombre.replace(/\s+/g, "-"))}/${normalizeText(prod.producto.subcategoria.nombre.replace(/\s+/g, "-"))}/${normalizeText(prod.producto.nombre.replace(/\s+/g, "-"))}`}>{prod.producto.nombre}</Link>
                                    <div style={{ "fontWeight": "normal", "fontSize": "14px" }}>Cantidad: {prod.unidades}</div>
                                    <b>{(prod.producto.precio * prod.unidades).toFixed(2)} €</b>
                                </Col>
                                <Col xs={12} sm={12} md={6} className="text-center mt-3">
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setModalShow(prod.producto._id)}
                                    >
                                        Escribir una opinión sobre el producto
                                    </Button>
                                </Col>
                            </Row>
                            <SummaryModal
                                id={prod.producto._id}
                                setModalShow={setModalShow}
                                show={modalShow === prod.producto._id}
                                onHide={() => setModalShow("")}
                            />
                        </Card.Body>
                    </Card>
                ))
            }
            <Button variant="warning" size="lg" onClick={() => navigate("/")} className="float-end mt-5 mb-5">Seguir comprando</Button>
        </Container>
    )
}