import { combineReducers } from "redux";

import { uiReducer } from "./uiReducer";
import { authReducer } from "./authReducer";
import { shippingReducer } from "./shippingReducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    shipping: shippingReducer
});