// Las Actions generalmente despachan Types al Reducer, pero con el middleware Thunk, pueden despachar también FUNCIONES
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
} from './types';

// Ejemplo de dispacho de una FUNCIÓN al Reducer, desde la Action (este archivo), hacia el Reducer, gracias a Redux Thunk:
// (la función dentro del Action puede despachar 'dispatch' hacia el Reducer un Tipo 'type' y un Contenido 'payload').

// export const getLogs = () => {
//   return async (dispatch) => {
//     setLoading();
//
//     const response = await fetch('/logs');
//     const data = await response.json();
//
//     dispatch({
//       type: GET_LOGS,
//       payload: data
//     });
//   };
// };

// Get logs from server:
export const getLogs = () => async dispatch => {
// Si la petición asíncrona sale bien (retorna datos), ejecutar el código dentro de 'try':
  try {
    setLoading();

    const response = await fetch('/logs');
    const data = await response.json();

    dispatch({
      type: GET_LOGS,
      payload: data
    });
// Si hay algún error en la recepción de datos, ejecutar el código dentro de 'catch':
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
};

// Add new log:
export const addLog = (log) => async dispatch => {
  try {
    setLoading();
  // Así se envía un objeto JSON vía POST a un backend con fetch(), sea Express, PHP, Python, o cualquier otro. Se puede usar también Axios.
    const response = await fetch('/logs', {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();

    dispatch({
      type: ADD_LOG,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
};

// Delete log from server:
export const deleteLog = (id) => async dispatch => {
  try {
    setLoading();

    await fetch(`/logs/${id}`, {
      method: 'DELETE'
    });

    dispatch({
      type: DELETE_LOG,
      payload: id
    });
// Si hay algún error en la recepción de datos, ejecutar el código dentro de 'catch':
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
};

// Update log on server:
export const updateLog = (log) => async dispatch => {
  try {
    setLoading();

    const response = await fetch(`/logs/${log.id}`, {
      method: 'PUT',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();

    dispatch({
      type: UPDATE_LOG,
      payload: data
    });
// Si hay algún error en la recepción de datos, ejecutar el código dentro de 'catch':
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
};

// Search server logs:
export const searchLogs = (text) => async dispatch => {
  try {
    setLoading();

    const response = await fetch(`/logs?q=${text}`);    // Query parameter para ingresar texto dinámicamente en la ruta de búsqueda
    const data = await response.json();

    dispatch({
      type: SEARCH_LOGS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
};

// Set current log: --> esta Action no tiene nada que ver con el backend, solo modifica la interfaz de usuario
// Sirve para mostrar los datos actuales de un Log en el modal de 'Editar log', para que se rellenen los campos de la UI con la info del log a editar
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log
  }
};

// Clear current log: --> esta Action no tiene nada que ver con el backend, solo modifica la interfaz de usuario
// No se requiere en esta Action un payload, porque se devolverá el contenido del Log al app level state como  'null'.
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  }
};

// Set loading to true:
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};