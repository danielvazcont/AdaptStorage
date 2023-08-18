<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");

include "conectar.php";
$array = array();
$conn = conectarDB();

$sql = 'SELECT id, usuario, nombre, idTipoUsuario, estado FROM usuarios';
$ejecutar = mysqli_query($conn,$sql);


while($fila = mysqli_fetch_assoc($ejecutar)) {
    $vector[] = array(
	  "id" => $fila['id'],
      "usuario" => $fila['usuario'],
      "nombre" => $fila['nombre'],
      "idTipoUsuario" => $fila['idTipoUsuario'],
      "estado" => $fila['estado']
       ); }
      
$conn->close();
$json = json_encode($vector);

echo $json;


?>