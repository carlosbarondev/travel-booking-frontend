import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Image, Row, Tab, Tabs } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";
import { normalizeText } from 'normalize-text';
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { fetch_Token } from "../../../helpers/fetch";
import { SummaryModal } from "../../payment/summary/SummaryModal";

export const Ratings = () => {

    const navigate = useNavigate();

    const { uid } = useSelector(state => state.auth);

    const [valorados, setValorados] = useState();
    const [noValorados, setNovalorados] = useState();
    const [checking, setChecking] = useState(false);
    const [modalShowValorados, setModalShowValorados] = useState(false);
    const [modalShowNoValorados, setModalShowNoValorados] = useState(false);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetch_Token(`productos/valoraciones/${uid}`);
                const body = await resp.json();
                if (body.msg) {
                    return Swal.fire('Error', body.msg, 'error');
                } else {
                    setValorados(body.valorados);
                    setNovalorados(body.noValorados);
                    setChecking(true);
                }
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error.message, 'error');
            }
        }
        fetchData();
    }, [modalShowValorados, modalShowNoValorados, uid]);

    const handleDelete = (idProducto, idComentario) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado',
                    'El comentario ha sido eliminado',
                    'success'
                )
                async function fetchData() {
                    try {
                        const resp = await fetch_Token(`productos/valoraciones/${uid}`, { idProducto, idComentario }, 'DELETE');
                        const body = await resp.json();
                        if (body.msg) {
                            return Swal.fire('Error', body.msg, 'error');
                        }
                    } catch (error) {
                        console.log(error);
                        return Swal.fire('Error', error, 'error');
                    }
                }
                fetchData();
                setModalShowNoValorados(!modalShowNoValorados);
            }
        })
    }

    return (
        checking && <div className="animate__animated animate__fadeIn mt-4 mb-5">
            <h3 className="mb-4">Mis Valoraciones</h3>
            <Tabs defaultActiveKey="sinvalorar" id="uncontrolled-tab" className="mb-5">
                <Tab eventKey="sinvalorar" title={`Sin valorar (${noValorados.length})`}>
                    {
                        noValorados.length <= 0
                            ? <div className="centrar">
                                <b>No hay productos disponibles para valorar</b>
                                <div>De momento no tienes ningún producto por</div>
                                <div>valorar, pero te animamos a ver nuestro</div>
                                <div>catálogo de productos y valorar después de tu</div>
                                <div>compra.</div>
                                <Button className="mt-3" variant="warning" onClick={() => navigate(`/`)}>Ver el catálogo</Button>
                            </div>
                            : <TransitionGroup className="todo-list">
                                {
                                    noValorados.map(op => (
                                        <CSSTransition
                                            key={op._id}
                                            timeout={500}
                                            classNames="item"
                                        >
                                            <Row className="align-items-center mt-4">
                                                <Col xs={1} sm={1} md={1}>
                                                </Col>
                                                <Col xs={3} sm={3} md={2} className="d-flex justify-content-center align-items-center" style={{ "height": "8rem" }}>
                                                    <Image style={{ "maxHeight": "80%" }} src={op.img ? op.img : "/assets/no-image.png"} fluid />
                                                </Col>
                                                <Col xs={8} sm={8} md={9} className="d-flex flex-column align-self-center">
                                                    <Link className="linkProducto mb-1" style={{ "fontSize": "20px" }} to={`/${normalizeText(op.categoria.nombre.replace(/\s+/g, "-"))}/${normalizeText(op.subcategoria.nombre.replace(/\s+/g, "-"))}/${normalizeText(op.nombre.replace(/\s+/g, "-"))}`}>{op.nombre}</Link>
                                                    <span className="d-flex align-items-center">
                                                        <Rating
                                                            className="me-2 mb-1"
                                                            style={{ "pointerEvents": "none" }}
                                                            size={20}
                                                            ratingValue={op.rating}
                                                            allowHover={false}
                                                        />
                                                        {` ${op.opinion.length} Valoraciones`}
                                                    </span>
                                                    <div>
                                                        <Button
                                                            className="mt-3"
                                                            variant="outline-secondary"
                                                            size="sm"
                                                            onClick={() => setModalShowNoValorados(op._id)}
                                                        >
                                                            <span className="disable-card-header">Escribir una opinión sobre el producto</span>
                                                            <span className="enable-card-header">Valorar</span>
                                                        </Button>
                                                    </div>
                                                </Col>
                                                <hr className="mt-5" />
                                                <SummaryModal
                                                    id={op._id}
                                                    setModalShow={setModalShowNoValorados}
                                                    show={modalShowNoValorados === op._id}
                                                    onHide={() => setModalShowNoValorados("")}
                                                />
                                            </Row>
                                        </CSSTransition>
                                    ))
                                }
                            </TransitionGroup>
                    }
                </Tab>
                <Tab eventKey="valorados" title={`Valorados (${valorados.length})`}>
                    {
                        valorados.length <= 0
                            ? <div className="centrar">
                                <b>No hay productos valorados</b>
                                <div>No has valorado ningún producto, pero</div>
                                <div>puedes visitar cualquier producto y dejar tu</div>
                                <div>valoración para ayudar al resto de usuarios.</div>
                                <Button className="mt-3" variant="warning" onClick={() => navigate(`/`)}>Ver el catálogo</Button>
                            </div>
                            : <TransitionGroup className="todo-list">
                                {
                                    valorados.map(op => (
                                        <CSSTransition
                                            key={op.opinion[0]._id}
                                            timeout={500}
                                            classNames="item"
                                        >
                                            <Row className="mt-4">
                                                <Col xs={3} sm={3} md={3} lg={3} xl={2} className="d-flex justify-content-center align-items-center" style={{ "height": "8rem" }}>
                                                    <Image style={{ "maxHeight": "80%" }} src={op.img ? op.img : "/assets/no-image.png"} fluid />
                                                </Col>
                                                <Col xs={9} sm={9} md={9} lg={9} xl={3} className="d-flex flex-column">
                                                    <div>
                                                        <Link className="linkProducto mb-1" style={{ "fontSize": "20px" }} to={`/${normalizeText(op.categoria.nombre.replace(/\s+/g, "-"))}/${normalizeText(op.subcategoria.nombre.replace(/\s+/g, "-"))}/${normalizeText(op.nombre.replace(/\s+/g, "-"))}`}>{op.nombre}</Link>
                                                    </div>
                                                    <div>
                                                        <Button
                                                            className="mt-2"
                                                            variant="outline-secondary"
                                                            size="sm"
                                                            onClick={() => setModalShowValorados(op._id)}
                                                        >
                                                            Editar opinión del producto
                                                        </Button>
                                                    </div>
                                                    <div>
                                                        <Button
                                                            className="mt-3"
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => handleDelete(op._id, op.opinion[0]._id)}
                                                        >
                                                            Eliminar opinión
                                                        </Button>
                                                    </div>
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={12} xl={7} className="mt-4 mt-xl-0">
                                                    <div>
                                                        <Rating
                                                            className="me-2"
                                                            style={{ "pointerEvents": "none", "marginBottom": "3px", "marginLeft": "-5px" }}
                                                            size={20}
                                                            ratingValue={op.opinion[0].rating}
                                                            allowHover={false}
                                                        />
                                                        <div className="fw-bold align-middle" style={{ "fontSize": "16px", "display": "inline" }}>{`${op.opinion[0].titulo}`}</div>
                                                    </div>
                                                    <div className="text-muted" style={{ "fontSize": "14px" }}>{`${new Date(op.opinion[0].fecha).toLocaleDateString("es-ES", options)}`}</div>
                                                    <div className="mt-3" style={{ "whiteSpace": "pre-wrap" }}>{`${op.opinion[0].comentario}`}</div>
                                                </Col>
                                                <hr className="mt-5" />
                                                <SummaryModal
                                                    id={op._id}
                                                    setModalShow={setModalShowValorados}
                                                    show={modalShowValorados === op._id}
                                                    onHide={() => setModalShowValorados("")}
                                                    oldTitulo={op.opinion[0]?.titulo || null}
                                                    oldComentario={op.opinion[0]?.comentario || null}
                                                    oldRating={op.opinion[0]?.rating || null}
                                                />
                                            </Row>
                                        </CSSTransition>
                                    ))
                                }
                            </TransitionGroup>
                    }
                </Tab>
            </Tabs>
        </div >
    );
};