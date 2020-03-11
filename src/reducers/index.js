import { combineReducers } from 'redux';
import logReducer from './logReducer';
import techReducer from './techReducer';

// Una ventaja de Redux para aplicaciones grandes, es que se pueden combinar muchos Reducers diferentes aquí, en el rootReducer,
// pudiendo dividir las funcionalidades de la app por secciones diferentes, cada una con su Reducer y su Action file.
export default combineReducers({
  log: logReducer,
  tech: techReducer
});
