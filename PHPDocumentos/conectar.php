<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

require_once __DIR__ . "/config.php";

function conectarDB(){

    $conexion = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

        if($conexion){
            mysqli_set_charset($conexion, "utf8"); // sin esto, json_encode() falla con acentos/ñ y devuelve vacío
        }else{
            echo 'Ha sucedido un error inexperado en la conexion de la base de datos
';
        }

    return $conexion;
}
?>