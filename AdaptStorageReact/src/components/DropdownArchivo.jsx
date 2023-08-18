import React from 'react';

const DropdownArchivo = () => {

    function handleClick(){

    }

    
    return (
        <div
      style={{
        position: "absolute",
        width: "8rem",
        right: "0",
        paddingTop: "2.8rem",
        marginRight: "3.5rem",
        background: "white",
        display: "grid",
        boxShadow: "1px 1px 4px #666",
        justifyContent: "center",
        border: "solid 3px #444",
        borderRadius: "5px",
        zIndex: 0,
      }}
    >
      <div
        style={{
          display: "grid",
          float: "right",
          justifyContent: "center",
        }}
      >
        <style>
          {
            "\
                button.dropOrdenar{\
                    border-radius: 0px;\
                    background: white;\
                    box-shadow: none;\
                    color: #444;\
                    transition: 0.2s;\
                }\
                button.dropOrdenar:hover{\
                    background: #444;\
                    color: white;\
                }\
                "
          }
        </style>
        <button
          onClick={handleClick}
          id="titulo"
          className="btn btn-secondary dropOrdenar"
          style={{
            textTransform: "capitalize",
            fontWeight: "400",
            fontSize: "0.8rem",
            width: "7.7rem",
          }}
        >
          {"Nombre"}
        </button>
        <button
          onClick={handleClick}
          id="tipo"
          className="btn btn-secondary dropOrdenar"
          style={{
            textTransform: "capitalize",
            fontWeight: "400",
            fontSize: "0.8rem",
            width: "7.7rem",
          }}
        >
          {"Tipo"}
        </button>
        <button
          onClick={handleClick}
          id="nivel_seguridad"
          className="btn btn-secondary dropOrdenar"
          style={{
            textTransform: "capitalize",
            fontWeight: "400",
            fontSize: "0.8rem",
            width: "7.7rem",
          }}
        >
          {"Seguridad"}
        </button>
        <button
          onClick={handleClick}
          id="fecha"
          className="btn btn-secondary dropOrdenar"
          style={{
            textTransform: "capitalize",
            fontWeight: "400",
            fontSize: "0.8rem",
            width: "7.7rem",
          }}
        >
          {"Fecha"}
        </button>
        <button
          onClick={handleClick}
          id="tamanio"
          className="btn btn-secondary dropOrdenar"
          style={{
            textTransform: "capitalize",
            fontWeight: "400",
            fontSize: "0.8rem",
            width: "7.7rem",
          }}
        >
          {"Tamaño"}
        </button>
        <button
          onClick={handleClick}
          id="namePropietario"
          className="btn btn-secondary dropOrdenar"
          style={{
            textTransform: "capitalize",
            fontWeight: "400",
            fontSize: "0.8rem",
            width: "7.7rem",
          }}
        >
          {"Propietario"}
        </button>
      </div>
    </div>
    );
}

export default DropdownArchivo;
