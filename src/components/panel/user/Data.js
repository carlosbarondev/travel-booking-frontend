import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, useField } from "formik";
import * as Yup from 'yup';
import { Button, Col, FormControl, FormGroup, FormLabel, FormText, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import ReactRoundedImage from "react-rounded-image";

import { fetch_Token } from "../../../helpers/fetch";
import { changeImage, changeName } from "../../../actions/auth";
import { imageUpload } from '../../../helpers/imageUpload';

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

export const Data = () => {

    const dispatch = useDispatch();

    const { name, uid, img } = useSelector(state => state.auth);

    const [fileUpload, setFileUpload] = useState();

    const postData = async (name, password) => {
        try {
            const resp = await fetch_Token(`users/${uid}`, {
                name,
                password
            }, 'PUT');
            const body = await resp.json();
            if (body.msg) {
                return Swal.fire('Error', body.msg, 'error');
            } else {
                dispatch(changeName(name));
                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());
                return Swal.fire('Datos actualizados', '', 'success');
            }
        } catch (error) {
            console.log(error);
            return Swal.fire('Error', error.message, 'error');
        }
    }

    const handleSubmit = async (values) => {
        if (values.password !== values.password2) {
            return Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
        } else {
            try {
                if (fileUpload) { // Actualizar la imagen en el token antes de recibirlo
                    handleUploadImage(values.name, values.password);
                } else {
                    postData(values.name, values.password);
                }
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error.message, 'error');
            }
        }
    }

    const handleUploadImage = async (name, password) => {
        if (fileUpload) {
            imageUpload(fileUpload, uid, "users")
                .then((data) => {
                    if (data.msg) {
                        Swal.fire('Error', data.msg, 'error')
                    } else {
                        dispatch(changeImage(data.img));
                        setFileUpload();
                        postData(name, password);
                    }
                })
                .catch(error => Swal.fire('Error', error.message, 'error'));
        }
    }

    const handleDeleteImage = async () => {
        if (img) {
            try {
                const resp = await fetch_Token(`usuarios/${uid}`, {
                    img: ""
                }, 'PUT');
                const body = await resp.json();
                if (body.msg) {
                    return Swal.fire('Error', body.msg, 'error');
                } else {
                    dispatch(changeImage(""));
                    localStorage.setItem('token', body.token);
                    localStorage.setItem('token-init-date', new Date().getTime());
                    return Swal.fire('Imagen eliminada', '', 'success');
                }
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error.message, 'error');
            }
        } else {
            return Swal.fire('Error', "No ha subido ninguna imagen", 'error');
        }
    }

    return (
        <div className="animate__animated animate__fadeIn mt-4 mb-5">
            <h3>Mis Datos</h3>
            <Formik
                initialValues={{
                    name: name || '',
                    password: '',
                    password2: '',
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(2, '2 caracteres como mínimo')
                        .max(20, '20 caracteres como máximo'),
                    password: Yup.string()
                        .min(6, '6 caracteres como mínimo')
                        .max(15, '15 caracteres como máximo'),
                    password2: Yup.string()
                        .min(6, '6 caracteres como mínimo')
                        .max(15, '15 caracteres como máximo')
                })}
                onSubmit={handleSubmit}
            >
                <Form className="mt-3">
                    <Row>
                        <Col xs={12} md={6} className="mt-auto">
                            <MyTextInput
                                label="Nombre"
                                name="name"
                            />
                        </Col>
                        <Col xs={12} md={6} className="d-flex justify-content-center align-items-center mt-4 mt-md-0">
                            {
                                img
                                    ? <ReactRoundedImage
                                        image={img ? img : "/assets/no-image.png"}
                                        roundedColor="#49c1e1"
                                        imageWidth="150"
                                        imageHeight="150"
                                        roundedSize="4"
                                        borderRadius="15"
                                    />
                                    : <div className="mt-5"><i className="fa-solid fa-circle-user fa-2xl" style={{ "fontSize": "70px" }}></i></div>
                            }
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col className="mt-auto">
                            <FormGroup id="fileUpload" controlId="formFile">
                                <FormLabel style={{ "marginBottom": "-1px" }}><h5>Imagen</h5></FormLabel>
                                <FormControl
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => setFileUpload(event)}
                                />
                            </FormGroup>
                        </Col>
                        <Col className="mt-auto">
                            <div className="d-grid">
                                <Button onClick={() => handleDeleteImage()} disabled={img === "" || !img ? true : false}>
                                    Eliminar imagen
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <MyTextInput
                                label="Nueva contraseña"
                                name="password"
                            />
                        </Col>
                        <Col>
                            <MyTextInput
                                label="Repetir contraseña"
                                name="password2"
                            />
                        </Col>
                    </Row>
                    <div className="d-grid mt-4">
                        <Button type="submit">
                            Actualizar
                        </Button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
};