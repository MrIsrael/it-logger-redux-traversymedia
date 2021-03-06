import React, { useState } from 'react';      // Este componente será un formulario, por eso necesita un 'component state' --> uso del hook useState
import TechSelectOptions from "../techs/TechSelectOptions";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLog } from "../../actions/logActions";
import M from 'materialize-css/dist/js/materialize.min.js';

const AddLogModal = ({ addLog }) => {
  const [message, setMessage] = useState('');         // El estado del componente contiene un mensaje y un método para definir ese mensaje
  const [attention, setAttention] = useState(false);  // (setMessage). Ambos son "tomados" del hook useState, que define el valor inicial para
  const [tech, setTech] = useState('');               // "message" como vacío ('').

  const onSubmit = () => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Please enter a message and tech' });     // Popup de Materialize
    } else {
      const newLog = {
        message,                                                // Igual que = message: message
        attention,
        tech,
        date: new Date()
      };

      addLog(newLog);                                           // Implementación de la Redux Action en este componente

      M.toast({ html: `Log added by ${tech}` });                // Popup dinámico de Materialize

      // Clear fields
      setMessage('');
      setTech('');
      setAttention(false);
    }
  };

  return (
    <div id='add-log-modal' className='modal' style={modalStyle}>
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
            <label htmlFor='message' className='active'>            {/* Elemento 'label' requerido por Materialize cuando se agrega un formulario */}
              Log message
            </label>
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
              <TechSelectOptions />
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

AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired
};

const modalStyle = {
  width: '75%',
  height: '50%'
};

export default connect(null, { addLog })(AddLogModal);