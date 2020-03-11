// import React, { useState, useEffect } from 'react';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LogItem from "./LogItem";
import Preloader from "../layout/Preloader";
import PropTypes from 'prop-types';
import { getLogs } from "../../actions/logActions";

const Logs = ({ log: { logs, loading }, getLogs }) => {
  // CREACIÓN DEL COMPONENT STATE:
//  const [logs, setLogs] = useState([]);                       // [ elemento_del_state, acción que lo modifica ]
//  const [loading, setLoading] = useState(false);              // useState( valor_inicial );

  useEffect(() => {                                      // El hook useEffect emula el comportamiento de la lifecycle function componentDidMount()
    getLogs();                                                  // Se quiere ejecutar getLogs() 1 vez, cuando cargue el componente
    // eslint-disable-next-line
  }, []);

  // const getLogs = async () => {                                 // Uso de promises con async-await
  //   setLoading(true);                                           // No se necesita poner: 'http://localhost:5000/logs' porque
  //   const res = await fetch('/logs');                           // se está usando un proxy en package.json
  //   const data = await res.json();                              // fetch() no retorna datos en JSON; hay que formatearlos primero
  //
  //   setLogs(data);                                              // ya se pueden pasar los datos con formato JSON a la función setLogs()
  //   setLoading(false);
  // };

  if (loading || logs === null) {
    return (
      <Preloader />
    )
  }

  return (                                                          // Las clases CSS importadas aquí son propias de Materialize
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">System Logs</h4>
      </li>
      { !loading && logs.length === 0 ? (<p className="center">No logs to show...</p>) : (
        logs.map(log => <LogItem log={log} key={log.id} />)
      )}
    </ul>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  log: state.log                          // Este 'state.log' es el mismo al que se hace referencia en rootReducer --> combineReducers ("log: logReducer")
});

export default connect(mapStateToProps, { getLogs })(Logs);