<?php
	include "conectar.php";
  $conn = conectarDB();
	

  $JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);       
    
  $conn->set_charset('utf8');
    
  $nombre = $dataObject-> usuario;
	$usuario = $dataObject-> correo;
	$password =	$dataObject-> password;


	$idTipoUsuario= "1";	
	$clave = password_hash($password, PASSWORD_DEFAULT);
	
	
if($nombre!=''){
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO usuarios (usuario, clave, nombre, idTipoUsuario)
VALUES ('$usuario', '$clave', '$nombre', '$idTipoUsuario' )";
$borrador = "DELETE FROM usuarios WHERE usuario = ''";

if ($conn->query($sql) === TRUE) {
  echo json_encode(array('conectado'=>true, 'usuario' => $usuario, 'nombre' => $nombre));
} else {
  echo json_encode(array('conectado'=>false, 'error' => 'Registro fallido vuelva a intentarlo.'));
}

//query($borrador);
}
$conn->close();
	

?>