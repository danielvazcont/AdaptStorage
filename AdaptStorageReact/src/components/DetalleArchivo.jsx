import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const URL_REGISTRO = process.env.REACT_APP_SERVER_URL + "modificarArchivo.php";
const URL_REGISTRO2 = process.env.REACT_APP_SERVER_URL + "eliminar.php";

const DetalleArchivo = ({ archivo, refreshTablas }) => {
  let history = useHistory();
  const URL_DESCARGA = process.env.REACT_APP_SERVER_URL;

  const [SesionUsuario, setSesionUsuario] = useState(
    JSON.parse(localStorage.getItem("sesion_usuario")) || ""
  );

  const [Titulo, setTitulo] = useState(archivo.titulo);
  const [Tipo, setTipoo] = useState(archivo.tipo);
  const [Tamanio, setTamanio] = useState(archivo.tamanio);
  const [Fecha, setFecha] = useState(archivo.fecha);
  const [Name, setName] = useState(archivo.name);
  const [Nivel, setNivel] = useState(archivo.nivel);
  const [Id, setId] = useState(archivo.id);

  const [CambioInput, setCambioInput] = useState(false);
  const [MensajeError, setMensajeError] = useState("a");
  const [ToggleEditar, setToggleEditar] = useState(false);

  const [ToggleEliminar, setToggleEliminar] = useState(false);

  function descargarArchivo() {
    axios({
      url: URL_DESCARGA + archivo.ruta,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", Titulo + "." + Tipo); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  }

  function handleChangeInput(event) {
    setCambioInput(true);
    if (event.target.id === "titulo") {
      setTitulo(event.target.value);
    } else if (event.target.id === "nivel") {
      setNivel(event.target.value);
    }

    if (event.target.value !== "") {
      event.target.className = "form-control";
    } else {
      event.target.className = "form-control is-invalid";
    }
  }

  const validar = () => {
    if (Titulo === "" || Nivel === "") {
      setMensajeError("Asegurese de llenar todos los campos");
      return false;
    } else if (Nivel < 1) {
      setMensajeError("El nivel de acceso mínimo permitido es 1");
      return false;
    } else if (Nivel > SesionUsuario.idTipoUsuario) {
      setMensajeError(
        "El nivel de acceso máximo disponible es " + SesionUsuario.idTipoUsuario
      );
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

  const actualizarArchivo = async () => {
    if (validar()) {
      const data = {
        Id,
        Titulo,
        Nivel,
      };

      archivo.titulo = Titulo;
      archivo.nivel = Nivel;

      const respuestaJson = await enviarData(URL_REGISTRO, data);
      console.log(respuestaJson);
      setToggleEditar(!ToggleEditar);
    }
  };

  function mostrarEditar() {
    setToggleEditar(!ToggleEditar);
  }
  //eliminar
  const enviarData2 = async (url2, data2) => {
    const resp2 = await fetch(url2, {
      method: "POST",
      body: JSON.stringify(data2),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const json2 = await resp2.json();
    console.log(json2);
  
    return json2;
  };

  const eliminarArchivo = async () => {
    console.log(Id);
    const data2 = {
      Id,
    };
    const respuestaJson = await enviarData2(URL_REGISTRO2, data2);
    //Actualizar Tabla
    history.push("/");
  };

  const fecha = new Date(Fecha);
  fecha.setDate(fecha.getDate() + 1);

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
        paddingTop: "1rem",
      }}
    >
      <style>
        {
          "\
        button.archivo{\
          background: white;\
          color: #444;\
          padding: 0px;\
          transition: 0.2s;\
        }\
        button.archivo:hover{\
          background: #444;\
          color: white;\
        }\
        button.archivo:active{\
          color: #444;\
          background: white;\
          transition: 0.1s;\
        }\
        h6.detalle{\
          font-weight: 400;\
          font-size: 0.8rem;\
          color: #444;\
        }\
        div.blur{\
          filter: blur(2px);\
          overflow: hidden;\
        }\
        button.volver{\
          font-weight: 300;\
          border-radius: 5px;\
          background: #444;\
          box-shadow: none;\
          color: white;\
          border: solid #444 3px;\
        }\
        \
        button.volver:hover{\
          font-weight: 400;\
          background: white;\
          color: #444;\
          border: solid #444 3px;\
        }\
        button.volver:enabled{\
          border: solid #444 3px;\
        }\
        button.elim{\
          font-weight: 300;\
          border-radius: 5px;\
          background: red;\
          box-shadow: none;\
          color: white;\
          border: solid red 3px;\
        }\
        \
        button.elim:hover{\
          font-weight: 400;\
          background: white;\
          color: red;\
          border: solid red 3px;\
        }\
        button.elim:enabled{\
          border: solid red 3px;\
        }\
        "
        }
      </style>
      {ToggleEliminar ? (
        <div
          className="card mb-3"
          style={{
            position: "absolute",
            width: "24rem",
            background: "#D0DFF2",
            display: "grid",
            gridTemplateColumns: "3",
            gridTemplateRows: "2",
            zIndex: 3,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              gridColumn: "1/3",
              gridRow: "1",
            }}
          >
            <h5 style={{ textAlign: "center", marginTop: "2rem" }}>
              ¿Seguro que desea eliminar?
            </h5>
          </div>
          <div
            style={{
              width: "100%",
              height: "100%",
              gridColumn: "1/3",
              gridRow: "2",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => {
                setToggleEliminar(!ToggleEliminar);
              }}
              className="btn btn-secondary volver"
              style={{
                marginLeft: "0.5rem",
                marginRight: "0.5rem",
                textTransform: "capitalize",
                marginTop: "1rem",
                marginBottom: "2rem",
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
            <button
              onClick={eliminarArchivo}
              className="btn btn-danger elim"
              style={{
                marginLeft: "0.5rem",
                marginRight: "0.5rem",
                textTransform: "capitalize",
                marginTop: "1rem",
                marginBottom: "2rem",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2rem"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
              {" Eliminar"}
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {!ToggleEditar ? (
        ""
      ) : (
        <div
          className="card mb-3"
          style={{
            position: "absolute",
            width: "24rem",
            background: "#D0DFF2",
            display: "grid",
            gridTemplateColumns: "2",
            gridTemplateRows: "2",
            zIndex: 3,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              gridColumn: "1/3",
              gridRow: "1",
            }}
          >
            <button
              className="btn"
              onClick={() => {
                mostrarEditar();
                setTitulo(archivo.titulo);
                setNivel(archivo.nivel);
                setMensajeError("a");
              }}
              style={{
                position: "absolute",
                left: 0,
                marginLeft: 15,
                marginTop: 15,
                padding: 5,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                fill="currentColor"
                class="bi bi-arrow-left-short"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                />
              </svg>
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              fill="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16"
              style={{ float: "right", marginRight: 15, marginTop: 15 }}
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>

            <h4 style={{ textAlign: "center", marginTop: "3rem" }}>Editar</h4>
            <h6
              style={{
                fontSize: 16,
                color: "#e51c23",
                textAlign: "center",
                marginTop: "1rem",
                visibility: MensajeError === "a" ? "hidden" : "visible",
              }}
            >
              {MensajeError}
            </h6>
          </div>
          <div
            style={{
              gridColumn: "1/3",
              gridRow: "2",
              justifyContent: "center",
              marginBottom: "1rem",
              paddingLeft: "6rem",
              paddingRight: "6rem",
            }}
          >
            <div className="form-group row">
              <label for="titulo" className="col-sm-2 col-form-label">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  fill="currentColor"
                  class="bi bi-file-font"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.943 4H5.057L5 6h.5c.18-1.096.356-1.192 1.694-1.235l.293-.01v6.09c0 .47-.1.582-.898.655v.5H9.41v-.5c-.803-.073-.903-.184-.903-.654V4.755l.298.01c1.338.043 1.514.14 1.694 1.235h.5l-.057-2z" />
                  <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                </svg>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="titulo"
                  aria-describedby="emailHelp"
                  placeholder="Titulo"
                  value={Titulo}
                  onChange={handleChangeInput}
                  style={{
                    marginLeft: "0.6rem",
                    width: "100%",
                    color: "#666",
                  }}
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="nivel" className="col-sm-2 col-form-label">
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
                <span style={{ marginLeft: "0.6rem", color: "#666" }}>
                  {"Nivel: "}
                </span>
                <input
                  type="number"
                  min="1"
                  max={SesionUsuario.idTipoUsuario}
                  className="form-control"
                  id="nivel"
                  placeholder="Nivel de Seguridad"
                  value={Nivel}
                  onChange={handleChangeInput}
                  style={{ width: "2.5rem", display: "inline", color: "#666" }}
                />
              </div>
            </div>
            <div
              className="form-group row"
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <button
                type="submit"
                className="btn btn-success"
                onClick={actualizarArchivo}
                style={{
                  color: "white",
                  width: "10rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  fontWeight: 400,
                  padding: 10,
                  visibility: CambioInput ? "visible" : "hidden",
                  textTransform: "capitalize",
                }}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={
          ToggleEliminar || ToggleEditar ? "card mb-3 blur" : "card mb-3"
        }
        style={{
          width: "32rem",
          background: "#D0DFF2",
          display: "grid",
          gridTemplateColumns: "3",
          gridTemplateRows: "4",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            gridColumn: "1/3",
            gridRow: "1",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            fill="currentColor"
            className="bi bi-file-earmark"
            viewBox="0 0 16 16"
            style={{ marginLeft: 15, marginTop: 15 }}
          >
            <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
          </svg>

          <button
            className="btn"
            onClick={() => {history.push("/");}}
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
                fillRule="evenodd"
                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
              />
              <path
                fillRule="evenodd"
                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
              />
            </svg>
          </button>

          <h4 style={{ textAlign: "center" }}>Archivo</h4>
        </div>
        <div
          style={{
            display: "flex",
            gridColumn: "1/2",
            gridRow: "2",
            justifyContent: "center",
            alignItems: "center",
            margin: "1rem",
            paddingLeft: "2rem",
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/ico/" + Tipo.toUpperCase() + ".png"}
            alt="ico"
          />
        </div>

        <div
          style={{
            gridColumn: "2/2",
            gridRow: "2",
            margin: "1rem",
            paddingLeft: "2rem",
          }}
        >
          <h6 className="detalle">Nombre</h6>
          <p>{archivo.titulo}</p>
          <h6 className="detalle">Tamaño</h6>
          <p>
            {Tamanio < 1048576
              ? Tamanio < 1024
                ? Tamanio + " Bytes"
                : (Tamanio / 1024).toFixed(0) + " KB"
              : (Tamanio / 1048576).toFixed(0) + " MB"}
          </p>
        </div>
        <div
          style={{
            gridColumn: "1/3",
            gridRow: "3",
            display: "grid",
            gridTemplateColumns: "2",
            gridTemplateRows: "1",
          }}
        >
          <div
            style={{
              margin: "1rem",
              gridColumn: "1/2",
              gridRow: "1",
              paddingLeft: "2rem",
            }}
          >
            <h6 className="detalle">Tipo de Archivo</h6>
            <p>{Tipo.toUpperCase()}</p>
            <h6 className="detalle">Fecha de Carga</h6>
            <p>
              {new Intl.DateTimeFormat("es-MX", {
                dateStyle: "medium",
              }).format(fecha)}
            </p>
          </div>
          <div
            style={{
              margin: "1rem",
              gridColumn: "2/2",
              gridRow: "1",
              paddingLeft: "2rem",
            }}
          >
            <h6 className="detalle">Propietario</h6>
            <p>{Name}</p>
            <h6 className="detalle">Nivel de Seguridad</h6>
            <p>{"Nivel " + archivo.nivel}</p>
          </div>
        </div>
        <div
          style={{
            gridColumn: "1/3",
            gridRow: "4",
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          {Tipo === "docx" || Tipo === "txt" || Tipo === "pdf" ? (
            <button
              onClick={() => {
                history.push("/analizar", { archivo: archivo });
              }}
              className="btn btn btn-light archivo"
              style={{
                margin: "0.6rem",
                fontWeight: 400,
                padding: 6,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                fill="currentColor"
                className="bi bi-clipboard-data"
                viewBox="0 0 16 16"
              >
                <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
              </svg>
            </button>
          ) : (
            ""
          )}
          <button
            onClick={descargarArchivo}
            className="btn btn btn-light archivo"
            style={{
              margin: "0.6rem",
              fontWeight: 400,
              padding: 6,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              fill="currentColor"
              className="bi bi-download"
              viewBox="0 0 16 16"
            >
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>
          </button>
          <button
            onClick={mostrarEditar}
            className="btn btn btn-light archivo"
            style={{
              margin: "0.6rem",
              fontWeight: 400,
              padding: 6,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              fill="currentColor"
              className="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
          </button>
          <button
            onClick={() => {
              setToggleEliminar(!ToggleEliminar);
            }}
            className="btn btn btn-light archivo"
            style={{
              margin: "0.6rem",
              fontWeight: 400,
              padding: 6,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleArchivo;
