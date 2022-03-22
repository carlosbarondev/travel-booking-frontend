import { types } from "../types/types"

export const stepChange = (step) => {
    return {
        type: types.stepChange,
        payload: step,
    }
}