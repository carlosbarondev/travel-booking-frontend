import { combineReducers } from "redux";

import { uiReducer } from "./uiReducer";
import { authReducer } from "./authReducer";
import { bookingReducer } from "./bookingReducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    booking: bookingReducer
});