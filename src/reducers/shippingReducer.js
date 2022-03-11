import { types } from "../types/types";


const initialState = {
    envio: [],
    facturacion: {},
    activo: null,
    predeterminado: null
};

export const shippingReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.shippingInit:
            return {
                envio: action.payload
            }
        case types.shippingInitBilling:
            return {
                facturacion: action.payload
            }
        case types.shippingSetActive:
            return {
                ...state,
                activo: action.payload,
            }
        case types.shippingSetDefault:
            return {
                ...state,
                predeterminado: action.payload,
            }
        case types.shippingAddNew:
            return {
                ...state,
                envio: [...state.envio, action.payload],
            }
        case types.shippingUpdate:
            return {
                ...state,
                envio: state.envio.map(
                    e => (e._id === action.payload._id) ? action.payload : e
                )
            }
        case types.shippingDelete:
            return {
                ...state,
                envio: state.envio.filter(
                    e => (e._id !== action.payload)
                )
            }
        case types.shippingSort:
            return {
                ...state,
                envio: action.payload,
            }
        case types.shippingAddBilling:
            return {
                ...state,
                facturacion: action.payload,
            }
        case types.shippingUpdateBilling:
            return {
                ...state,
                facturacion: action.payload,
            }
        case types.shippingDeleteBilling:
            return {
                ...state,
                facturacion: null
            }
        default:
            return state;
    }
}