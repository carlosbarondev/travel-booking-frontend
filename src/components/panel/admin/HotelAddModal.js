import { useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, Col, FormControl, FormGroup, FormLabel, FormText, Modal, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { normalizeWhiteSpaces } from 'normalize-text';

import { fetch_Token } from '../../../helpers/fetch';
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

export const HotelAddModal = ({ setModalShow, ...props }) => {

    const [fileUpload, setFileUpload] = useState();

    const handleSubmit = async (values, resetForm) => {

        try {
            const resp = await fetch_Token(`hotels`, {
                name: normalizeWhiteSpaces(values.name.replace(/-/g, " ")),
                stars: values.stars,
                description: values.description,
                country: values.country,
                city: values.city,
            }, 'POST');
            const body = await resp.json();
            if (body.msg) {
                Swal.fire('Error', body.msg, 'error');
            } else {
                handleUploadImage(body._id);
                setModalShow("");
                window.location.reload();
            }
        } catch (error) {
            console.log(error.message);
            Swal.fire('Error', error.message, 'error');
        }

    }

    const handleUploadImage = (id) => {

        if (fileUpload) {
            imageUpload(fileUpload, id, "hotels")
                .then((data) => {
                    if (data.msg) {
                        Swal.fire('Error', data.msg, 'error')
                    }
                })
                .catch(error => Swal.fire('Error', error.message, 'error'));
        }

    }

    return (
        <Formik
            initialValues={{
                name: "",
                stars: "",
                description: "",
                country: "",
                city: ""
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
                    .required('El país es obligatoria'),
                city: Yup.string()
                    .min(2, '2 caracteres como mínimo')
                    .max(34, '34 caracteres como máximo')
                    .required('La ciudad es obligatoria'),
            })}
            onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
        >
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Crear Hotel
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <MyTextInput
                                    label="Nombre"
                                    name="name"
                                    placeholder="Nombre*"
                                />
                            </Col>
                            <Col>
                                <Col>
                                    <MyTextInput
                                        label="Estrellas"
                                        name="stars"
                                        placeholder="Estrellas*"
                                    />
                                </Col>
                            </Col>
                        </Row>
                        <MyTextInput
                            label="Descripción"
                            name="description"
                            type="textarea"
                            rows="6"
                            placeholder="Descripción*"
                        />
                        <Row className='mt-2'>
                            <Col>
                                <MyTextInput
                                    label="País"
                                    name="country"
                                    placeholder="País*"
                                />
                            </Col>
                            <Col>
                                <MyTextInput
                                    label="Ciudad"
                                    name="city"
                                    placeholder="Ciudad*"
                                />
                            </Col>
                        </Row>
                        <FormGroup id="fileUpload" controlId="formFile" className="mt-3">
                            <FormLabel style={{ "marginBottom": "-1px" }}><h5>Imagen</h5></FormLabel>
                            <FormControl
                                type="file"
                                accept="image/*"
                                onChange={(event) => setFileUpload(event)}
                            />
                        </FormGroup>
                        <div className="d-grid mt-4">
                            <Button type="submit">
                                Crear
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </Formik>
    );
}