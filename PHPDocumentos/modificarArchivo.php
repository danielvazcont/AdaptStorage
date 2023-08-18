<?php
    include "conectar.php";
    $conn = conectarDB();
	

  $JSONData = file_get_contents("php://input");
    $dataObject = json_decode($JSONData);       
    
  $conn->set_charset('utf8');
    
    $idArchivo = $dataObject-> Id;
    $Titulo = $dataObject-> Titulo;
    $Nivel=	$dataObject-> Nivel;

if($Titulo!=''){
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$sql="UPDATE archivos SET titulo = '$Titulo', nivel_seguridad ='$Nivel' WHERE id='$idArchivo' ";


if ($conn->query($sql) === TRUE) {
  echo json_encode(array('conectado'=>true, 'Registro' => 'Modificacion exitosa.'));
} else {
  echo json_encode(array('conectado'=>false, 'error' => 'Registro fallido vuelva a intentarlo.'));
}

}
$conn->close();
	

?>