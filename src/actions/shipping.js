import Swal from "sweetalert2";

import { types } from "../types/types";
import { fetch_Token } from "../helpers/fetch";


export const shippingInit = (envio) => {
    return {
        type: types.shippingInit,
        payload: envio
    }
}

export const shippingInitBilling = (facturacion) => {
    return {
        type: types.shippingInitBilling,
        payload: facturacion
    }
}

export const shippingSetActive = (envio) => {
    return {
        type: types.shippingSetActive,
        payload: envio
    }
}

export const shippingSetDefault = (id) => {
    return {
        type: types.shippingSetDefault,
        payload: id
    }
}

export const shippingStartAddNew = (newEnvio) => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        let enviar;

        try {
            const resp = await fetch_Token(`usuarios/envio/${uid}`, newEnvio, 'POST');
            const body = await resp.json();
            if (body.msg) {
                Swal.fire('Error', body.msg, 'error');
            } else {
                enviar = body.envio.find(element => element.direccion.calle === newEnvio.direccion.calle && element.direccion.numero === newEnvio.direccion.numero);
                newEnvio._id = enviar._id;
                dispatch(shippingAddNew(newEnvio));
            }
            return Promise.resolve(enviar._id);
        } catch (error) {
            console.log(error);
        }

    }

}

const shippingAddNew = (envio) => {
    return {
        type: types.shippingAddNew,
        payload: envio
    }
}

export const shippingStartUpdate = (newEnvio) => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        try {
            const resp = await fetch_Token(`usuarios/envio/${uid}`, newEnvio, 'PUT');
            const body = await resp.json();
            if (body.msg) { // Si hay errores
                Swal.fire('Error', body.msg, 'error');
            } else {
                const enviar = body.envio.find(element => element._id === newEnvio._id);
                dispatch(shippingUpdate(enviar));
            }
        } catch (error) {
            console.log(error);
        }

    }

}

const shippingUpdate = (enviar) => {
    return {
        type: types.shippingUpdate,
        payload: enviar
    }
}

export const shippingStartDelete = (idEnvio) => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        try {

            const resp = await fetch_Token(`usuarios/envio/${uid}`, { idEnvio }, 'DELETE');
            const body = await resp.json();
            if (body.msg) { // Si hay errores
                Swal.fire('Error', body.msg, 'error');
            } else {
                dispatch(shippingDelete(idEnvio));
            }

        } catch (error) {
            console.log(error);
        }

    }

}

const shippingDelete = (idEnvio) => {
    return {
        type: types.shippingDelete,
        payload: idEnvio
    }
}


export const shippingStartSort = () => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        try {

            const resp = await fetch_Token(`usuarios/${uid}`);
            const body = await resp.json();
            if (body.msg) { // Si hay errores
                Swal.fire('Error', body.msg, 'error');
            } else {
                const { usuario } = body;
                if (usuario.envio.length > 1) {
                    const foundIdx = usuario.envio.findIndex(el => el._id === usuario.predeterminado)
                    const ar = usuario.envio.splice(foundIdx, 1)
                    const [direccion] = ar;
                    usuario.envio.unshift(direccion)
                    try {
                        const envio = usuario.envio;
                        const resp = await fetch_Token(`usuarios/${uid}`, { envio }, 'PUT');
                        const body = await resp.json();
                        if (body.msg) { // Si hay errores
                            Swal.fire('Error', body.msg, 'error');
                        } else {
                            dispatch(shippingSort(usuario.envio));
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            }

        } catch (error) {
            console.log(error);
        }

    }

}

const shippingSort = (envios) => {
    return {
        type: types.shippingSort,
        payload: envios
    }
}

export const shippingStartAddBilling = (facturacion) => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        const { poblacion, pais, calle, numero, codigo, provincia } = facturacion;

        try {
            const resp = await fetch_Token(`usuarios/facturacion/${uid}`, { poblacion, pais, calle, numero, codigo, provincia }, 'POST');
            const body = await resp.json();
            if (body.msg) {
                Swal.fire('Error', body.msg, 'error');
            } else {
                dispatch(shippingAddBilling(facturacion));
            }
        } catch (error) {
            console.log(error);
        }
    }

}

const shippingAddBilling = (facturacion) => {
    return {
        type: types.shippingAddBilling,
        payload: facturacion
    }
}

export const shippingStartUpdateBilling = (facturacion) => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        try {
            const resp = await fetch_Token(`usuarios/facturacion/${uid}`, facturacion, 'PUT');
            const body = await resp.json();
            if (body.msg) { // Si hay errores
                Swal.fire('Error', body.msg, 'error');
            } else {
                dispatch(shippingUpdateBilling(facturacion));
            }
        } catch (error) {
            console.log(error);
        }

    }

}

const shippingUpdateBilling = (facturacion) => {
    return {
        type: types.shippingUpdateBilling,
        payload: facturacion
    }
}

export const shippingStartDeleteBilling = (idEnvio) => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        try {

            const resp = await fetch_Token(`usuarios/facturacion/${uid}`, {}, 'DELETE');
            const body = await resp.json();
            if (body.msg) { // Si hay errores
                Swal.fire('Error', body.msg, 'error');
            } else {
                dispatch(shippingDeleteBilling());
            }

        } catch (error) {
            console.log(error);
        }

    }

}

const shippingDeleteBilling = () => {
    return {
        type: types.shippingDeleteBilling,
    }
}