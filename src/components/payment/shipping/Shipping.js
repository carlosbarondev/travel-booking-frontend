import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ShippingList } from './ShippingList';
import { fetch_Token } from '../../../helpers/fetch';
import { shippingInit, shippingSetDefault, shippingStartAddBilling } from '../../../actions/shipping';


export const Shipping = () => {

    const dispatch = useDispatch();

    const { uid } = useSelector(state => state.auth);

    const [checking, setChecking] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const resp = await fetch_Token(`usuarios/${uid}`);
            const { usuario } = await resp.json();
            dispatch(shippingInit(usuario.envio));
            if (usuario.facturacion) {
                await dispatch(shippingStartAddBilling(usuario.facturacion));
            }
            dispatch(shippingSetDefault(usuario.predeterminado));
            setChecking(true);
        }
        fetchData();
    }, [dispatch, uid]);

    return (
        checking && <ShippingList />
    );
};