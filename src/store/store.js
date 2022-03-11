import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { rootReducer } from "../reducers/rootReducer";

// Configuración para activar la extensión Redux-Devtools
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    rootReducer,
    // Configuración para activar thunk
    composeEnhancers(
        applyMiddleware(thunk)
    )
);