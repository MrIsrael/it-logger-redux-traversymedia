import React, { useState, useEffect } from 'react';      // Este componente será un formulario, por eso necesita un 'component state' --> uso del hook useState
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateLog } from "../../actions/logActions";

const EditLogModal = ({ current, updateLog }) => {
  const [message, setMessage] = useState('');         // El estado del componente contiene un mensaje y un método para definir ese mensaje
  const [attention, setAttention] = useState(false);  // (setMessage). Ambos son "tomados" del hook useState, que define el valor inicial para
  const [tech, setTech] = useState('');               // "message" como vacío ('').

  useEffect(() => {
    // Si se dio clic en el título de algún log, se hizo ya un fetch al backend, es decir que 'current' existe, entonces se cumple la condición del 'if':
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  }, [current]);                                          // Para qué se debe incluir esta dependencia, como parámetro de useEffect?

  const onSubmit = () => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Please enter a message and tech' });
    } else {
      const updLog = {
        id: current.id,
        message,
        attention,
        tech,
        date: new Date()                                        // Date() es una función JavaScript ordinaria, no se importó en ningún paquete npm.
      };

      updateLog(updLog);                                        // Implementación de la Redux Action en este componente

      M.toast({ html: `Log updated by ${tech}` });              // Popup dinámico de Materialize

      // Clear fields
      setMessage('');
      setTech('');
      setAttention(false);
    }
  };

  return (
      <div id='edit-log-modal' className='modal' style={modalStyle}>
        <div className='modal-content'>
          <h4>Enter System Log</h4>

          <div className='row'>
            <div className='input-field'>
              <input
                type='text'
                name='message'
                value={message}
                onChange={event => setMessage(event.target.value)}
              />
            </div>
          </div>

          <div className='row'>
            <div className='input-field'>
              <select
                name='tech'
                value={tech}
                className='browser-default'
                onChange={event => setTech(event.target.value)}
              >
                <option value='' disabled>Select technician</option>
                <option value='Sam Smith'>Sam Smith</option>
                <option value='John Doe'>John Doe</option>
                <option value='Pepito Perez'>Pepito Perez</option>
              </select>
            </div>
          </div>

          <div className='row'>
            <div className='input-field'>
              <p>
                <label>
                  <input
                    type='checkbox'
                    className='filled-in'
                    checked={attention}
                    value={attention}
                    onChange={event => setAttention(!attention)}
                  />
                  <span>Needs Attention</span>
                </label>
              </p>
            </div>
          </div>

        </div>                                                        {/* Fin del div "modal-content" */}

        <div className='modal-footer'>
          <a href='#!' onClick={onSubmit} className='modal-close waves-effect waves-light blue btn'>Enter</a>
        </div>

      </div>
  );
};

EditLogModal.propTypes = {
//  current: PropTypes.object.isRequired,
  updateLog: PropTypes.func.isRequired
};

const modalStyle = {
  width: '75%',
  height: '75%'
};

const mapStateToProps = (state) => ({
  current: state.log.current
});

export default connect(mapStateToProps, { updateLog })(EditLogModal);