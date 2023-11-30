import "./styles/IniciodeSesion.css";
import React, { useState, useEffect } from "react";

export const IniciodeSesion = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3002/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (response.ok) {
        // Registro exitoso
        const data = await response.json();
        console.log(data.message);

        const isQuick = data.isQuick;

        if (isQuick) {
          // El usuario ya ha completado el "quickStart"
          console.log('El usuario ha completado el "quickStart".');
          window.location.href = "/homepage";
        } else {
          // El usuario no ha completado el "quickStart"
          console.log('El usuario no ha completado el "quickStart".');
          window.location.href = "/quickStart";
        }
      } else {
        // Registro fallido
        console.error("Error en el registro");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <div className="Remarco">
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Inicio de Sesion</h1> <br />
            <hr />
            <h2>Correo Electronico</h2>
            <input
              type="text"
              value={username} // Cambiado FormData.email a username
              onChange={handleUsernameChange}
              placeholder="Correo Electronico..."
              required
            />
          </div>
          <div>
            <h2>Contraseña</h2>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Contraseña..."
              required
            />
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};
