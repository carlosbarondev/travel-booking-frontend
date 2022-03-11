import { useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, Col, FormControl, FormGroup, FormLabel, FormSelect, FormText, Modal, Row } from 'react-bootstrap';
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

export const ProductAddModal = ({ categorias, setModalShow, ...props }) => {

    const [fileUpload, setFileUpload] = useState();
    const [cat, setCat] = useState();
    const [sub, setSub] = useState();

    const handleSubmit = async (values, resetForm) => {

        try {
            const resp = await fetch_Token(`productos`, {
                nombre: normalizeWhiteSpaces(values.nombre.replace(/-/g, " ")),
                descripcion: values.descripcion,
                precio: values.precio,
                stock: values.stock,
                categoria: cat._id,
                subcategoria: sub
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
            imageUpload(fileUpload, id, "productos")
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
                nombre: "",
                descripcion: "",
                precio: "",
                stock: ""
            }}
            validationSchema={Yup.object({
                nombre: Yup.string()
                    .min(2, '2 caracteres como mínimo')
                    .max(34, '34 caracteres como máximo')
                    .required('El nombre es obligatorio'),
                descripcion: Yup.string()
                    .min(2, '2 caracteres como mínimo')
                    .max(2000, '2000 caracteres como máximo')
                    .required('La descripción es obligatoria'),
                precio: Yup.number()
                    .typeError('Debe especificar un número')
                    .required('Requerido'),
                stock: Yup.number()
                    .typeError('Debe especificar un número')
                    .required('Requerido'),
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
                        Crear Producto
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <MyTextInput
                            label="Nombre"
                            name="nombre"
                            placeholder="Nombre*"
                        />
                        <Row className='mt-2 mb-4'>
                            <Col>
                                <h5 className='mt-3'>Categoría</h5>
                                <FormSelect
                                    defaultValue="default"
                                    aria-label="Default select example"
                                    onChange={e => {
                                        setCat(JSON.parse(e.target.value))
                                    }}
                                >
                                    <option value="default" disabled hidden>Selecciona la categoría</option>
                                    {
                                        categorias.map(cat =>
                                            <option key={cat._id} value={JSON.stringify(cat)}>{cat.nombre}</option>
                                        )
                                    }
                                </FormSelect>
                            </Col>
                            <Col>
                                <h5 className='mt-3'>Subcategoría</h5>
                                <FormSelect
                                    disabled={cat ? false : true}
                                    defaultValue="default"
                                    aria-label="Default select example"
                                    onChange={e => {
                                        setSub(e.target.value)
                                    }}
                                >
                                    <option value="default" disabled hidden>Selecciona la subcategoría</option>
                                    {
                                        cat
                                            ? cat.subcategorias.map(sub =>
                                                <option key={sub._id} value={sub._id}>{sub.nombre}</option>
                                            )
                                            : null
                                    }
                                </FormSelect>
                            </Col>
                        </Row>
                        <MyTextInput
                            label="Descripción"
                            name="descripcion"
                            type="textarea"
                            rows="6"
                            placeholder="Descripción*"
                        />
                        <Row className='mt-2'>
                            <Col>
                                <MyTextInput
                                    label="Precio"
                                    name="precio"
                                    placeholder="Precio*"
                                />
                            </Col>
                            <Col>
                                <MyTextInput
                                    label="Stock"
                                    name="stock"
                                    placeholder="Stock*"
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