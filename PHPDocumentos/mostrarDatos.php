<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");

include "conectar.php";
$array = array();
$conn = conectarDB();

$tipo=$_GET['tipo'];
$nivel=$_GET['nivel'];

if($_GET['orden']=="Desc"){
  $sql = "SELECT titulo, tipo, tamanio, fecha, namePropietario, nivel_seguridad, id, ruta FROM archivos WHERE nivel_seguridad <= $nivel ORDER BY $tipo DESC";
}
if($_GET['orden']=="Asc"){
  $sql = "SELECT titulo, tipo, tamanio, fecha, namePropietario, nivel_seguridad, id, ruta FROM archivos WHERE nivel_seguridad <= $nivel ORDER BY $tipo ASC";
}


$ejecutar = mysqli_query($conn,$sql);


while($fila = mysqli_fetch_assoc($ejecutar)) {
    $vector[] = array(
      "titulo" => $fila['titulo'],
      "tipo" => $fila['tipo'],
      "tamanio" => $fila['tamanio'],
      "fecha" => $fila['fecha'],
      "name" => $fila['namePropietario'],
  	  "nivel" => $fila['nivel_seguridad'],
      "id" => $fila['id'],
      "ruta" => $fila['ruta']); }
      
$conn->close();
$json = json_encode($vector);

echo $json;
?>