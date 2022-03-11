import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Button, Col, FormControl, FormGroup, FormLabel, FormSelect, FormText, Image, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { normalizeText, normalizeWhiteSpaces } from 'normalize-text';

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

export const ProductDetail = () => {

    const { ProductoNombre } = useParams();
    const navigate = useNavigate();

    const [producto, setProducto] = useState();
    const [categorias, setCategorias] = useState(false);
    const [cat, setCat] = useState();
    const [sub, setSub] = useState();
    const [fileUpload, setFileUpload] = useState();
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetch_Token(`productos/producto/${ProductoNombre.replace(/-/g, " ")}`);
                const body = await resp.json();
                setProducto(body.producto);
                setCat(body.producto.categoria);
                setSub(body.producto.subcategoria._id);
                const resp2 = await fetch_Token(`categorias?visibles=${`{"estado": {"$in" : ["true", "false"]}}`}&ordenar=""`);
                const body2 = await resp2.json();
                setCategorias(body2.categorias);
                setChecking(true);
            } catch (error) {
                console.log(error);
                return Swal.fire('Error', error.message, 'error');
            }
        }
        fetchData();
    }, [ProductoNombre]);

    const handleDelete = async () => {
        if (producto.desactivar) {
            try {
                if (producto.estado) {
                    await fetch_Token(`productos/${producto._id}`, {}, 'DELETE');
                    setProducto(oldState => ({ ...oldState, estado: false }));
                    Swal.fire('Producto deshabilitado', "", 'success');
                } else {
                    await fetch_Token(`productos/${producto._id}`, { estado: true }, 'PUT');
                    setProducto(oldState => ({ ...oldState, estado: true }));
                    Swal.fire('Producto habilitado', "", 'success');
                }
            } catch (error) {
                console.log(error.message);
                return Swal.fire('Error', error.message, 'error');
            }
        } else {
            Swal.fire('Producto bloqueado', "El webmaster ha bloqueado este producto", 'info');
        }
    }

    const handleSubmit = async (values) => {
        if (cat.subcategorias.find(subCat => subCat._id === sub)) {
            const enviar = await fetch_Token(`productos/${producto._id}`, {
                nombre: normalizeWhiteSpaces(values.nombre.replace(/-/g, " ")),
                descripcion: values.descripcion,
                precio: values.precio,
                stock: values.stock,
                categoria: cat._id,
                subcategoria: sub,
                oldSubcategoria: producto.subcategoria
            }, 'PUT');
            const body = await enviar.json();
            if (body.msg) { // Si hay errores
                Swal.fire('Error', body.msg, 'error');
            } else {
                if (fileUpload) {
                    handleUploadImage();
                } else {
                    setProducto(body);
                }
                Swal.fire('Producto actualizado', "", 'success');
                navigate(`/panel/productos/${normalizeText(body.nombre.replace(/\s+/g, '-'))}`, { replace: true });
            }
        } else {
            Swal.fire('Subcategoría incorrecta', "Seleccione otra subcategoría", 'error');
        }
    }

    const handleUploadImage = () => {
        if (fileUpload) {
            imageUpload(fileUpload, producto._id, "productos")
                .then((data) => {
                    if (data.msg) {
                        Swal.fire('Error', data.msg, 'error')
                    } else {
                        setProducto(data);
                    }
                })
                .catch(error => Swal.fire('Error', error, 'error'));
        }
    }

    return (
        checking && <div className="animate__animated animate__fadeIn mt-4 mb-5">
            <Formik
                initialValues={{
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    precio: producto.precio,
                    stock: producto.stock,
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
                onSubmit={handleSubmit}
            >
                <Form>
                    <h3 className="mb-3">Editar Producto</h3>
                    <Row>
                        <Col xs={12} lg={8}>
                            <Row>
                                <MyTextInput
                                    label="Nombre"
                                    name="nombre"
                                />
                            </Row>
                            <Row className='mb-4 mb-lg-0'>
                                <FormGroup id="fileUpload" controlId="formFile" className="mt-4">
                                    <FormLabel style={{ "marginBottom": "-1px" }}><h5>Imagen</h5></FormLabel>
                                    <FormControl
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => setFileUpload(event)}
                                    />
                                </FormGroup>
                            </Row>
                        </Col>
                        <Col xs={12} lg={4} className="d-flex justify-content-center align-items-center">
                            <div style={{ "height": "14rem" }}>
                                <Image className="mh-100" src={producto.img ? producto.img : "/assets/no-image.png"} />
                            </div>
                        </Col>
                    </Row>
                    <Row className='mt-2 mb-4'>
                        <Col>
                            <h5 className='mt-3'>Categoría</h5>
                            <FormSelect
                                defaultValue={producto.categoria._id}
                                aria-label="Default select example"
                                onChange={e => {
                                    setCat(JSON.parse(e.target.value))
                                }}
                            >
                                <option value={producto.categoria._id} disabled hidden>{producto.categoria.nombre}</option>
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
                                defaultValue={producto.subcategoria._id}
                                aria-label="Default select example"
                                onChange={e => {
                                    setSub(e.target.value)
                                }}
                            >
                                <option value={producto.subcategoria._id} disabled hidden>{producto.subcategoria.nombre}</option>
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
                    />
                    <Row className='mt-3'>
                        <Col>
                            <MyTextInput
                                label="Precio"
                                name="precio"
                            />
                        </Col>
                        <Col>
                            <MyTextInput
                                label="Stock"
                                name="stock"
                            />
                        </Col>
                    </Row>
                    <div className="d-grid mt-4">
                        <Button type="submit">
                            Actualizar
                        </Button>
                    </div>
                    <h5 className="mt-4 mb-2">Estado: {
                        producto.estado ? <span className="text-success">Activo</span> : <span className="text-danger">Deshabilitado</span>
                    }</h5>
                    <Button
                        variant={producto.estado ? "danger" : "success"}
                        onClick={() => handleDelete()}
                    >
                        {
                            producto.estado ? "Eliminar" : "Activar"
                        }
                    </Button>
                </Form>
            </Formik>
        </div>
    );
}