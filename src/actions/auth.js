import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetch_Token, fetch_No_Token } from '../helpers/fetch';

export const startLogin = (email, password, navigate) => {

    return async (dispatch) => {

        const resp = await fetch_No_Token('auth', { email, password }, 'POST');
        const body = await resp.json();

        if (!body.msg) { // Cuando hay errores se retorna msg

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            localStorage.setItem('uid', body.user._id);

            dispatch(login({
                uid: body.user._id,
                name: body.user.name,
                email: body.user.email,
                role: body.user.role,
                img: body.user.img,
                state: body.user.state
            }));

            const lastPath = localStorage.getItem('lastPath') || "/";
            navigate(lastPath, { replace: true });

        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

export const startRegister = (name, email, password, navigate) => {

    return async (dispatch) => {

        const resp = await fetch_No_Token('users', { name, email, password }, 'POST');
        const body = await resp.json();

        if (!body.msg) { // Cuando hay errores se retorna msg
            const resp = await fetch_No_Token('auth', { email, password }, 'POST');
            const body = await resp.json();

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            localStorage.setItem('uid', body.user._id);

            dispatch(login({
                uid: body.user._id,
                name: body.user.name,
                email: body.user.email,
                role: body.user.role,
                img: body.user.img,
                state: body.user.state
            }));

            const lastPath = localStorage.getItem('lastPath') || "/";
            navigate(lastPath, { replace: true });

        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

export const startChecking = () => {

    return async (dispatch) => {

        const resp = await fetch_Token('auth/renew');
        const body = await resp.json();

        if (!body.msg) { // Cuando hay errores se retorna msg
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name,
                email: body.email,
                role: body.role,
                img: body.img,
                state: body.state
            }));
        } else {
            dispatch(checkingFinish());
        }

    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startLogout = () => {

    return (dispatch) => {

        localStorage.clear();

        dispatch(logout());

    }

}

const logout = () => ({ type: types.authLogout })

export const changeName = (name) => ({
    type: types.changeName,
    payload: name
})

export const changeImage = (img) => ({
    type: types.changeImage,
    payload: img
})