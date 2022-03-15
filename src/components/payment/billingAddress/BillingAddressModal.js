import { useSelector } from 'react-redux';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormGroup, FormLabel, FormText, Modal, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { fetch_Token } from '../../../helpers/fetch';

const MyTextInput = ({ label, type, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <FormGroup className="mt-2">
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <FormControl as={type} {...field} {...props} />
            {meta.touched && meta.error ? (
                <FormText className='text-danger'>{meta.error}</FormText>
            ) : null}
        </FormGroup>
    );
};

export const BillingAddressModal = ({ billing, setBilling, phone, setPhone, setModalShow, ...props }) => {

    const { uid, name } = useSelector(state => state.auth);

    const handleRegister = async (values) => {
        const send = await fetch_Token(`users/${uid}`, {
            name: values.name,
            phone: values.phone,
            billing: {
                city: values.billing.city,
                country: values.billing.country,
                line1: values.billing.line1,
                line2: values.billing.line2,
                postal_code: values.billing.postal_code,
                state: values.billing.state,
            }
        }, 'PUT');
        const body = await send.json();
        if (body.msg) { // Si hay errores
            Swal.fire('Error', body.msg, 'error');
        } else {
            setPhone(values.phone);
            setBilling(values.billing);
            setModalShow("");
        }
    }

    const handleAuto = (setFieldValue) => {
        setFieldValue("name", name);
        setFieldValue("phone", "666666666");
        setFieldValue("billing.line1", "Calle Marina");
        setFieldValue("billing.line2", "Número 7, 8º A");
        setFieldValue("billing.country", "España");
        setFieldValue("billing.postal_code", "21003");
        setFieldValue("billing.city", "Huelva");
        setFieldValue("billing.state", "Huelva");
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Añadir dirección de facturación
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        billing: {
                            city: billing?.city || '',
                            country: billing?.country || '',
                            line1: billing?.line1 || '',
                            line2: billing?.line2 || '',
                            postal_code: billing?.postal_code || '',
                            state: billing?.state || '',
                        },
                        name: name || '',
                        phone: phone || '',
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .required('Requerido'),
                        phone: Yup.number()
                            .test('len', 'El teléfono debe tener 9 números', val => val && val.toString().length === 9)
                            .typeError('Debe especificar un número')
                            .required('Requerido'),
                        billing: Yup.object({
                            city: Yup.string()
                                .required('Requerido'),
                            country: Yup.string()
                                .required('Requerido'),
                            line1: Yup.string()
                                .required('Requerido'),
                            line2: Yup.string()
                                .required('Requerido'),
                            postal_code: Yup.number()
                                .test('len', 'El código debe tener 5 números', val => val && val.toString().length === 5)
                                .typeError('Debe especificar un número')
                                .required('Requerido'),
                            state: Yup.string()
                                .required('Requerido'),
                        })
                    })}
                    onSubmit={handleRegister}
                >
                    {({ setFieldValue }) => (
                        <Form>
                            <Button className='float-end' variant="warning" onClick={() => handleAuto(setFieldValue)}>Rellenar automáticamente</Button>
                            <h4 style={{ "display": "inline" }}>Datos personales</h4>
                            <Row className='mt-2'>
                                <Col>
                                    <MyTextInput
                                        label="Nombre"
                                        name="name"
                                        placeholder="Nombre*"
                                    />
                                </Col>
                                <Col>
                                    <MyTextInput
                                        label="Teléfono"
                                        name="phone"
                                        placeholder="Teléfono*"
                                    />
                                </Col>
                            </Row>
                            <h4 className='mt-4'>Dirección</h4>
                            <Row className='mt-2'>
                                <Col>
                                    <MyTextInput
                                        label="Dirección"
                                        name="billing.line1"
                                        placeholder="Dirección*"
                                    />
                                </Col>
                                <Col>
                                    <MyTextInput
                                        label="Información adicional"
                                        name="billing.line2"
                                        placeholder="Piso, escalera, puerta, etc.*"
                                    />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                    <MyTextInput
                                        label="País"
                                        name="billing.country"
                                        placeholder="País*"
                                    />
                                </Col>
                                <Col>
                                    <MyTextInput
                                        label="Código postal"
                                        name="billing.postal_code"
                                        placeholder="Código postal*"
                                    />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                    <MyTextInput
                                        label="Población"
                                        name="billing.city"
                                        placeholder="Población*"
                                    />
                                </Col>
                                <Col>
                                    <MyTextInput
                                        label="Provincia"
                                        name="billing.state"
                                        placeholder="Provincia*"
                                    />
                                </Col>
                            </Row>
                            <div className="d-grid mt-4">
                                <Button type="submit">
                                    Guardar dirección
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}