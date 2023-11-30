import "./styles/PagUsuario.css";
import React, { useState } from "react";

export const DatosUsuario = () => {

  return (
    <div className="flex">
      <div className="Remarco">
        <h1 className="tuperfil">Tu Perfil</h1> <hr className="hr1" />
        <h2>Nombre Completo:</h2> <br /> <hr />
        <h2>Alergias:</h2> <br /> <hr />
        <h2>Edad:</h2> <br />
      </div>
      <br />
      <img className="logo" />
    </div>
  );
};
