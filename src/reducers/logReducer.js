import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SEARCH_LOGS,
  SET_CURRENT,
  CLEAR_CURRENT
} from '../actions/types';

// Estado inicial para este reducer ('logReducer'):
const initialState = {
  logs: null,                   // Cuando se haga el request al fake server, este arreglo de objetos ('logs') se llenará de datos
  current: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false
      };
    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload],    // Al agregar un log, se crea un arreglo 'copia' del state, incluyendo los logs anteriores, y agregando el nuevo al final
        loading: false
      };
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter(log => log.id !== action.payload),  // El id del 'log' lo pone automáticamente el paquete npm 'json-server' (fake backend)
        loading: false
      };
    case UPDATE_LOG:
      return {
        ...state,
        // Buscar en el arreglo de logs, del app level state, aquel cuya id coincida con la del log que envió el Action 'updateLog'. Si coinciden,
        // actualizar ese elemento del arreglo con el log actualizado que envió 'updateLog'; si no, dejar el log que estaba, sin modificarlo.
        logs: state.logs.map(log => log.id === action.payload.id ? action.payload : log)
      };
    case SEARCH_LOGS:
      return {
        ...state,
        logs: action.payload        // Los datos json a insertar en el state 'logs' ya vienen filtrados según el query hecho por fetch(), en la Action
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case LOGS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}