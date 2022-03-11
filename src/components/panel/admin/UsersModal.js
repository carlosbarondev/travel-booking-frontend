import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormGroup, FormLabel, FormText, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { normalizeWhiteSpaces } from 'normalize-text';

import { fetch_Token } from '../../../helpers/fetch';

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

export const UsersModal = ({ id, email, name, users, setUsers, setModalShow, ...props }) => {

    const handleSubmit = async (values) => {

        const send = await fetch_Token(`users/${id}`, {
            oldEmail: email,
            email: values.email,
            name: normalizeWhiteSpaces(values.name),
        }, 'PUT');
        const body = await send.json();

        if (body.msg) { // Si hay errores
            Swal.fire('Error', body.msg, 'error');
        } else {
            const newUsers = [...users];
            newUsers[users.findIndex(user => user._id === id)] = body;
            setUsers(newUsers);
            setModalShow("");
        }

    }

    return (
        <Formik
            initialValues={{
                email: email,
                name: name,
            }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email('El email es inválido')
                    .required('Requerido'),
                name: Yup.string()
                    .min(2, '2 caracteres como mínimo')
                    .max(20, '20 caracteres como máximo')
                    .required('Requerido'),
            })}
            onSubmit={handleSubmit}
        >
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editar usuario
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <MyTextInput
                            label="Correo"
                            name="email"
                        />
                        <MyTextInput
                            label="Nombre"
                            name="name"
                        />
                        <div className="d-grid">
                            <Button className="mt-4" type="submit" variant="primary" size="lg">Actualizar</Button>
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