import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, Col, FormControl, FormGroup, FormLabel, FormText, Image, ListGroup, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { normalizeText, normalizeWhiteSpaces } from 'normalize-text';

import { fetch_Token } from '../../../helpers/fetch';
import { imageUpload } from '../../../helpers/imageUpload';
import { RoomAddModal } from './RoomAddModal';
import { RoomUpdateModal } from './RoomUpdateModal';

const MyTextInput = ({ label, type, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <FormGroup className="mt-2">
            <FormLabel as="h5" htmlFor={props.id || props.name}>{label}</FormLabel>
            <FormControl as={type} {...field} {...props} />
            {meta.touched && meta.error ? (
                <FormText className='text-danger'>{meta.error}</FormText>
            ) : null}
        </FormGroup>
    );
};

export const HotelDetail = () => {

    const { HotelName } = useParams();
    const navigate = useNavigate();

    const [hotel, setHotel] = useState();
    const [rooms, setRooms] = useState();
    const [fileUpload, setFileUpload] = useState();
    const [fileUpload1, setFileUpload1] = useState();
    const [fileUpload2, setFileUpload2] = useState();
    const [fileUpload3, setFileUpload3] = useState();
    const [checking, setChecking] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalShowAdd, setModalShowAdd] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetch_Token(`hotels/${HotelName.replace(/-/g, " ")}`);
                const body = await resp.json();
                setHotel(body.hotel);
                console.log(body)
                const resp2 = await fetch_Token(`rooms/?visible={"hotel":"${body.hotel._id}"}`);
                const body2 = await resp2.json();
                setRooms(body2.rooms);
                setChecking(true);
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error.message, 'error');
            }
        }
        fetchData();
    }, [HotelName]);

    const handleDelete = async () => {
        if (hotel.disable) {
            try {
                if (hotel.state) {
                    await fetch_Token(`hotels/${hotel._id}`, {}, 'DELETE');
                    setHotel(oldState => ({ ...oldState, state: false }));
                    Swal.fire('Hotel deshabilitado', "", 'success');
                } else {
                    await fetch_Token(`hotels/${hotel._id}`, { state: true }, 'PUT');
                    setHotel(oldState => ({ ...oldState, state: true }));
                    Swal.fire('Hotel habilitado', "", 'success');
                }
            } catch (error) {
                console.log(error.message);
                return Swal.fire('Error', error.message, 'error');
            }
        } else {
            Swal.fire('Hotel bloqueado', "El webmaster ha bloqueado este hotel", 'info');
        }
    }

    const handleSubmit = async (values) => {
        const send = await fetch_Token(`hotels/${hotel._id}`, {
            name: normalizeWhiteSpaces(values.name.replace(/-/g, " ")),
            stars: values.stars,
            description: values.description,
            country: values.country,
            city: values.city,
            doublePrice: values.doublePrice,
            familyPrice: values.familyPrice,
            suitePrice: values.suitePrice,
        }, 'PUT');
        const body = await send.json();
        if (body.msg) { // Si hay errores
            Swal.fire('Error', body.msg, 'error');
        } else {
            if (fileUpload) {
                handleUploadImage(fileUpload, "hotels");
            }
            if (fileUpload1) {
                handleUploadImage(fileUpload1, "rooms", "doubleRoom");
            }
            if (fileUpload2) {
                handleUploadImage(fileUpload2, "rooms", "familyRoom");
            }
            if (fileUpload3) {
                handleUploadImage(fileUpload3, "rooms", "suiteRoom");
            }
            setHotel(body);
            Swal.fire('Hotel actualizado', "", 'success');
            navigate(`/panel/hoteles/${normalizeText(body.name.replace(/\s+/g, '-'))}`, { replace: true });
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    }

    const handleUploadImage = (fileUpload, collection, roomType) => {
        if (fileUpload) {
            imageUpload(fileUpload, hotel._id, collection, roomType)
                .then((data) => {
                    if (data.msg) {
                        Swal.fire('Error', data.msg, 'error')
                    } else {
                        setHotel(data);
                    }
                })
                .catch(error => Swal.fire('Error', error, 'error'));
        }
    }

    const handleRoomDelete = async (id, state, disable) => {
        if (disable) {
            try {
                await fetch_Token(`rooms/${id}`, { state: !state }, 'PUT');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error.message, 'error');
            }
        } else {
            Swal.fire('Habitación bloqueada', "El webmaster ha bloqueado esta habitación", 'info');
        }
    }

    return (
        checking && <div className="animate__animated animate__fadeIn mt-4 mb-5">
            <Formik
                initialValues={{
                    name: hotel.name,
                    stars: hotel.stars,
                    description: hotel.description,
                    country: hotel.country,
                    city: hotel.city,
                    doublePrice: hotel.doubleRoom.price,
                    familyPrice: hotel.familyRoom.price,
                    suitePrice: hotel.suiteRoom.price,
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(2, '2 caracteres como mínimo')
                        .max(34, '34 caracteres como máximo')
                        .required('El nombre es obligatorio'),
                    stars: Yup.number()
                        .min(1, '1 estrella como mínimo')
                        .max(5, '5 estrellas como máximo')
                        .typeError('Debe especificar un número')
                        .required('Las estrellas son obligatorias'),
                    description: Yup.string()
                        .min(2, '2 caracteres como mínimo')
                        .max(2000, '2000 caracteres como máximo')
                        .required('La descripción es obligatoria'),
                    country: Yup.string()
                        .min(2, '2 caracteres como mínimo')
                        .max(34, '34 caracteres como máximo')
                        .required('El país es obligatorio'),
                    city: Yup.string()
                        .min(2, '2 caracteres como mínimo')
                        .max(34, '34 caracteres como máximo')
                        .required('La ciudad es obligatoria'),
                    doublePrice: Yup.number()
                        .typeError('Debe especificar un número')
                        .required('El precio de la habitación doble es obligatorio'),
                    familyPrice: Yup.number()
                        .typeError('Debe especificar un número')
                        .required('El precio de la habitación familiar es obligatorio'),
                    suitePrice: Yup.number()
                        .typeError('Debe especificar un número')
                        .required('El precio de la habitación suite es obligatorio'),
                })}
                onSubmit={handleSubmit}
            >
                <Form>
                    <h3 className="mb-3">Editar Hotel</h3>
                    <Row>
                        <Col xs={12} lg={8}>
                            <Row className='pe-5'>
                                <Col>
                                    <MyTextInput
                                        label="Nombre"
                                        name="name"
                                    />
                                </Col>
                                <Col>
                                    <MyTextInput
                                        label="Estrellas"
                                        name="stars"
                                    />
                                </Col>
                            </Row>
                            <Row className='mb-4 mb-lg-0 pe-5'>
                                <FormGroup id="fileUpload" controlId="formFile" className="mt-4">
                                    <FormLabel style={{ "marginBottom": "-1px" }}><h5>Imagen</h5></FormLabel>
                                    <FormControl
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => setFileUpload(event)}
                                    />
                                </FormGroup>
                            </Row>
                        </Col>
                        <Col xs={12} lg={4} className="d-flex justify-content-center align-items-center">
                            <div style={{ "height": "14rem" }}>
                                <Image className="mh-100" src={hotel.img ? hotel.img : "/assets/no-image.png"} />
                            </div>
                        </Col>
                    </Row>
                    <MyTextInput
                        label="Descripción"
                        name="description"
                        type="textarea"
                        rows="6"
                    />
                    <Row className='mt-3'>
                        <Col>
                            <MyTextInput
                                label="País"
                                name="country"
                            />
                        </Col>
                        <Col>
                            <MyTextInput
                                label="Ciudad"
                                name="city"
                            />
                        </Col>
                    </Row>
                    <div className="d-grid mt-4">
                        <Button type="submit">
                            Actualizar
                        </Button>
                    </div>
                    <h3 className='mt-5'>Tipo de Habitaciones</h3>
                    <h4 className='mt-5'>Doble</h4>
                    <Row>
                        <Col xs={12} lg={8}>
                            <Row className='pe-5'>
                                <MyTextInput
                                    label="Precio"
                                    name="doublePrice"
                                />
                            </Row>
                            <Row className='mb-4 mb-lg-0 pe-5'>
                                <FormGroup id="fileUpload1" controlId="formFile" className="mt-4">
                                    <FormLabel style={{ "marginBottom": "-1px" }}><h5>Imagen</h5></FormLabel>
                                    <FormControl
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => setFileUpload1(event)}
                                    />
                                </FormGroup>
                            </Row>
                        </Col>
                        <Col xs={12} lg={4} className="d-flex justify-content-center align-items-center">
                            <div style={{ "height": "6rem" }}>
                                <Image className="mh-100" src={hotel.doubleRoom.img ? hotel.doubleRoom.img : "/assets/no-image.png"} />
                            </div>
                        </Col>
                    </Row>
                    <h4 className='mt-5'>Familiar</h4>
                    <Row>
                        <Col xs={12} lg={8}>
                            <Row className='pe-5'>
                                <MyTextInput
                                    label="Precio"
                                    name="familyPrice"
                                />
                            </Row>
                            <Row className='mb-4 mb-lg-0 pe-5'>
                                <FormGroup id="fileUpload2" controlId="formFile" className="mt-4">
                                    <FormLabel style={{ "marginBottom": "-1px" }}><h5>Imagen</h5></FormLabel>
                                    <FormControl
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => setFileUpload2(event)}
                                    />
                                </FormGroup>
                            </Row>
                        </Col>
                        <Col xs={12} lg={4} className="d-flex justify-content-center align-items-center">
                            <div style={{ "height": "6rem" }}>
                                <Image className="mh-100" src={hotel.familyRoom.img ? hotel.familyRoom.img : "/assets/no-image.png"} />
                            </div>
                        </Col>
                    </Row>
                    <h4 className='mt-5'>Suite</h4>
                    <Row>
                        <Col xs={12} lg={8}>
                            <Row className='pe-5'>
                                <MyTextInput
                                    label="Precio"
                                    name="suitePrice"
                                />
                            </Row>
                            <Row className='mb-4 mb-lg-0 pe-5'>
                                <FormGroup id="fileUpload3" controlId="formFile" className="mt-4">
                                    <FormLabel style={{ "marginBottom": "-1px" }}><h5>Imagen</h5></FormLabel>
                                    <FormControl
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => setFileUpload3(event)}
                                    />
                                </FormGroup>
                            </Row>
                        </Col>
                        <Col xs={12} lg={4} className="d-flex justify-content-center align-items-center">
                            <div style={{ "height": "6rem" }}>
                                <Image className="mh-100" src={hotel.suiteRoom.img ? hotel.suiteRoom.img : "/assets/no-image.png"} />
                            </div>
                        </Col>
                    </Row>
                    <div className="d-grid mt-5">
                        <Button type="submit">
                            Actualizar
                        </Button>
                    </div>
                    <h5 className='mt-5'>Habitaciones</h5>
                    <ListGroup variant="flush">
                        {
                            rooms.length !== 0
                                ? rooms.map(room =>
                                    <ListGroup.Item key={room.roomId}>
                                        <Row className="align-items-center">
                                            <Col xs={3} sm={3} md={3}>
                                                {
                                                    room.roomId
                                                }
                                            </Col>
                                            <Col xs={2} sm={2} md={2}>
                                                {
                                                    room.category
                                                }
                                            </Col>
                                            <Col xs={0} sm={0} md={3} className="disable-card-header">
                                                {
                                                    room.state ? <span className="text-success">Activa</span> : <span className="text-danger">Deshabilitada</span>
                                                }
                                            </Col>
                                            <Col xs={7} sm={7} md={4}>
                                                <div className="d-flex">
                                                    <Button
                                                        className="me-1 flex-grow-1"
                                                        variant="outline-primary"
                                                        size="sm"
                                                        onClick={() => setModalShow(room.roomId)}
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button
                                                        className="flex-grow-1"
                                                        variant={room.state ? "outline-danger" : "outline-success"}
                                                        size="sm"
                                                        onClick={() => handleRoomDelete(room._id, room.state, room.disable)}
                                                    >
                                                        {
                                                            room.state ? "Eliminar" : "Habilitar"
                                                        }
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                        <RoomUpdateModal
                                            room={room}
                                            hotel={hotel}
                                            setModalShow={setModalShow}
                                            show={modalShow === room.roomId}
                                            onHide={() => setModalShow("")}
                                        />
                                    </ListGroup.Item>
                                )
                                : <ListGroup.Item>
                                    No tiene habitaciones
                                </ListGroup.Item>
                        }
                    </ListGroup>
                    <Button className="mt-2 mb-2" onClick={() => setModalShowAdd("openSub")}>
                        Agregar Habitación
                    </Button>
                    <h5 className="mt-4 mb-2">Estado: {
                        hotel.state ? <span className="text-success">Activo</span> : <span className="text-danger">Deshabilitado</span>
                    }</h5>
                    <Button
                        variant={hotel.state ? "danger" : "success"}
                        onClick={() => handleDelete()}
                    >
                        {
                            hotel.state ? "Eliminar" : "Activar"
                        }
                    </Button>
                </Form>
            </Formik>
            <RoomAddModal
                hotel={hotel}
                setModalShowAdd={setModalShowAdd}
                show={modalShowAdd === "openSub"}
                onHide={() => setModalShowAdd("")}
            />
        </div>
    );
}