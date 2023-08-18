import React, { Fragment, useState } from "react";
import DetalleUsuario from "./DetalleUsuario";

const URL_REGISTRO = process.env.REACT_APP_SERVER_URL + "modificar.php";

function FilaVistaUsuario({ usuario, setDetalle }) {
  const [Nombre, setNombre] = useState(usuario.nombre);
  const [Correo, setCorreo] = useState(usuario.usuario);
  const [Nivel, setNivel] = useState(usuario.idTipoUsuario);
  const [IdUsuario, setIdUsuario] = useState(usuario.id);
  const [Estado, setEstado] = useState(usuario.estado);

  function toggleDetalle(){
    setDetalle({
      nombre:Nombre,
      correo:Correo,
      nivel:Nivel,
      id:IdUsuario,
      estado:Estado
    });
  }

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

      <tr 
      className="archivo" 
      style={{ borderBottom: "solid 0.05rem #bbb" }}
      onClick={toggleDetalle}
      >
        <th
          scope="row"
          style={{
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {Nombre}
        </th>
        <td
          style={{
            fontWeight: 400,
          }}
        >
          {'Nivel ' + Nivel}
        </td>
        <td
          style={{
            fontWeight: 400,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {Correo}
        </td>
        <td
          style={Estado === 'habilitado' ? {
            fontWeight: 400,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color:'green',
            textTransform:'capitalize'
          } : {
            fontWeight: 400,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color:'red',
            textTransform:'capitalize'
          }}
        >
          {Estado}
        </td>
      </tr>
    </Fragment>
  );
}

export default FilaVistaUsuario;
