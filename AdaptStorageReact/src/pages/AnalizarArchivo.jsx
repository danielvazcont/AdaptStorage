import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import logo from "../img/Logo_AdaptStorage_Blanco.png";
import axios from "axios";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const URL_DESCARGA = process.env.REACT_APP_SERVER_URL;

function AnalizarArchivo() {
  const rcolor = require('rcolor');
  let history = useHistory();
  let location = useLocation();
  const [Archivo, setArchivo] = useState(
    location.state ? location.state.archivo : ""
  );
  const [ArchivoContenido, setArchivoContenido] = useState("");
  
  const [ToggleGrafica, setToggleGrafica] = useState("false");

  //Variables de Análisis
  const [CantPalabras, setCantPalabras] = useState(0);
  const [CantParrafos, setCantParrafos] = useState(0);
  const [CantLineas, setCantLineas] = useState(0);
  const [CantPalabrasMayus, setCantPalabrasMayus] = useState(0);
  const [PalabrasRepetidas, setPalabrasRepetidas] = useState([{
    palabra: '',
    cant: 0
  }]);

  //Variables para Gráficos
  const [GraficoRepetidas, setGraficoRepetidas] = useState({});
  const [GraficoMayusMinus, setGraficoMayusMinus] = useState({});
  const [GraficoPalabras, setGraficoPalabras] = useState({});

  if (Archivo === "") {
    history.push("/");
  }

  //mostrar contenido
  useEffect(() => {
    obtenerArchivos3();
  }, []);

  async function obtenerArchivos3() {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL +
        "mostrarDatos3.php?id=" +
        Archivo.id +
        ""
    );

    setArchivoContenido(res.data[0].contenido);
    setTimeout(function () {
      analizarContenido(res.data[0].contenido);
    }, 200);
  }

  function analizarContenido(Contenido) {
    //Cantidad de Palabras
    let cont = Contenido;
    cont = cont.replace(/(^\s*)|(\s*$)/gi, "");
    cont = cont.replace(/\s\s+/g, " ");
    //Guardar todas las palabras en un array
    let palabras = cont.split(" ").filter(String);

    const cantPalabras = palabras.length;
    setCantPalabras(palabras.length);

    //Cantidad de Párrafos
    cont = Contenido;
    cont = cont.replace(/(\r\n|\r|\n){3,}/g, "$1\n");

    const cantParrafos = cont.split("\n\n").length;
    setCantParrafos(cont.split("\n\n").length);

    //Cantidad de Lineas
    cont = Contenido;
    const cantLineas = cont.split("\n").length;
    setCantLineas(cont.split("\n").length);

    //Cantidad de Palabras que comienzan con Mayuscula
    let mayus = 0;
    for (let i = 0; i < palabras.length; i++) {
      if ((/[a-zA-Z]/).test(palabras[i].charAt(0))) {
        if (palabras[i].charAt(0) === palabras[i].charAt(0).toUpperCase()) {
          mayus = mayus + 1;
        }
      }
    }
    const palabrasMayus = mayus;
    setCantPalabrasMayus(mayus);

    //Grafica de Dona Mayusculas/Minusculas
    setGraficoMayusMinus({
      labels:[
        (palabrasMayus + '. ' + 'Mayusculas'),
        ((cantPalabras - palabrasMayus) + '. ' + 'Minusculas')
      ],
      datasets:[{
        label: 'Mayusculas/Minusculas',
        data:[palabrasMayus, (cantPalabras - palabrasMayus)],
        backgroundColor:['#E67E22', '#2980B9']
      }]
    });

    //Gráfica de Barras Palabras/Lineas/Parrafos
    setGraficoPalabras({
      labels:[
        '',
      ],
      datasets:[{
        label:(cantPalabras + '. ' + 'Palabras'),
        data:[cantPalabras],
        backgroundColor:[rcolor({saturation:0.6, value:0.9})],
      },{
        label:(cantLineas + '. ' + 'Lineas'),
        data:[cantLineas],
        backgroundColor:[rcolor({saturation:0.6, value:0.9})],
      },{
        label:(cantParrafos + '. ' + 'Párrafos'),
        data:[cantParrafos],
        backgroundColor:[rcolor({saturation:0.6, value:0.9})],
      }]
    });

    //Palabras que se repiten
    let cantidad = []
    let palabrasOrdenadas = [];

      //Quitar signos de puntuación
    for (let i = 0; i < palabras.length; i++) {
      if ((/[a-zA-Z]/).test(palabras[i]) || (/\d/).test(palabras[i].charAt(0))) {
        palabras[i] = palabras[i].replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '');
        palabras[i] = palabras[i].replace(/\s{2,}/g," ");
      }
    }

      //Contar Repetidas
    for (let i = 0; i < palabras.length; i++) {
      let repetida = false;
      for (let j = 0; j < palabrasOrdenadas.length; j++) {
        if (palabras[i].toLowerCase() === palabrasOrdenadas[j].toLowerCase()) {       
          repetida = true;
        }
      }
      if (repetida === false) {
        let temp = 0
        for (let j = 0; j < palabras.length; j++) {
          if (palabras[i].toLowerCase() === palabras[j].toLowerCase()) {
            temp = temp + 1;
          }
        }
        palabrasOrdenadas.push(palabras[i]);
        cantidad.push(temp)
      }
    }

      //Combinar Palabras y Cantidad
    let lista = [];
    for (let i = 0; i < palabrasOrdenadas.length; i++) {
      lista.push({'palabra': palabrasOrdenadas[i], 'cant':cantidad[i]});
    }

      //Ordenar Palabras
    lista.sort(function(a,b) {
      return ((a.cant > b.cant) ? -1 : ((a.cant === b.cant) ? 0 : 1))
    });    

      //Primer Letra Mayuscula
    for (let i = 0; i < lista.length; i++) {
      let temp = lista[i].palabra.toLowerCase();
      lista[i].palabra = temp.charAt(0).toUpperCase() + temp.slice(1);
    }

      //Guardar en variable de sesión
    setPalabrasRepetidas(lista);

      //Gráfica de Pastel Palabras Repetidas
    const nombres = [];
    const datos = [];
    const colores = [];

    for (let i = 0; i < lista.length; i++) {
      if (lista[i].cant > 1) {
        nombres.push(lista[i].cant + '. ' + lista[i].palabra);
      datos.push(lista[i].cant);
      colores.push(rcolor({saturation:0.6, value:0.9}));
      }
    }

    setGraficoRepetidas({
      labels: nombres,
      datasets:[{
        label: 'Palabras Repetidas',
        data: datos,
        backgroundColor: colores
      }]
    });
  }

  return (
    <div>
      <style>
            {
              "\
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
                button.subir{\
                  border-radius: 5px;\
                  background: #ff9800;\
                  box-shadow: none;\
                  color: white;\
                  border: solid #ff9800 3px;\
                }\
                button.subir:hover{\
                    background: white;\
                    color: #ff9800;\
                    border: solid #ff9800 3px;\
                }\
                button.subir:enabled{\
                  border: solid #ff9800 3px;\
                }\
                h6.detalle{\
                  font-weight: 400;\
                  font-size: 1.2rem;\
                  color: #444;\
                }\
                p.resul{\
                  font-weight: 400;\
                  font-size: 1.6rem;\
                  color: #222;\
                }\
                div.blur{\
                  filter: blur(2px);\
                  overflow: hidden;\
                  pointer-events: none;\
                }\
                "
            }
          </style>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-primary"
        style={{ display: "flex", boxShadow: "0px 1px 4px #999" }}
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
      {ToggleGrafica ? (
        ""
      ) : (
        <div className='container-fluid'
        style={{
          position:'absolute',
          zIndex: 1,
          }}>
          <div
            className="card mb-3"
            style={{
              width: "80%",
              marginTop:'2rem',
              marginLeft:'auto',
              marginRight:'auto',
              background: "#D0DFF2",
              display: "grid",
              gridTemplateColumns: "50% 50%",
              gridTemplateRows: "2",
              zIndex: 2
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
              onClick={() => setToggleGrafica(!ToggleGrafica)}
                className="btn"
                style={{
                  position: "absolute",
                  left: 0,
                  marginLeft: 30,
                  marginTop: 15,
                  padding: 5,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.6rem"
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
              <svg xmlns="http://www.w3.org/2000/svg" 
                width="3rem" 
                fill="currentColor" 
                class="bi bi-bar-chart" 
                viewBox="0 0 16 16"
                style={{ float: "right", marginRight: 30, marginTop: 15 }}
                >
                <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
              </svg>

              <h4 style={{marginTop: "4rem", textAlign:'center'}}>Gráficos</h4>

            </div>
            <div
              style={{
                gridColumn: "1/2",
                gridRow: "2",
                display:'flex',
                justifyContent: "center",
                marginTop: "1rem",
                marginLeft:'1rem',
                paddingLeft:'1rem',
                paddingRight:'2rem',
              }}
            >
              <Chart
                type='bar'
                data={GraficoPalabras}
              />
            </div>
            <div
              style={{
                gridColumn: "2/2",
                gridRow: "2",
                display:'flex',
                justifyContent: "center",
                marginBottom: "1rem",
                borderLeft:'#666 solid 2px',
                paddingLeft:'2rem',
                marginRight:'1rem',
                paddingRight:'1rem',
                marginTop: "1rem",
              }}
            >
              <div style={{width:'50%'}}>
                <Chart
                  type='doughnut'
                  data={GraficoMayusMinus}
                  style={{
                  }}
                />
              </div>
            </div>
            <div
              style={{
                gridColumn: "1/3",
                gridRow: "3",
                display:'flex',
                justifyContent: "center",
                marginBottom: "1rem",
                marginTop:'1rem',
                paddingTop:'1rem',
                marginLeft:'2rem',
                marginRight:'2rem',
                paddingBottom:'2rem',
                borderTop:'solid 2px #666'
              }}
            >
              <div style={{width:'50%'}}>
                <Chart
                  type='pie'
                  data={GraficoRepetidas}
                  style={{
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div style={{display:'flex', justifyContent:'center'}}>
        <div
        className={!ToggleGrafica ? 'blur' : ''}
          style={{
            marginTop: "2rem",
            background: "#D0DFF2",
            display: "grid",
            gridTemplateColumns: "50% 50%",
            gridTemplateRows: "3",
            width:'90%',
            borderRadius:'10px',
            boxShadow:'0px 0px 6px #999',
            marginBottom:'2rem',
          }}
        >
          
          <div
            style={{
              gridColumn: "1/3",
              gridRow: "1",
            }}
          >
            <button
              onClick={() => {
                history.push("/biblioteca");
              }}
              className="btn btn-secondary volver"
              style={{
                marginTop: "1rem",
                marginLeft: "2rem",
                textTransform: "capitalize",
                fontWeight: "400",
                fontSize:'1.2rem'
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
              onClick={() => setToggleGrafica(!ToggleGrafica)}
              className="btn btn-warning subir"
              style={{
                float:'right',
                marginTop:'1rem',
                marginRight:'2rem',
                paddingRight:'1rem',
                paddingLeft:'1rem',
                paddingTop:'0.4rem',
                paddingBottom:'0.4rem',
                textTransform: "capitalize",
                fontWeight: "400",
                fontSize:'1.2rem'
              }}
            >
              {'Graficar '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                fill="currentColor"
                className="bi bi-clipboard-data"
                viewBox="0 0 16 16"
              >
                <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
              </svg>
            </button>
          </div>
          <div
            style={{
              gridTemplateColumns: "1",
              gridTemplateRows: "3",   
              gridColumn: "1/2",
              gridRow: "2",
              borderRight:'#666 solid 2px',
              marginBottom:'2rem',
              minHeight:'38rem'
            }}
          >
            <div style={{
              gridColumn: "1",
              gridRow: "1",
              }}>
              <h4 style={{textAlign:'center', marginTop:'1rem'}}>{Archivo.titulo}</h4>
            </div>
            
            <div style={{
              display:'flex', 
              justifyContent:'center',
              gridColumn: "1",
              gridRow: "2",
              height:'94%',
            }}>
              
              <iframe frameBorder="0" src={'https://docs.google.com/gview?url=' + URL_DESCARGA + Archivo.ruta + '&embedded=true'} style={{
                border:'4px white solid',
                borderRadius:'10px',
                width:'90%',
                marginTop:'1rem',
                marginBottom:'1rem',
              }}>
              </iframe>
              {/*<iframe frameBorder="0" src={'https://docs.google.com/gview?url=' + 'https://adaptstorage.000webhostapp.com/AdaptStorage/uploads/tarea-3er-parcial-(juan-uribe---19310177).docx' + '&embedded=true'} style={{
                border:'4px white solid',
                borderRadius:'10px',
                width:'90%',
                marginTop:'1rem',
                marginBottom:'1rem',
              }}
              ></iframe>*/}
              
            </div>
          </div>
          <div
            style={{
              display:'grid',
              gridTemplateColumns: "50% 50%",
              gridTemplateRows: "3",
              gridColumn: "2/2",
              gridRow: "2",
            }}
          >
            <div style={{
              gridColumn: "1/3",
              gridRow: "1",
              }}>
              <h4 style={{ textAlign: "center", marginTop:'1rem' }}>Análisis</h4>
            </div>

            <div style={{
              marginTop:'1rem',
              gridColumn: "1/2",
              gridRow: "2",
              paddingLeft:'2rem',
              }}>

              <h6 className="detalle">Cant. de Palabras</h6>
              <p className='resul'>{CantPalabras}</p>

              <h6 className="detalle">Cant. de Lineas</h6>
              <p className='resul'>{CantLineas}</p>

            </div>

            <div style={{
              marginTop:'1rem',
              gridColumn: "2/2",
              gridRow: "2",
              paddingLeft:'2rem',
              }}>
                
              <h6 className="detalle">Palabras que comienzan con letra mayuscula</h6>
              <p className='resul'>{CantPalabrasMayus}</p>

              <h6 className="detalle">Cant. de Párrafos</h6>
              <p className='resul'>{CantParrafos}</p>

            </div>

            <div style={{
              gridColumn: "1/3",
              gridRow: "3",
              paddingTop:'2rem',
              paddingBottom:'2rem',
              borderTop:'#666 solid 2px',
              marginRight:'2rem',
              marginLeft:'2rem'
              }}>

              <h4 style={{ textAlign: "center" }}>Palabras que se repiten</h4>
              <div style={{
                columnCount:2,
                marginTop:'2rem'
                }}>
                {PalabrasRepetidas.map((e, i) =>{
                  if (i === 0 ) {
                    return <p className='resul' key={e.palabra} style={{
                      margin:0, 
                      whiteSpace:'nowrap',
                      overflow:'hidden',
                      textOverflow:'ellipsis'}}>{e.cant + ' - ' + e.palabra}</p>
                  } else if (i === 1){
                    return <p className='resul' key={e.palabra} style={{
                      fontSize:'1.4rem', 
                      margin:0, 
                      whiteSpace:'nowrap',
                      overflow:'hidden',
                      textOverflow:'ellipsis'
                    }}>{e.cant + ' - ' + e.palabra}</p>
                  } else if (i === 2){
                    return <p className='resul' key={e.palabra} style={{
                      fontSize:'1.2rem', 
                      margin:0, 
                      whiteSpace:'nowrap',
                      overflow:'hidden',
                      textOverflow:'ellipsis'
                    }}>{e.cant + ' - ' + e.palabra}</p>
                  } else if (e.cant > 1 || i <= 3){
                    return <p className='resul' key={e.palabra} style={{
                      fontSize:'1.2rem', 
                      margin:0, 
                      whiteSpace:'nowrap',
                      overflow:'hidden',
                      textOverflow:'ellipsis'}}>{e.cant + ' - ' + e.palabra}</p>
                  }
                })}
              </div>

            </div>
  
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalizarArchivo;
