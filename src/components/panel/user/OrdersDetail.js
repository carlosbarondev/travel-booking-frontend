import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { normalizeText } from 'normalize-text';

import { invoicePdf } from "../../../helpers/invoicePdf";
import { SummaryModal } from "../../payment/summary/SummaryModal";

export const OrdersDetail = () => {

    const location = useLocation();
    const { pedido } = location.state;

    const { nombre } = useSelector(state => state.auth);

    const [modalShow, setModalShow] = useState(false);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <Container className="animate__animated animate__fadeIn mb-5">
            <Card className="mt-4">
                <Card.Header as="h4">
                    Detalles del pedido
                    <div className="vr ms-3 me-3"></div>
                    <button className="botonLink" onClick={() => invoicePdf(nombre, pedido)}>Imprimir Factura</button>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={12} sm={4}>
                            <Card.Title>Dirección de facturación</Card.Title>
                            <Card.Text>
                                {nombre}
                                <br />
                                {pedido.direccionFacturacion.line1} {pedido.direccionFacturacion.line2}
                                <br />
                                {pedido.direccionFacturacion.postal_code}
                                <br />
                                {pedido.direccionFacturacion.city} {pedido.direccionFacturacion.state}
                                <br />
                                {pedido.direccionFacturacion.country}
                            </Card.Text>
                        </Col>
                        <Col xs={12} sm={3} className="mt-4 mt-sm-0">
                            <Card.Title>Dirección de envío</Card.Title>
                            <Card.Text>
                                {pedido.direccionEnvio.name}
                                <br />
                                {pedido.direccionEnvio.address.line1} {pedido.direccionEnvio.address.line2}
                                <br />
                                {pedido.direccionEnvio.address.postal_code}
                                <br />
                                {pedido.direccionEnvio.address.city} {pedido.direccionEnvio.address.state}
                                <br />
                                {pedido.direccionEnvio.address.country}
                            </Card.Text>
                        </Col>
                        <Col xs={12} sm={3} className="mt-4 mt-sm-0">
                            <Card.Title>Método de pago</Card.Title>
                            <Card.Text>
                                <Image className="mg-fluid" style={{ "height": "25px" }} src="https://images-na.ssl-images-amazon.com/images/G/30/checkout/payselect/card-logos-small/visa._CB658923706_.gif" />
                                <span> **** {pedido.digitos}</span>
                            </Card.Text>
                            <Card.Title>Fecha</Card.Title>
                            <Card.Text>
                                {new Date(pedido.fecha).toLocaleDateString("es-ES", options)}
                            </Card.Text>
                        </Col>
                        <Col xs={12} sm={2} className="mt-4 mt-sm-0">
                            <Card.Title>Total:</Card.Title>
                            <Card.Text>
                                <b>EUR {pedido.total / 100}</b>
                            </Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {
                pedido.producto.map(prod => (
                    <Card key={prod.producto._id}>
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col xs={3} sm={3} md={2} className="d-flex justify-content-center align-items-center" style={{ "height": "8rem" }}>
                                    <Image style={{ "maxHeight": "70%" }} src={prod.producto.img ? prod.producto.img : "/assets/no-image.png"} fluid />
                                </Col>
                                <Col xs={9} sm={9} md={5}>
                                    <Link className="linkProducto" style={{ "fontSize": "18px" }} to={`/${normalizeText(prod.producto.categoria.nombre.replace(/\s+/g, "-"))}/${normalizeText(prod.producto.subcategoria.nombre.replace(/\s+/g, "-"))}/${normalizeText(prod.producto.nombre.replace(/\s+/g, "-"))}`}>{prod.producto.nombre}</Link>
                                    <div style={{ "fontWeight": "normal", "fontSize": "14px" }}>Cantidad: {prod.unidades}</div>
                                    <b>{prod.producto.precio * prod.unidades} €</b>
                                </Col>
                                <Col xs={12} sm={12} md={5} className="text-center mt-3">
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => setModalShow(prod.producto._id)}
                                    >
                                        Editar opinión sobre el producto
                                    </Button>
                                </Col>
                            </Row>
                            <SummaryModal
                                id={prod.producto._id}
                                setModalShow={setModalShow}
                                show={modalShow === prod.producto._id}
                                onHide={() => setModalShow("")}
                                oldTitulo={prod.producto.opinion[0]?.titulo}
                                oldComentario={prod.producto.opinion[0]?.comentario}
                                oldRating={prod.producto.opinion[0]?.rating}
                            />
                        </Card.Body>
                    </Card>
                ))
            }
        </Container>
    )
}