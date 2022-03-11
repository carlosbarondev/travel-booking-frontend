import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, Col, FormControl, FormGroup, FormLabel, FormText, Row } from 'react-bootstrap';

import { shippingModalChange } from '../../../actions/ui';
import { shippingStartAddBilling } from '../../../actions/shipping';


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

export const ShippingFormBilling = () => {

    const dispatch = useDispatch();

    const { facturacion } = useSelector(state => state.shipping);

    const handleRegister = ({ direccion }) => {

        dispatch(shippingStartAddBilling(direccion));
        dispatch(shippingModalChange(false));

    }

    const handleAuto = (setFieldValue) => {
        setFieldValue("direccion.calle", "Calle Marina");
        setFieldValue("direccion.numero", "Número 7, 8º A");
        setFieldValue("direccion.pais", "España");
        setFieldValue("direccion.codigo", "21003");
        setFieldValue("direccion.poblacion", "Huelva");
        setFieldValue("direccion.provincia", "Huelva");
    }

    return (
        <Formik
            initialValues={{
                direccion: {
                    poblacion: facturacion?.poblacion || '',
                    pais: facturacion?.pais || '',
                    calle: facturacion?.calle || '',
                    numero: facturacion?.numero || '',
                    codigo: facturacion?.codigo || '',
                    provincia: facturacion?.provincia || '',
                },
            }}
            validationSchema={Yup.object({
                direccion: Yup.object({
                    poblacion: Yup.string()
                        .required('Requerido'),
                    pais: Yup.string()
                        .required('Requerido'),
                    calle: Yup.string()
                        .required('Requerido'),
                    numero: Yup.string()
                        .required('Requerido'),
                    codigo: Yup.number()
                        .test('len', 'El código debe tener 5 números', val => val && val.toString().length === 5)
                        .required('Requerido'),
                    provincia: Yup.string()
                        .required('Requerido'),
                })
            })}
            onSubmit={handleRegister}
        >
            {({ setFieldValue }) => (
                <Form>
                    <Button className='float-end' variant="warning" onClick={() => handleAuto(setFieldValue)}>Rellenar automáticamente</Button>
                    <h4 style={{ "display": "inline" }}>Dirección de envío</h4>
                    <Row className='mt-2'>
                        <Col>
                            <MyTextInput
                                label="Dirección"
                                name="direccion.calle"
                                placeholder="Dirección*"
                            />
                        </Col>
                        <Col>
                            <MyTextInput
                                label="Información adicional"
                                name="direccion.numero"
                                placeholder="Piso, escalera, puerta, etc.*"
                            />
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col>
                            <MyTextInput
                                label="País"
                                name="direccion.pais"
                                placeholder="País*"
                            />
                        </Col>
                        <Col>
                            <MyTextInput
                                label="Código postal"
                                name="direccion.codigo"
                                placeholder="Código postal*"
                            />
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col>
                            <MyTextInput
                                label="Población"
                                name="direccion.poblacion"
                                placeholder="Población*"
                            />
                        </Col>
                        <Col>
                            <MyTextInput
                                label="Provincia"
                                name="direccion.provincia"
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
    );
}