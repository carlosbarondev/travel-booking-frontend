import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormGroup, FormLabel, FormText, Form as FormRB, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { fetch_Token } from '../../../helpers/fetch';
import { shippingModalChange } from '../../../actions/ui';
import { shippingSetActive, shippingSetDefault, shippingStartAddBilling, shippingStartAddNew, shippingStartSort, shippingStartUpdate } from '../../../actions/shipping';


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

export const ShippingForm = () => {

    const dispatch = useDispatch();

    const { uid, nombre } = useSelector(state => state.auth);
    const { activo } = useSelector(state => state.shipping);

    const handleRegister = async ({ direccion, nombre, telefono }) => {

        let newEnvio;
        let body;
        let predeterminado;

        if (!activo) {
            newEnvio = { direccion, nombre, telefono };
            await dispatch(shippingStartAddNew(newEnvio)).then((result) => {
                predeterminado = result;
            });
        } else {
            const { _id } = activo;
            newEnvio = { _id, direccion, nombre, telefono };
            dispatch(shippingStartUpdate(newEnvio));
            predeterminado = _id;
        }

        if (document.querySelector("input[name=checkbox1]:checked")) { // Marcar dirección de envío como predeterminada
            dispatch(shippingSetDefault(predeterminado));
            newEnvio = { predeterminado }
            const resp = await fetch_Token(`usuarios/${uid}`, newEnvio, 'PUT');
            body = await resp.json();
            if (body.msg) { // Si hay errores
                console.log('Hola Mundo');
                Swal.fire('Error', body.msg, 'error');
            } else {
                const enviar = body.usuario.envio.find(element => element._id === predeterminado);
                dispatch(shippingStartUpdate(enviar));
                dispatch(shippingStartSort());
            }
        }

        const id = document.querySelector("input[name=checkbox2]:checked")?.id; // Dirección de facturación igual a la dirección de envío
        if (id) {
            dispatch(shippingStartAddBilling(direccion));
        }

        dispatch(shippingModalChange(false));
        dispatch(shippingSetActive());

    }

    const handleAuto = (setFieldValue) => {
        setFieldValue("nombre", nombre);
        setFieldValue("telefono", "666666666");
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
                    poblacion: activo?.direccion.poblacion || '',
                    pais: activo?.direccion.pais || '',
                    calle: activo?.direccion.calle || '',
                    numero: activo?.direccion.numero || '',
                    codigo: activo?.direccion.codigo || '',
                    provincia: activo?.direccion.provincia || '',
                },
                nombre: activo?.nombre || '',
                telefono: activo?.telefono || '',
            }}
            validationSchema={Yup.object({
                nombre: Yup.string()
                    .required('Requerido'),
                telefono: Yup.number()
                    .test('len', 'El teléfono debe tener 9 números', val => val && val.toString().length === 9)
                    .typeError('Debe especificar un número')
                    .required('Requerido'),
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
                        .typeError('Debe especificar un número')
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
                    <h4 style={{ "display": "inline" }}>Datos personales</h4>
                    <Row className='mt-2'>
                        <Col>
                            <MyTextInput
                                label="Nombre"
                                name="nombre"
                                placeholder="Nombre*"
                            />
                        </Col>
                        <Col>
                            <MyTextInput
                                label="Teléfono"
                                name="telefono"
                                placeholder="Teléfono*"
                            />
                        </Col>
                    </Row>
                    <h4 className='mt-4'>Dirección de envío</h4>
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
                    <div key="checkbox-default" className="mt-4 mb-4">
                        <FormRB.Check
                            defaultChecked
                            type="checkbox"
                            id="checkbox1"
                            name="checkbox1"
                            label="Establecer esta dirección como predeterminada (para futuras compras)"
                        />
                        <FormRB.Check
                            defaultChecked
                            type="checkbox"
                            id="checkbox2"
                            name="checkbox2"
                            label="Usar mismos datos de envío para la facturación"
                        />
                    </div>
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