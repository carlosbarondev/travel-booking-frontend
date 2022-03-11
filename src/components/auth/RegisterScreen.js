import { Formik, Form, useField } from 'formik';
import { Button, Col, FormControl, FormGroup, FormLabel, FormText, Image, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import { startRegister } from '../../actions/auth';


const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <FormGroup className="mb-2">
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <FormControl {...field} {...props} />
            {meta.touched && meta.error ? (
                <FormText className='text-danger'>{meta.error}</FormText>
            ) : null}
        </FormGroup>
    );
};

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    }

    const handleRegister = ({ name, email, password, password2 }) => {
        if (password !== password2) {
            return Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
        }
        dispatch(startRegister(name, email, password, navigate));
    }

    const handleShowPass = (name) => {
        const x = document.querySelector(`input[name=${name}]`);
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="text-center">
                <Image
                    src="/assets/logo_grande.png"
                    alt="logo"
                    className='mt-3 mt-sm-5 mb-0 mb-sm-4'
                    style={{ "cursor": "pointer", "maxWidth": "75%" }}
                    onClick={() => navigate("/")}
                    fluid
                />
            </div>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    password2: '',
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(2, '2 caracteres como mínimo')
                        .max(20, '20 caracteres como máximo')
                        .required('El nombre es obligatorio'),
                    email: Yup.string()
                        .email('El email es inválido')
                        .required('El email es obligatorio'),
                    password: Yup.string()
                        .min(6, '6 caracteres como mínimo')
                        .max(15, '15 caracteres como máximo')
                        .required('La contraseña es obligatoria'),
                    password2: Yup.string()
                        .min(6, '6 caracteres como mínimo')
                        .max(15, '15 caracteres como máximo')
                        .required('La contraseña es obligatoria'),
                })}
                onSubmit={handleRegister}
            >
                <Form className="d-grid gap-2 mt-4 mb-5 mx-4">
                    <h1>Crear cuenta</h1>
                    <MyTextInput
                        label="Nombre"
                        name="name"
                        type="text"
                        placeholder="¿Cuál es tu nombre?"
                    />
                    <MyTextInput
                        label="E-mail"
                        name="email"
                        type="text"
                        placeholder="E-mail"
                    />
                    <Row className='mb-3'>
                        <Col xs={12} sm={6} className="mt-3 mt-sm-0">
                            <MyTextInput
                                label="Contraseña"
                                name="password"
                                type="password"
                                placeholder="Contraseña"
                            />
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={() => handleShowPass("password")} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Mostrar contraseña
                                </label>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} className="mt-3 mt-sm-0">
                            <MyTextInput
                                label="Confirma tu contraseña"
                                name="password2"
                                type="password"
                                placeholder="Contraseña"
                            />
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" onClick={() => handleShowPass("password2")} />
                                <label className="form-check-label" htmlFor="flexCheckDefault2">
                                    Mostrar contraseña
                                </label>
                            </div>
                        </Col>
                    </Row>
                    <Button type="submit" variant="primary" size="lg">Crear cuenta</Button>
                    <div className="position-relative my-2 text-center">
                        <hr />
                        <p className="position-absolute top-50 start-50 translate-middle bg-white px-3">
                            Ya tengo una cuenta
                        </p>
                    </div>
                    <Button type="button" variant="outline-primary" size="lg" onClick={handleLogin}>Iniciar sesión</Button>
                </Form>
            </Formik>
        </div>
    );
};