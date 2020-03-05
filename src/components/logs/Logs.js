import React, { useState, useEffect } from 'react';

const Logs = () => {
  // CREACIÓN DEL COMPONENT STATE:
  const [logs, setLogs] = useState([]);               // [ elemento_del_state, acción que lo modifica ]
  const [loading, setLoading] = useState(false);      // useState( valor_inicial );

  useEffect(() => {                                      // El hook useEffect emula el comportamiento de la lifecycle function componentDidMount()
    getLogs();                                                  // Se quiere ejecutar getLogs() 1 vez, cuando cargue el componente
    // eslint-disable-next-line
  }, []);

  const getLogs = async () => {                                 // Uso de promises con async-await
    setLoading(true);                                     // No se necesita poner: 'http://localhost:5000/logs' porque
    const res = await fetch('/logs');                     // se está usando un proxy en package.json
    const data = await res.json();                              // fetch() no retorna datos en JSON; hay que formatearlos primero

    setLogs(data);                                              // ya se pueden pasar los datos con formato JSON a la función setLogs()
    setLoading(false);
  };

  if (loading) {
    return <h4>Loading...</h4>
  }

  return (                                                      // Las clases CSS importadas aquí son propias de Materialize
    <ul className="collection-with-header">
      <li className="collection-header">
        <h4 className="center">System Logs</h4>
      </li>

      { !loading && logs.length === 0 ? (<p className="center">No logs to show...</p>) : (
        logs.map(log => <li>{log.message}</li>)
      )}
    </ul>
  );
};

export default Logs;