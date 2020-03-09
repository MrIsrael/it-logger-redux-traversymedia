import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from './reducers';

const initialState = {};          // Estado inicial del application store: Vacío.

const middleware = [thunk];       // Arreglo que lista todos los middlewares que se usarán con Redux.

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;             // Este archivo se crea con el boilerplate anterior. No se manipula más.