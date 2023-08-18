import React, { useState } from "react";
import logo from "../img/Logo_AdaptStorage_Blanco.png";
import DropdownUsuario from "./DropdownUsuario";

function Navbar({actualizarBusqueda}) {
  const [ SesionUsuario, setSesionUsuario ] = useState(JSON.parse(localStorage.getItem('sesion_usuario')));
  const [ MostrarDropdown, setMostrarDropdown ] = useState(false);
  const [Busqueda, setBusqueda] = useState('');

  const toggleMostrarDropdown = () => {
    setMostrarDropdown((prevMostrarDropdown) => !prevMostrarDropdown);
  }

  const handleChangeBuscar = (event) => {
    setBusqueda(event.target.value);
    actualizarBusqueda(event.target.value);
  };

  return (
    <div>
      <nav className="navbar-expand-lg bg-primary" style={{ display: "flex", boxShadow:'0px 0px 4px #999' }}>
        <div
          style={{
            justifyContent: "left",
            marginTop: "auto",
            marginBottom: "auto",
            marginLeft: "2rem",
            width: "auto",
          }}
        >
          <img src={logo} alt="" style={{ height: "4rem" }} />
        </div>

        <div
          style={{
            marginTop: "auto",
            marginBottom: "auto",
            width: "100%",
            marginLeft: "6rem",
            marginRight: "6rem",
          }}
        >
          <style>
            {
              "\
                div.asd{\
                    border-radius: 5px;\
                }\
                input.buscar:focus{\
                  text-decoration: none;\
                }\
                button.buscar{\
                  border-radius: 5px;\
                  background: #2196f3;\
                  box-shadow: none;\
                  color: white;\
                  border: solid white 2px;\
                }\
                button.buscar:hover{\
                  background: white;\
                  color: #2196f3;\
                  border: solid white 2px;\
                }\
                button.buscar:enabled{\
                  border: solid white 2px;\
                }\
                "
            }
          </style>

          <div className="d-flex" style={{ height: "3rem" }}>
            <div
              className="d-flex asd"
              style={{
                background: "white",
                display: "inline-block",
                width: "100%",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="50%"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                }}
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>

              <input
                className="form-control me-sm-2 buscar"
                type="text"
                placeholder="Buscar"
                onChange={handleChangeBuscar}
                value={Busqueda}
                style={{
                  fontSize: "1rem",
                  fontWeight: "300",
                }}
              />
            </div>

          {/*
            <button
              className="btn btn-secondary buscar"
              type="submit"
              style={{
                textTransform: "capitalize",
                marginLeft: "0.5rem",
                fontSize: "1rem",
                fontWeight: "300",
              }}
            >
              Buscar
            </button>
          */}
          
          </div>
        </div>

        <div
          style={{
            borderRight: "4px solid white",
            height: "6rem",
          }}
        ></div>

        <style>
          {
            "\
                div.cuenta{\
                  border-radius: 20px;\
                  background: #2196f3;\
                  color: white;\
                  border: solid #2196f3 0rem;\
                  transition: 0.3s;\
                  padding-top:1.5rem;\
                }\
                div.cuenta:hover{\
                  border-radius: 20px;\
                  background: white;\
                  color: #2196f3;\
                  border: solid #2196f3 0.5rem;\
                  padding-top:1rem;\
                }\
                div.cuenta:active{\
                  color: white;\
                  background: #2196f3;\
                }\
                div h6{\
                  -webkit-user-select: none;\
                  -moz-user-select: none;\
                  -ms-user-select: none;\
                }\
                "
          }
        </style>

        {MostrarDropdown ? (<DropdownUsuario/>) : (<p></p>)}

        <div className="cuenta" onClick={toggleMostrarDropdown}
          style={{
            paddingLeft:"0.5rem",
            paddingRight:"2rem",
            height:"6rem",
            zIndex: 3
          }}
        >
          <div
            style={{
              minWidth: "10rem",
              maxWidth: "16rem",
            }}
          >
            <div
              style={{
                textAlign: "right",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "60%",
                  verticalAlign: "middle",
                  display: "inline-block",
                }}
              >
                <h6
                  style={{
                    marginTop: "0.5rem",
                    fontWeight: "300",
                    textTransform: "capitalize",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {SesionUsuario.nombre}
                </h6>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="3rem"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
                style={{
                  marginLeft: "1rem",
                }}
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
