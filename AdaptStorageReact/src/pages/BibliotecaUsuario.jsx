import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import VistaBiblioteca from "../components/VistaBiblioteca";
import VistaUsuarios from "../components/VistaUsuarios";


function BibliotecaUsuario() {
  //Se declara variable de sesión
  const [SesionUsuario, setSesionUsuario] = useState(
    JSON.parse(localStorage.getItem("sesion_usuario")) || ""
  );

  //Toggle Mostrar Biblioteca/Lista de Cuentas (admin)
  const [VistaBiblio, setVistaBiblio] = useState(true);

  function toggleBiblio() {
    setVistaBiblio((prevVistaBiblio) => !prevVistaBiblio);
  }

  function refreshTablas(){
    setVistaBiblio((prevVistaBiblio) => !prevVistaBiblio);
    setVistaBiblio((prevVistaBiblio) => !prevVistaBiblio);
  }

  //Se valida la sesión iniciada
  if (SesionUsuario === "") {
    //De no estar iniciada sesión,
    //Se redirecciona al index
    return <Redirect to="/" />;
  }

  //Se muestra la biblioteca
  return (
    <div>
      {VistaBiblio ? (
        //------------------- VISTA BIBLIOTECA --------------------
        <VistaBiblioteca toggleBiblio={toggleBiblio} refreshTablas={refreshTablas}/>
      ) : (
        //------------------- VISTA CUENTAS ADMIN --------------------
        <VistaUsuarios toggleBiblio={toggleBiblio} refreshTablas={refreshTablas}/>
      )}
    </div>
  );
}

export default BibliotecaUsuario;
