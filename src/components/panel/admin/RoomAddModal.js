import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormGroup, FormLabel, FormSelect, FormText, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { normalizeWhiteSpaces } from 'normalize-text';

import { fetch_Token } from '../../../helpers/fetch';
import { useState } from 'react';

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

export const RoomAddModal = ({ hotel, setHotel, setModalShowAdd, ...props }) => {

    const [cat, setCat] = useState(null);

    const handleSubmit = async (values, resetForm) => {
        if (!cat) {
            Swal.fire('Error', "Seleccione una categoría", 'error');
        } else {
            try {
                const resp = await fetch_Token(`hotels/${hotel._id}`, {
                    idRoom: normalizeWhiteSpaces(values.idRoom),
                    category: cat
                }, 'PUT');
                const body = await resp.json();
                if (body.msg) {
                    Swal.fire('Error', body.msg, 'error');
                } else {
                    setHotel(body);
                    resetForm();
                    setModalShowAdd("");
                }
            } catch (error) {
                console.log(error.message);
                Swal.fire('Error', error.message, 'error');
            }
        }
    }

    return (
        <Formik
            initialValues={{
                idRoom: "",
            }}
            validationSchema={Yup.object({
                idRoom: Yup.string()
                    .min(2, '2 caracteres como mínimo')
                    .max(23, '23 caracteres como máximo')
                    .required('El idRoom es obligatorio'),
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
                        Crear Habitación
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <MyTextInput
                            className="mb-4"
                            label="ID Habitación"
                            name="idRoom"
                            placeholder="ID Habitación*"
                        />
                        <h5>Tipo de habitación</h5>
                        <FormSelect aria-label="Default select example" onChange={e => setCat(e.target.value)}>
                            <option>Tipo de habitación</option>
                            <option value="Doble">Doble</option>
                            <option value="Familiar">Familiar</option>
                            <option value="Suite">Suite</option>
                        </FormSelect>
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