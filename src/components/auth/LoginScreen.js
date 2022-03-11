import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, Col, FormControl, FormGroup, FormLabel, FormText, Image, ListGroup, Row } from 'react-bootstrap';

import { startLogin } from '../../actions/auth';


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

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate("/registro");
    }

    const handleLogin = (values) => {
        dispatch(startLogin(values.email, values.password, navigate));
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
                    className='mt-5 mb-5'
                    style={{ "cursor": "pointer", "maxWidth": "75%" }}
                    onClick={() => navigate("/")}
                    fluid
                />
            </div>
            <Row className='mb-5'>
                <Col xs={12} lg={5} className="d-flex flex-column align-items-center order-2 order-lg-1">
                    <h4 className='mt-5'>Usuarios disponibles</h4>
                    <ListGroup className='mt-3'>
                        <ListGroup.Item className='border-0'>
                            <i className="fa-solid fa-user-gear fa-xl"></i>
                            <b> Administrador</b>
                            <div className='mt-2 ms-4'>E-mail: <span className="text-primary">admin@ecommerce.com</span></div>
                            <div className='ms-4'>Contraseña: <span className="text-primary">123456</span></div>
                        </ListGroup.Item>
                        <ListGroup.Item className='border-0'>
                            <i className="fa-solid fa-user-plus fa-xl"></i>
                            <b> Cliente</b>
                            <div className='mt-2 ms-2'>¡Crea un nuevo cliente desde cero!</div>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col xs={0} lg={1} className="disable-vr order-2">
                    <div className="vr h-100"></div>
                </Col>
                <Col xs={12} lg={6} className="d-flex flex-column align-items-center order-1 order-lg-3">
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .email('El email es inválido')
                                .required('El email es obligatorio'),
                            password: Yup.string()
                                .min(6, '6 caracteres como mínimo')
                                .max(15, '15 caracteres como máximo')
                                .required('La contraseña es obligatoria'),
                        })}
                        onSubmit={handleLogin}
                    >
                        <Form className="auth-box-container d-grid gap-2">
                            <h1>Iniciar sesión</h1>
                            <MyTextInput
                                label="E-mail"
                                name="email"
                                type="text"
                                placeholder="E-mail"
                            />
                            <MyTextInput
                                label="Contraseña"
                                name="password"
                                type="password"
                                placeholder="Contraseña"
                            />
                            <div className="form-check" style={{ "marginTop": "-8px" }}>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={() => handleShowPass("password")} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Mostrar contraseña
                                </label>
                            </div>
                            <Button className="mt-2" type="submit" variant="primary" size="lg">Iniciar sesión</Button>
                            <div className="position-relative my-2 text-center">
                                <hr />
                                <p className="position-absolute top-50 start-50 translate-middle bg-white px-3">
                                    ¿Eres nuevo cliente?
                                </p>
                            </div>
                            <Button type="button" variant="outline-primary" size="lg" onClick={handleRegister}>Crear cuenta</Button>
                        </Form>
                    </Formik>
                </Col>
            </Row>
        </div>
    );
};