import React, { useState } from "react";
import logo from "../img/Logo_AdaptStorage_Blanco.png";
import axios from "axios";
import { useHistory } from "react-router-dom";

const UPLOAD_ENDPOINT = process.env.REACT_APP_SERVER_URL + "subirArchivo.php";

function SubirArchivo() {
  let history = useHistory();

  //Se declara variable de sesión
  const [SesionUsuario, setSesionUsuario] = useState(
    JSON.parse(localStorage.getItem("sesion_usuario")) || ""
  );

  const [File, setFile] = useState(null);
  const [MensajeError, setMensajeError] = useState("");
  const [IdUsuario, setIdUsuario] = useState(SesionUsuario.id);
  const [nivelSeguridad, setNivelSeguridad] = useState(SesionUsuario.idTipoUsuario);
  const [usuarioPropietario, setUsuarioPropietario] = useState(SesionUsuario.nombre);

  const onSubmit = async (e) => {
    e.preventDefault();
    let res = await uploadFile(File);
    console.log(res.data);

    if (typeof res.data.error === "undefined" || res.data.error === true) {
      setMensajeError(
        (MensajeError) => "Hubo un error, por favor intentelo de nuevo."
      );
    } else {
      history.push("/biblioteca");
    }
  };

  const onChange = (e) => {
    setFile((File) => e.target.files[0]);
  };

  const uploadFile = async (File) => {
    const formData = new FormData();
    formData.append("documento", File);
    formData.append("id_usuario", IdUsuario);
    formData.append("nS", nivelSeguridad);
    formData.append("nombrePropietario", usuarioPropietario);
    return await axios.post(UPLOAD_ENDPOINT, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };


  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-primary"
        style={{ display: "flex", boxShadow:'0px 1px 4px #999' }}
      >
        <div
          className="container-fluid"
          style={{ justifyContent: "center" }}
          onClick={() => {
            history.push("/biblioteca");
          }}
        >
          <img src={logo} alt="" style={{ height: "4rem" }} />
        </div>
      </nav>

      <style>
            {
              "\
                button.subir{\
                    border-radius: 5px;\
                    background: #2196f3;\
                    box-shadow: none;\
                    color: white;\
                    border: solid #2196f3 2px;\
                }\
                \
                button.subir:hover{\
                    background: white;\
                    color: #2196f3;\
                    border: solid #2196f3 2px;\
                }\
                button.subir:enabled{\
                  border: solid #2196f3 2px;\
                }\
                \
                "
            }
          </style>

      <button
        onClick={() => {
          history.push("/biblioteca");
        }}
        className="btn btn-primary subir"
        style={{
          marginTop: "1rem",
          marginLeft: "10%",
          marginRight: "0.5rem",
          textTransform: "capitalize",
          fontWeight: "300",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1.2rem"
          fill="currentColor"
          className="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
        {" Regresar"}
      </button>

      <form onSubmit={onSubmit} className="form-inline">
        {/* Seleccionador de archivo*/}
        <div
          className="form-control"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "100px",
          }}
        >
          <style>
            {
              "\
                button.subir{\
                    border-radius: 5px;\
                    background: #2196f3;\
                    box-shadow: none;\
                    color: white;\
                    border: solid #2196f3 2px;\
                }\
                \
                button.subir:hover{\
                    background: white;\
                    color: #2196f3;\
                    border: solid #2196f3 2px;\
                }\
                button.subir:enabled{\
                  border: solid #2196f3 2px;\
                }\
                \
                "
            }
          </style>
          <button
            className="btn btn-primary subir"

            style={{
              textTransform: "capitalize",
              fontWeight: "300",
              padding:0
            }}
          >
            <input className='form-control-file' onChange={onChange} type="file" id="archivo"
            style={{
              padding:'1.2rem'
            }}/>
          </button>         
        </div>

        {/* Mensaje Error*/}
        <div>
          <h6
            style={{
              fontSize: 16,
              color: "#e51c23",
              textAlign: "center",
            }}
          >
            {MensajeError}
          </h6>
        </div>

        {/*Boton SUBIR*/}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <button

            type="submit"
            className="btn btn-primary subir"
            style={{
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
              textTransform: "capitalize",
              fontWeight: "300",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.2rem"
              fill="currentColor"
              className="bi bi-upload"
              viewBox="0 0 16 16"
            >
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
            </svg>
            {" Subir"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubirArchivo;
