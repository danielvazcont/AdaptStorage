import logo from "./img/Logo_AdaptStorage_Blanco.png";
import "./App.css";
import React, { useState } from "react";
import Login from "./components/Login";
import Registro from "./components/Registro";
import SubirArchivo from "./pages/SubirArchivo";
import BibliotecaUsuario from "./pages/BibliotecaUsuario";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AnalizarArchivo from "./pages/AnalizarArchivo";

function App() {
  const [visible, setVisible] = useState(true);

  function toggleLogin() {
    setVisible((prevVisible) => !prevVisible);
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            {/* -----------------------LOGIN/REGISTRO--------------------- */}

            <nav
              className="navbar navbar-expand-lg navbar-dark bg-primary"
              style={{ display: "flex" }}
            >
              <div
                className="container-fluid"
                style={{ justifyContent: "center" }}
              >
                <img src={logo} alt="" style={{ height: "100px" }} />
              </div>
            </nav>

            {visible ? (
              <Login
                mostrarRegistro={toggleLogin}
              />
            ) : (
              <Registro mostrarLogin={toggleLogin} />
            )}
          </Route>
          <Route exact path="/biblioteca">
            {/* -----------------------BIBLIOTECA USUARIO--------------------- */}
            <BibliotecaUsuario />
          </Route>
          <Route exact path="/analizar">
            {/* -----------------------BIBLIOTECA USUARIO--------------------- */}
            <AnalizarArchivo />
          </Route>
          <Route exact path="/subir">
            {/* -----------------------Subir archivo--------------------- */}
            <SubirArchivo />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
