import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormGroup, FormLabel, FormText, Modal } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import Swal from 'sweetalert2';

import { fetch_Token } from '../../../helpers/fetch';


const MyTextInput = ({ label, type, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <FormGroup className="mt-4">
            <FormLabel as="h5" htmlFor={props.id || props.name}>{label}</FormLabel>
            <FormControl as={type} {...field} {...props} />
            {meta.touched && meta.error ? (
                <FormText className='text-danger'>{meta.error}</FormText>
            ) : null}
        </FormGroup>
    );
};

export const SummaryModal = ({ id, setModalShow, oldTitulo, oldComentario, oldRating, ...props }) => {

    const { uid } = useSelector(state => state.auth);

    const [rating, setRating] = useState(20);

    const handleRating = (rate) => {
        setRating(rate);
    }

    const handleSubmit = async (values) => {

        const enviar = await fetch_Token(`productos/${id}`, {
            titulo: values.titulo,
            comentario: values.comentario,
            rating,
            usuario: uid,
            fecha: new Date(),
        }, 'POST');
        const bodyEnviar = await enviar.json();

        if (bodyEnviar.msg) { // Si hay errores
            Swal.fire('Error', bodyEnviar.msg, 'error');
        } else {
            setModalShow("");
            Swal.fire('Valoración enviada', "Gracias por compartir su experiencia", 'success');
        }

    }

    return (
        <Formik
            initialValues={{
                titulo: oldTitulo || '',
                comentario: oldComentario || '',
            }}
            validationSchema={Yup.object({
                titulo: Yup.string()
                    .min(2, '2 caracteres como mínimo')
                    .max(30, '30 caracteres como máximo')
                    .required('Requerido'),
                comentario: Yup.string()
                    .min(2, '2 caracteres como mínimo')
                    .max(2000, '2000 caracteres como máximo')
                    .required('Requerido'),
            })}
            onSubmit={handleSubmit}
        >
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Escribir una opinión
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Valoración general</h5>
                    <Rating
                        onClick={handleRating}
                        ratingValue={oldRating || rating}
                        allowHover={false}
                    />
                    <Form>
                        <MyTextInput
                            label="Añade un título"
                            name="titulo"
                            placeholder="¿Qué es lo más importante?"
                        />
                        <MyTextInput
                            label="Añadir una reseña escrita"
                            name="comentario"
                            type="textarea"
                            rows="6"
                            placeholder="¿Qué te ha gustado y qué no? ¿Para qué usaste este producto?"
                        />
                        <Button className="mt-4" type="submit" variant="primary" size="lg">Enviar</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </Formik>
    );
}