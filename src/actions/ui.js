import { types } from "../types/types"

export const stepChange = (step) => {
    return {
        type: types.stepChange,
        payload: step,
    }
}

export const shippingModalChange = (e) => {
    return {
        type: types.shippingModalChange,
        payload: e
    }
}

export const shippingModalChoose = (e) => {
    return {
        type: types.shippingModalChoose,
        payload: e
    }
}