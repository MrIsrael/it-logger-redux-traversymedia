import React, { useState, useEffect } from 'react';
import TechItem from "./TechItem";

const TechListModal = () => {
  // CREACIÓN DEL COMPONENT STATE:
  const [techs, setTechs] = useState([]);             // [ elemento_del_state, acción que lo modifica ]
  const [loading, setLoading] = useState(false);      // useState( valor_inicial );

  useEffect(() => {                                      // El hook useEffect emula el comportamiento de la lifecycle function componentDidMount()
    getTechs();                                                 // Se quiere ejecutar getTechs() 1 vez, cuando cargue el componente
    // eslint-disable-next-line
  }, []);

  const getTechs = async () => {                                // Uso de promises con async-await
    setLoading(true);                                     // No se necesita poner: 'http://localhost:5000/logs' porque
    const res = await fetch('/techs');                    // se está usando un proxy en package.json
    const data = await res.json();                              // fetch() no retorna datos en JSON; hay que formatearlos primero

    setTechs(data);                                             // ya se pueden pasar los datos con formato JSON a la función setTechs()
    setLoading(false);
  };

  return (
    <div id='tech-list-modal' className='modal'>
      <div className='modal-content'>
        <h4>Technician List</h4>
        <ul className='collection'>
          {!loading && techs.map(tech => (<TechItem tech={tech} key={tech.id} />))}
        </ul>
      </div>
    </div>
  );
};

export default TechListModal;