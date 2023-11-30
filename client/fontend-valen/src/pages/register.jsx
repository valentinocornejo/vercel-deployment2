import './styles/IniciodeSesion.css'
import React, { useState } from 'react';

export const Registro = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3002/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Utiliza 'username' en lugar de 'email'
      });
  
      if (response.ok) {
        // Registro exitoso
        const data = await response.json();
        console.log(data.message);
      } else {
        // Registro fallido
        console.error('Error en el registro');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div>
      <div className='Remarco'>
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Registro</h1> <br />
            <hr />
            <h2>Nombre de Usuario</h2>
            <input
              type="text"
              value={username} 
              onChange={handleUsernameChange}
              placeholder='Nombre de Usuario  ...'
              required
            />
          </div>
          <div>
            <h2>Contraseña</h2>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder='Contraseña...'
              required
            />
          </div>
          <button type="submit">Registrate</button>
        </form>
      </div>
    </div>
  );
};
