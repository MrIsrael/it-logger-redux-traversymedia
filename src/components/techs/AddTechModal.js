import React, { useState } from 'react';      // Este componente será un formulario, por eso necesita un 'component state' --> uso del hook useState
import M from 'materialize-css/dist/js/materialize.min.js';

const AddTechModal = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const onSubmit = () => {
    if (firstName === '' || lastName === '') {
      M.toast({ html: 'Please enter the first and last name' });
    } else {
      console.log(firstName, lastName);

      // Clear fields
      setFirstName('');
      setLastName('');
    }
  };

  return (
      <div id='add-tech-modal' className='modal'>
        <div className='modal-content'>
          <h4>New Technician</h4>

          <div className='row'>
            <div className='input-field'>
              <input
                  type='text'
                  name='firstName'
                  value={firstName}
                  onChange={event => setFirstName(event.target.value)}
              />
              <label htmlFor='firstName' className='active'>            {/* Elemento 'label' requerido por Materialize cuando se agrega un formulario */}
                First Name
              </label>
            </div>
          </div>

          <div className='row'>
            <div className='input-field'>
              <input
                  type='text'
                  name='lastName'
                  value={lastName}
                  onChange={event => setLastName(event.target.value)}
              />
              <label htmlFor='lastName' className='active'>
                Last Name
              </label>
            </div>
          </div>

        </div>                                                        {/* Fin del div "modal-content" */}

        <div className='modal-footer'>
          <a href='#!' onClick={onSubmit} className='modal-close waves-effect waves-light blue btn'>Enter</a>
        </div>

      </div>
  );
};

export default AddTechModal;