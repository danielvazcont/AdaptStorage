<?php
	include "conectar.php";
  $conn = conectarDB();
	

  $JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);       
    
  $conn->set_charset('utf8');
    
  $ideliminar = $dataObject-> Id;

if($ideliminar!=''){
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$sql="DELETE FROM archivos WHERE id = $ideliminar";


if ($conn->query($sql) === TRUE) {
  echo json_encode(array('conectado'=>true, 'Registro' => 'Eliminado.'));
} else {
  echo json_encode(array('conectado'=>false, 'error' => 'Eliminación fallida.'));
}

}
$conn->close();
	

?>