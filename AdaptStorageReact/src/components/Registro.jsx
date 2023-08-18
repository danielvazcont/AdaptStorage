import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";

const URL_REGISTRO = process.env.REACT_APP_SERVER_URL + "registrar.php";

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

function Registro({ mostrarLogin }) {
  const [Usuario, setUsuario] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Clave, setClave] = useState("");
  const [ConfClave, setConfClave] = useState("");
  const [MensajeError, setMensajeError] = useState("");

  const [extra2, setExtra2] = useState([]);

  useEffect(() => {
    obtenerArchivos2();
  }, []);

  async function obtenerArchivos2() {
    const res2 = await axios.get(
      process.env.REACT_APP_SERVER_URL + "mostrarDatos2.php"
    );
    console.log(res2.data);
    setExtra2(res2.data);
  }

  const validar = () => {
    if (Usuario === "" || Clave === "" || Correo === "" || ConfClave === "") {
      setMensajeError("Asegurese de llenar todos los campos.");
      return false;
    } else if (Clave !== ConfClave) {
      setMensajeError("Asegurese de que las contraseñas coincidan.");
      return false;
    }

    return true;
  };

  const handleRegistro = async () => {
    if (validar()) {
      const data = {
        usuario: Usuario,
        correo: Correo,
        password: Clave,
      };

      const correos_registrados = extra2.map((usuario) => usuario.usuario);

      if (!correos_registrados.includes(Correo)) {
        //El correo no está registrado
        console.log(data);
        const respuestaJson = await enviarData(URL_REGISTRO, data);
        console.log(respuestaJson);

        if (respuestaJson.conectado === true) {
          setMensajeError("");

          localStorage.setItem("recien_registrado", Correo);
          localStorage.setItem(
            "mensaje_recien_registrado",
            "¡Registro Exitoso!"
          );
          window.location.reload(false);
        } else {
          setMensajeError("Al menos un dato es incorrecto");
        }
      } else {
        //El correo ya está registrado
        setMensajeError("Ya existe una cuenta registrada con este correo.");
      }
    } else {
      console.log("INTRODUZCA CORRECTAMENTE LOS DATOS");
    }
  };

  const handleChangeInput = (event) => {
    if (event.target.id === "usuario") {
      setUsuario(event.target.value);
    } else if (event.target.id === "correo") {
      setCorreo(event.target.value);
    } else if (event.target.id === "password") {
      setClave(event.target.value);
    } else if (event.target.id === "confirmar_password") {
      setConfClave(event.target.value);
    }

    if (event.target.value !== "") {
      event.target.className = "form-control";
    } else {
      event.target.className = "form-control is-invalid";
    }
  };

  return (
    <Fragment>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <div className="card mb-3" style={{ background: "#D0DFF2" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
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
            <h4 style={{ textAlign: "center", marginTop: "10px" }}>Registro</h4>
            <div className="card-body">
              {/*FORMULARIO DE REGISTRO DE USUARIO*/}
              <style>
                {
                  "\
                button.login{\
                    font-weight: 400;\
                    border-radius: 5px;\
                    background: #2ECC71 ;\
                    box-shadow: none;\
                    color: white;\
                    border: solid #2ECC71  2px;\
                }\
                \
                button.login:hover{\
                  font-weight: 500;\
                    background: white;\
                    color: #2ECC71 ;\
                    border: solid #2ECC71  2px;\
                }\
                button.login:enabled{\
                  border: solid #2ECC71  2px;\
                }\
                "
                }
              </style>

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
                    id="usuario"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Nombre"
                    value={Usuario}
                    onChange={handleChangeInput}
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
                    type="email"
                    className="form-control"
                    id="correo"
                    aria-describedby="emailHelp"
                    placeholder="Correo"
                    value={Correo}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label for="email" className="col-sm-2 col-form-label">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    fill="currentColor"
                    className="bi bi-lock"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                  </svg>
                </label>
                <div className="col-sm-10">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Contraseña"
                    value={Clave}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label for="email" className="col-sm-2 col-form-label">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    fill="currentColor"
                    className="bi bi-lock-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                  </svg>
                </label>
                <div className="col-sm-10">
                  <input
                    type="password"
                    className="form-control"
                    id="confirmar_password"
                    placeholder="Confirmar contraseña"
                    value={ConfClave}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <br />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={handleRegistro}
                  className="btn login"
                >
                  Registrar
                </button>
              </div>

              <div style={{ marginTop: "20%" }}>
                <style>
                  {
                    "\
                                h6:hover{\
                                text-decoration: solid underline 2px\
                                }\
                            "
                  }
                </style>
                <span
                  onClick={mostrarLogin}
                  style={{ textDecoration: "none", cursor: "pointer" }}
                >
                  <h6
                    className="card-subtitle text-muted"
                    style={{
                      textAlign: "left",
                      fontWeight: 400,
                      fontSize: 14,
                    }}
                  >
                    ¿Ya tienes cuenta? <b>Inicia sesión.</b>
                  </h6>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Registro;
