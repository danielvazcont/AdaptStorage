import React, { useState } from "react";

const URL_REGISTRO = process.env.REACT_APP_SERVER_URL + "modificar.php";

const DetalleUsuario = ({ usuario, resetDetalle, refreshTablas }) => {
  const [Nombre, setNombre] = useState(usuario.nombre);
  const [Correo, setCorreo] = useState(usuario.correo);
  const [Nivel, setNivel] = useState(usuario.nivel);
  const [IdUsuario, setIdUsuario] = useState(usuario.id);
  const [Estado, setEstado] = useState(usuario.estado);
  const [MensajeError, setMensajeError] = useState("");
  const [CambioInput, setCambioInput] = useState(false);

  function handleChangeInput(event) {
    setCambioInput(true);

    if (event.target.id === "nombre") {
      setNombre(event.target.value);
    } else if (event.target.id === "correo") {
      setCorreo(event.target.value);
    } else if (event.target.id === "nivel") {
      setNivel(event.target.value);
    }

    if (event.target.value !== "") {
      event.target.className = "form-control";
    } else {
      event.target.className = "form-control is-invalid";
    }
  }

  function toggleEstado() {
    setCambioInput(true);
    if (Estado === "habilitado") {
      setEstado("inhabilitado");
    } else {
      setEstado("habilitado");
    }
  }

  const validar = () => {
    if (Nombre === "" || Nivel === "" || Correo === "") {
      setMensajeError("Asegurese de llenar todos los campos.");
      return false;
    } else if (Nivel < 1) {
      setMensajeError("El nivel de acceso mínimo permitido es 1.");
      return false;
    } else if (Nivel > 4) {
      setMensajeError("El nivel de acceso máximo permitido es 4.");
      return false;
    }

    return true;
  };

  //Función Mandar datos a PHP
  const enviarData = async (url, data) => {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(resp);
    const json = await resp.json();
    console.log(json);

    return json;
  };

  const actualizarUsuario = async () => {
    if (validar()) {
      const data = {
        IdUsuario,
        Nombre,
        Correo,
        Nivel,
        Estado
      };

      console.log(
        "ID: " +
          IdUsuario +
          "Nombre: " +
          Nombre +
          "Correo: " +
          Correo +
          "Nivel: " +
          Nivel +
          "Estado: " +
          Estado
      );
      const respuestaJson = await enviarData(URL_REGISTRO, data);
      console.log(respuestaJson);
      refreshTablas();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 0,
        width: "100%",
        zIndex: 1,
      }}
    >
      <div className="card mb-3" style={{ background: "#D0DFF2" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          fill="currentColor"
          className="bi bi-pencil-square"
          viewBox="0 0 16 16"
          style={{ marginLeft: 15, marginTop: 15 }}
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          />
        </svg>

        <button
          className="btn"
          onClick={resetDetalle}
          style={{
            position: "absolute",
            right: 0,
            marginRight: 15,
            marginTop: 15,
            padding: 10,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
            />
            <path
              fill-rule="evenodd"
              d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
            />
          </svg>
        </button>

        <h4 style={{ textAlign: "center", marginTop: "10px" }}>Editar</h4>
        <div className="card-body">
          <h6
            style={{
              fontSize: 16,
              color: "#e51c23",
              textAlign: "center",
            }}
          >
            {MensajeError}
          </h6>

          <div className="form-group row">
            <label for="email" className="col-sm-2 col-form-label">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                fill="currentColor"
                className="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg>
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                id="nombre"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Nombre"
                value={Nombre}
                onChange={handleChangeInput}
                style={{
                    color:'#666'
                }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="email" className="col-sm-2 col-form-label">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                fill="currentColor"
                className="bi bi-envelope"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
              </svg>
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="correo"
                aria-describedby="emailHelp"
                placeholder="Correo"
                value={Correo}
                onChange={handleChangeInput}
                style={{
                  width: "100%",
                  color:'#666'
                }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="email" className="col-sm-2 col-form-label">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                fill="currentColor"
                className="bi bi-envelope"
                viewBox="0 0 16 16"
              >
                <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
                <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
              </svg>
            </label>
            <div className="col-sm-10">
                <span style={{color:'#666'}}>{'Nivel: '}</span>
              <input
                type="number"
                min="1"
                max="4"
                className="form-control"
                id="nivel"
                placeholder="Nivel de Seguridad"
                value={Nivel}
                onChange={handleChangeInput}
                style={{ width: "2.5rem", display:'inline', color:'#666' }}
              />
            </div>
          </div>

          {Estado === "habilitado" ? (
            <div className="form-group row">
              <label for="email" className="col-sm-2 col-form-label">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  fill="currentColor"
                  className="bi bi-check-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                </svg>
              </label>
              <div className="col-sm-10">
                <button
                  onClick={toggleEstado}
                  className="btn btn-sm btn-success form-control"
                  style={{
                    width:'8rem',
                    marginTop: "1rem",
                    padding:6,
                    textTransform:'capitalize'
                  }}
                >
                  Habilitado
                </button>
              </div>
            </div>
          ) : (
            <div className="form-group row">
              <label for="email" className="col-sm-2 col-form-label">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  fill="currentColor"
                  className="bi bi-x-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </label>
              <div className="col-sm-10">
                <button
                  onClick={toggleEstado}
                  className="btn btn-sm btn-danger form-control"
                  style={{
                    width:'8rem',
                    marginTop: "1rem",
                    padding:6,
                    textTransform:'capitalize'
                  }}
                >
                  Inhabilitado
                </button>
              </div>
            </div>
          )}

          <br />

          <div>
            <style>
              {
                "\
                      h6:hover{\
                        text-decoration: solid underline 2px\
                      }\
                    "
              }
            </style>
          </div>
          <div
            style={{
              display: "grid",
              justifyContent: "center",
              flexFlow: "row wrap",
            }}
          >
            {CambioInput ? (
              <button
                type="submit"
                className="btn btn btn-success"
                onClick={actualizarUsuario}
                style={{
                  color: "white",
                  fontWeight: 400,
                  padding: 10,
                  textTransform:'capitalize'
                }}
              >
                Guardar Cambios
              </button>
            ) : (
              ""
            )}
          </div>
          <div style={{ marginTop: "10%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default DetalleUsuario;
