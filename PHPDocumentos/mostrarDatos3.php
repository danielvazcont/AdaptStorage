<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");

include "conectar.php";
$array = array();
$conn = conectarDB();

$id=$_GET['id'];

$sql = "SELECT id, contenido FROM archivos WHERE id= '$id' ";
$ejecutar = mysqli_query($conn,$sql);


while($fila = mysqli_fetch_assoc($ejecutar)) {
    $vector[] = array(
        "id" => $fila['id'],
	  "contenido" => $fila['contenido']
       ); }
      
$conn->close();
$json = json_encode($vector);

echo $json;


?>