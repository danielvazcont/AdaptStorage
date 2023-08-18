<?php
	include "conectar.php";
  $conn = conectarDB();
	

  $JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);       
    
  $conn->set_charset('utf8');
    
  $idUsuario = $dataObject-> IdUsuario;
	$Nombre = $dataObject-> Nombre;
	$Correo=	$dataObject-> Correo;
  $Nivel=	$dataObject-> Nivel;
  $Estado= $dataObject-> Estado;

if($Nombre!=''){
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$sql="UPDATE usuarios SET usuario	= '$Correo', nombre = '$Nombre', idTipoUsuario	='$Nivel', estado='$Estado' WHERE id='$idUsuario' ";


if ($conn->query($sql) === TRUE) {
  echo json_encode(array('conectado'=>true, 'Registro' => 'Modificacion exitosa.'));
} else {
  echo json_encode(array('conectado'=>false, 'error' => 'Registro fallido vuelva a intentarlo.'));
}

}
$conn->close();
	

?>