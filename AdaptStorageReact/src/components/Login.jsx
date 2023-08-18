import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const URL_LOGIN = process.env.REACT_APP_SERVER_URL + "login.php";

const enviarData = async (url, data) => {
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  //console.log(resp);
  const json = await resp.json();
  console.log(json);

  return json;
};

function Login({ mostrarRegistro }) {
  let history = useHistory();

  //SE REVISA SI HAY SESIÓN INICIADA
  if (localStorage.getItem("sesion_usuario") !== null) {
    history.push("/biblioteca");
  }

  const [Usuario, setUsuario] = useState(
    localStorage.getItem("recien_registrado") || ""
  );
  const [Clave, setClave] = useState("");
  const [MensajeError, setMensajeError] = useState("");
  const [MensajeLogin, setMensajeLogin] = useState(
    localStorage.getItem("mensaje_recien_registrado") || ""
  );

  const validar = () => {
    if (Usuario === "" || Clave === "") {
      setMensajeError((MensajeError) => "Asegurese de llenar todos los campos");
      return false;
    }

    return true;
  };

  const handleChangeInput = (event) => {
    if (event.target.id === "password") {
      setClave((Clave) => event.target.value);
    } else if (event.target.id === "correo") {
      setUsuario((Usuario) => event.target.value);
    }

    if (event.target.value !== "") {
      event.target.className = "form-control";
    } else {
      event.target.className = "form-control is-invalid";
    }
  };

  const handleLogin = async () => {
    if (validar()) {
      const data = {
        usuario: Usuario,
        clave: Clave,
      };

      //console.log(data);
      const respuestaJson = await enviarData(URL_LOGIN, data);
      //console.log(respuestaJson);

      if (respuestaJson.conectado === true) {
        setMensajeLogin((MensajeLogin) => "Bienvenido " + respuestaJson.nombre);
        setMensajeError((MensajeError) => "");

        localStorage.clear();
        localStorage.setItem("sesion_usuario", JSON.stringify(respuestaJson));
        history.push("/biblioteca");
      } else {
        setMensajeLogin((MensajeLogin) => "");
        if (respuestaJson.error === "Usuario inhabilitado.") {
          setMensajeError((MensajeError) => "Esta cuenta ha sido inhabilitada");
        } else {
          setMensajeError((MensajeError) => "Al menos un dato es incorrecto");
        }
      }
    } else {
      console.log("LLENE TODOS LOS DATOS");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <div className="card mb-3" style={{ background: "#D0DFF2" }}>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          fill="currentColor"
          className="bi bi-key"
          viewBox="0 0 16 16"
          style={{ marginLeft: 15, marginTop: 7 }}
        >
          <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
          <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
        <h4 style={{ textAlign: "center", marginTop: "10px" }}>Login</h4>
        <div className="card-body">
          {/*FORMULARIO DE LOGIN DE USUARIO*/}

          <h6
            style={{
              color: "Green",
              textAlign: "center",
            }}
          >
            {MensajeLogin}
          </h6>

          <h6
            style={{
              fontSize: 16,
              color: "#e51c23",
              textAlign: "center",
            }}
          >
            {MensajeError}
          </h6>
          {/*
          <Link to="/biblioteca">Biblioteca</Link>
          
          <form action="">
          */}
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
                value={Usuario}
                onChange={handleChangeInput}
                style={{
                  width: "100%",
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
            {/*<a href="" style={{ textDecoration: "none" }}>
                <h6
                  className="card-subtitle text-muted"
                  style={{
                    textAlign: "center",
                    fontWeight: 400,
                    fontSize: 16,
                  }}
                >
                  ¿Olvidaste tu constraseña?
                </h6>
                </a>*/}
          </div>

          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={handleLogin} type="submit" className="btn login">
              Ingresar
            </button>
          </div>
          {/*</form>*/}

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
              onClick={mostrarRegistro}
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
                ¿No tienes cuenta? <b>Registrate.</b>
              </h6>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
