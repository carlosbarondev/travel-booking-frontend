import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { normalizeText } from 'normalize-text';

import { fetch_Token } from "../../../helpers/fetch";
import { ProductAddModal } from "./ProductAddModal";


export const Products = () => {

    const navigate = useNavigate();

    const [categorias, setCategorias] = useState(false);
    const [productos, setProductos] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetch_Token(`productos?visibles=${`{"estado": {"$in" : ["true", "false"]}}`}&ordenar=""`);
                const body = await resp.json();
                setProductos(body.productos);
                const resp2 = await fetch_Token(`categorias?visibles=${`{"estado": {"$in" : ["true", "false"]}}`}&ordenar=""`);
                const body2 = await resp2.json();
                setCategorias(body2.categorias);
                setChecking(true);
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error.message, 'error');
            }
        }
        fetchData();
    }, []);

    return (
        checking && <div className="animate__animated animate__fadeIn mt-4 mb-5">
            <h3>Gestión de Productos</h3>
            <Card className="mt-4">
                <Card.Header>
                    <Row className="align-items-center">
                        <Col xs={5} sm={4} md={4}>
                            Nombre
                        </Col>
                        <Col xs={0} sm={0} md={2} className="disable-card-header">
                            Ventas
                        </Col>
                        <Col xs={3} sm={4} md={2}>
                            Estado
                        </Col>
                        <Col xs={4} sm={4} md={4}>
                        </Col>
                    </Row>
                </Card.Header>
                <ListGroup variant="flush">
                    {
                        productos.map(prod =>
                            <ListGroup.Item key={prod._id}>
                                <Row className="align-items-center">
                                    <Col xs={5} sm={4} md={4}>
                                        <Link
                                            className="linkProducto"
                                            to={`/${normalizeText(prod.categoria.nombre.replace(/\s+/g, "-"))}/${normalizeText(prod.subcategoria.nombre.replace(/\s+/g, "-"))}/${normalizeText(prod.nombre.replace(/\s+/g, "-"))}`}>
                                            {prod.nombre}
                                        </Link>
                                    </Col>
                                    <Col xs={0} sm={0} md={2} className="disable-card-header">
                                        {prod.vendido}
                                    </Col>
                                    <Col xs={3} sm={4} md={2}>
                                        {
                                            prod.estado ? <span className="text-success">Activo</span> : <span className="text-danger">Deshabilitado</span>
                                        }
                                    </Col>
                                    <Col xs={4} sm={4} md={4} className="mt-2 mt-sm-0">
                                        <div className="d-grid">
                                            <Button
                                                className="me-1"
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => navigate(`/panel/productos/${normalizeText(prod.nombre.replace(/\s+/g, '-'))}`)}
                                            >
                                                Editar
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )
                    }
                </ListGroup>
            </Card>
            <Button className="mt-4" onClick={() => setModalShow("open")}>
                Agregar Producto
            </Button>
            <ProductAddModal
                categorias={categorias}
                setModalShow={setModalShow}
                show={modalShow === "open"}
                onHide={() => setModalShow("")}
            />
        </div>
    )
}