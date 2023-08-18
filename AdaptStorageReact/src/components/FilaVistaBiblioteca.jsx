import React, { Fragment, useState } from "react";

function FilaVistaBiblioteca({ archivo, toggleDetalle }) {
  const [Titulo, setTitulo] = useState(archivo.titulo);
  const [Tipo, setTipoo] = useState(archivo.tipo);
  const [Tamanio, setTamanio] = useState(archivo.tamanio);
  const [Fecha, setFecha] = useState(archivo.fecha);
  const [Name, setName] = useState(archivo.name);
  const [Nivel, setNivel] = useState(archivo.nivel);
  const [Ruta, setRuta] = useState(archivo.ruta);
  const [Id, setId] = useState(archivo.id);
  
  const [SesionUsuario, setSesionUsuario] = useState(
    JSON.parse(localStorage.getItem("sesion_usuario")) || ""
  );

  function llamarDetalle( ){
  let file = {
      titulo: Titulo,
      tipo: Tipo,
      tamanio: Tamanio,
      fecha: Fecha,
      name: Name,
      nivel: Nivel,
      id: Id,
      ruta: Ruta
    }
    toggleDetalle(file);
  }

  const fecha = new Date(archivo.fecha);
  fecha.setDate(fecha.getDate() + 1);

  return (
    <Fragment>
      <style>
        {
          "\
          tr.archivo{\
            background: white;\
            color: #666;\
            border-right: solid white 0rem;\
            border-left: solid white 0rem;\
            transition: 0.3s;\
            border-bottom: solid 0.05rem #bbb;\
          }\
          tr.archivo:hover{\
            background: #2196f3;\
            color: white;\
            border-right: solid white 0.5rem;\
            border-left: solid white 0.5rem;\
            border-bottom: solid 0.05rem #bbb;\
          }\
          tr.archivo:active{\
            color: #2196f3;\
            background: white;\
            transition: 0.1s;\
          }\
          "
        }
      </style>
          <tr className="archivo" onClick={llamarDetalle}>
            <th
              scope="row"
              style={{
                fontWeight: 600,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {archivo.titulo}
            </th>
            <td style={{ fontWeight: 400, textTransform: "uppercase" }}>
              {archivo.tipo}
            </td>
            <td style={{ fontWeight: 400 }}>{"Nivel " + archivo.nivel}</td>
            <td style={{ fontWeight: 400 }}>
              {new Intl.DateTimeFormat("es-MX", { dateStyle: "short" }).format(
                fecha
              )}
            </td>
            <td style={{ fontWeight: 400 }}>
              {archivo.tamanio < 1048576
                ? archivo.tamanio < 1024
                  ? archivo.tamanio + " B"
                  : (archivo.tamanio / 1024).toFixed(0) + " KB"
                : (archivo.tamanio / 1048576).toFixed(0) + " MB"}
            </td>
            <td
              style={{
                fontWeight: 400,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {archivo.name}
            </td>
            <td>
              <style>
                {
                  "\
                  button.mas{\
                    border-radius:4px;\
                    width:1.8rem;\
                    background: white;\
                    color: #444;\
                    border: none;\
                    padding: 0px;\
                    transition: 0.3s;\
                  }\
                  button.mas:hover{\
                    background: #444;\
                    color: white;\
                  }\
                  button.mas:active{\
                    color: #2196f3;\
                    background: white;\
                    transition: 0.1s;\
                  }\
                  "
                }
              </style>
              <button className='mas'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                </svg>
              </button>
            </td>
          </tr>
    </Fragment>
  );
}

export default FilaVistaBiblioteca;
