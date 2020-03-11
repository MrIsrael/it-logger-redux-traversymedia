// import React, { useState, useEffect } from 'react';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TechItem from "./TechItem";
import { getTechs } from "../../actions/techActions";

/*
   A continuación se incluyen como props del componente 'TechListModal' a:
   --> 'getTechs', que es una Action, que es exportada desde techActions.js, y se importa aquí en la declaración de arriba.
   --> 'tech', que es un alias del initialState declarado en techReducer.js, y se puede usar aquí gracias a 'connect' y 'mapStateToProps'.
   --> 'techs, loading': Se puede hacer destructuring de algunos de los componentes del app level state, como 'techs' y 'loading',
        declarados también en techReducer.js, para hacer referencia a ellos directamente como props del functional component.
*/

const TechListModal = ({ getTechs, tech: { techs, loading } }) => {
  // CREACIÓN DEL COMPONENT STATE:
  // const [techs, setTechs] = useState([]);             // [ elemento_del_state, acción que lo modifica ]
  // const [loading, setLoading] = useState(false);      // useState( valor_inicial );

  useEffect(() => {                                      // El hook useEffect emula el comportamiento de la lifecycle function componentDidMount()
    getTechs();                                                 // Se quiere ejecutar getTechs() 1 vez, cuando cargue el componente
    // eslint-disable-next-line
  }, []);

  // const getTechs = async () => {                                // Uso de promises con async-await
  //   setLoading(true);                                           // No se necesita poner: 'http://localhost:5000/logs' porque
  //   const res = await fetch('/techs');                          // se está usando un proxy en package.json
  //   const data = await res.json();                              // fetch() no retorna datos en JSON; hay que formatearlos primero
  //
  //   setTechs(data);                                             // ya se pueden pasar los datos con formato JSON a la función setTechs()
  //   setLoading(false);
  // };

  return (
    <div id='tech-list-modal' className='modal'>
      <div className='modal-content'>
        <h4>Technician List</h4>
        <ul className='collection'>
          { !loading && techs !== null && techs.map(tech => <TechItem tech={tech} key={tech.id} />) }
        </ul>
      </div>
    </div>
  );
};

TechListModal.propTypes = {
  tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  tech: state.tech
});

export default connect(mapStateToProps, { getTechs })(TechListModal);