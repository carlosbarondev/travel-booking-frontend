import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Image, Row, Tab, Tabs } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";
import { normalizeText } from 'normalize-text';
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { fetch_Token } from "../../../helpers/fetch";
import { SummaryModal } from "../../payment/summary/SummaryModal";
import { initBooking } from "../../../helpers/initBooking";

export const Ratings = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { uid } = useSelector(state => state.auth);
    const { booking } = useSelector(state => state.booking);

    const [valued, setValued] = useState();
    const [notValued, setNotValued] = useState();
    const [checking, setChecking] = useState(false);
    const [modalShowValued, setModalShowValued] = useState(false);
    const [modalShowNotValued, setModalShowNotValued] = useState(false);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetch_Token(`hotels/comment/${uid}`);
                const body = await resp.json();
                if (body.msg) {
                    return Swal.fire('Error', body.msg, 'error');
                } else {
                    setValued(body.valued);
                    setNotValued(body.notValued);
                    setChecking(true);
                }
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error.message, 'error');
            }
        }
        fetchData();
    }, [modalShowValued, modalShowNotValued, uid]);

    const handleDelete = (idHotel, idComment) => {
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
                        const resp = await fetch_Token(`hotels/comment/${uid}`, { idHotel, idComment }, 'DELETE');
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
                setModalShowNotValued(!modalShowNotValued);
            }
        })
    }

    const handleLink = (name) => {
        initBooking(booking, dispatch);
        navigate(`/hoteles/${normalizeText(name.replace(/\s+/g, "-"))}`);
    }

    return (
        checking && <div className="animate__animated animate__fadeIn mt-4 mb-5">
            <h3 className="mb-4">Mis Valoraciones</h3>
            <Tabs defaultActiveKey="sinvalorar" id="uncontrolled-tab" className="mb-5">
                <Tab eventKey="sinvalorar" title={`Sin valorar (${notValued.length})`}>
                    {
                        notValued.length <= 0
                            ? <div className="d-flex flex-column justify-content-center align-items-center">
                                <b>No hay hoteles disponibles para valorar</b>
                                <div>De momento no tienes ningún hotel por</div>
                                <div>valorar, pero te animamos a visitarnos</div>
                                <div>y valorar después de tu reserva</div>
                                <Button className="mt-3" variant="warning" onClick={() => navigate(`/`)}>Buscar hotel</Button>
                            </div>
                            : <TransitionGroup className="todo-list">
                                {
                                    notValued.map(op => (
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
                                                    <div className="linkHotel mb-1" style={{ "fontSize": "20px", "cursor": "pointer" }} onClick={() => handleLink(op.name)}>{op.name}</div>
                                                    <span className="d-flex align-items-center">
                                                        <Rating
                                                            className="me-2 mb-1"
                                                            style={{ "pointerEvents": "none" }}
                                                            size={20}
                                                            ratingValue={op.rating}
                                                            allowHover={false}
                                                        />
                                                        {` ${op.comments.length} Valoraciones`}
                                                    </span>
                                                    <div>
                                                        <Button
                                                            className="mt-3"
                                                            variant="outline-secondary"
                                                            size="sm"
                                                            onClick={() => setModalShowNotValued(op._id)}
                                                        >
                                                            <span className="disable-card-header">Escribir una opinión sobre la reserva</span>
                                                            <span className="enable-card-header">Valorar</span>
                                                        </Button>
                                                    </div>
                                                </Col>
                                                <hr className="mt-5" />
                                                <SummaryModal
                                                    id={op._id}
                                                    setModalShow={setModalShowNotValued}
                                                    show={modalShowNotValued === op._id}
                                                    onHide={() => setModalShowNotValued("")}
                                                />
                                            </Row>
                                        </CSSTransition>
                                    ))
                                }
                            </TransitionGroup>
                    }
                </Tab>
                <Tab eventKey="valorados" title={`Valorados (${valued.length})`}>
                    {
                        valued.length <= 0
                            ? <div className="d-flex flex-column justify-content-center align-items-center">
                                <b>No hay hoteles valorados</b>
                                <div>No has valorado ningún hotel, pero</div>
                                <div>puedes dejar tu valoración para</div>
                                <div>ayudar al resto de usuarios.</div>
                                <Button className="mt-3" variant="warning" onClick={() => navigate(`/`)}>Buscar hotel</Button>
                            </div>
                            : <TransitionGroup className="todo-list">
                                {
                                    valued.map(op => (
                                        <CSSTransition
                                            key={op.comments[0]._id}
                                            timeout={500}
                                            classNames="item"
                                        >
                                            <Row className="mt-4">
                                                <Col xs={1} xl={1}>
                                                </Col>
                                                <Col xs={3} xl={2} className="d-flex justify-content-center align-items-center" style={{ "height": "8rem" }}>
                                                    <Image style={{ "maxHeight": "80%" }} src={op.img ? op.img : "/assets/no-image.png"} fluid />
                                                </Col>
                                                <Col xs={8} xl={3} className="d-flex flex-column">
                                                    <div>
                                                        <div className="linkHotel mb-1" style={{ "fontSize": "20px", "cursor": "pointer" }} onClick={() => handleLink(op.name)}>{op.name}</div>
                                                    </div>
                                                    <div>
                                                        <Button
                                                            className="mt-2"
                                                            variant="outline-secondary"
                                                            size="sm"
                                                            onClick={() => setModalShowValued(op._id)}
                                                        >
                                                            Editar opinión de la reserva
                                                        </Button>
                                                    </div>
                                                    <div>
                                                        <Button
                                                            className="mt-3"
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => handleDelete(op._id, op.comments[0]._id)}
                                                        >
                                                            Eliminar opinión
                                                        </Button>
                                                    </div>
                                                </Col>
                                                <Col xs={12} xl={6} className="mt-4 mt-xl-0 ms-2 ms-xl-0">
                                                    <div>
                                                        <Rating
                                                            className="me-2"
                                                            style={{ "pointerEvents": "none", "marginBottom": "3px", "marginLeft": "-5px" }}
                                                            size={20}
                                                            ratingValue={op.comments[0].rating}
                                                            allowHover={false}
                                                        />
                                                        <div className="fw-bold align-middle" style={{ "fontSize": "16px", "display": "inline" }}>{`${op.comments[0].title}`}</div>
                                                    </div>
                                                    <div className="text-muted" style={{ "fontSize": "14px" }}>{`${new Date(op.comments[0].date).toLocaleDateString("es-ES", options)}`}</div>
                                                    <div className="mt-3" style={{ "whiteSpace": "pre-wrap" }}>{`${op.comments[0].text}`}</div>
                                                </Col>
                                                <hr className="mt-5" />
                                                <SummaryModal
                                                    id={op._id}
                                                    setModalShow={setModalShowValued}
                                                    show={modalShowValued === op._id}
                                                    onHide={() => setModalShowValued("")}
                                                    oldTitle={op.comments[0]?.title || null}
                                                    oldText={op.comments[0]?.text || null}
                                                    oldRating={op.comments[0]?.rating || null}
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