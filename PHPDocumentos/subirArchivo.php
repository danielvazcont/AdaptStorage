<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
$response = array();
$upload_dir = 'uploads/';
$server_url = 'http://localhost/AdaptStorage/';
include "vendor/autoload.php";
include "conectar.php";
include "docx2text.php";
$conn = conectarDB();
$conn->set_charset('utf8');


if($_FILES['documento'])
{
    $archivo_name = $_FILES["documento"]["name"];
    $archivo_tmp_name = $_FILES["documento"]["tmp_name"];
    $size = $_FILES["documento"]["size"];
    $error = $_FILES["documento"]["error"];
    $nivelSeguridad = $_POST["nS"];
    $propietario = $_POST["nombrePropietario"];

    if($error > 0){
        $response = array(
            "Código de error" => $error,
            "status" => "error",
            "error" => true,
            "message" => "Se encontraron errores en FILES"
        );
    }else
    {
        $upload_name = strtolower($archivo_name);
        $upload_name = preg_replace('/\s+/', '-', $upload_name);
        $path = $server_url.$upload_dir.$upload_name;
        $extension = pathinfo($path, PATHINFO_EXTENSION);
        $nombreArchivo = pathinfo($path, PATHINFO_FILENAME);
        $nombre_original = pathinfo(($server_url.$upload_dir.$archivo_name), PATHINFO_FILENAME);
        
     
        if(move_uploaded_file($archivo_tmp_name , $upload_dir.$upload_name)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "Archivo subido a la carpeta de localhost",
                "url" => $path
              );

            if($extension == 'txt'){

                $contenido = file_get_contents($path);  

            }else if($extension == 'pdf'){
                
                // Iniciamos la libreria
                $parser = new \Smalot\PdfParser\Parser(); 
                // Pasamos el archivo a la libreria
                $pdf = $parser->parseFile($path); 
                // Extraemos el texto
                $contenido = $pdf->getText();
                // Damos un salto de linea cada que comience un nuevo string
                //$contenido = nl2br($textContent);
                
            }else if($extension == 'docx'){
                
                $converter = new DocxToTextConversion('uploads/'.$upload_name);
                $contenido = $converter->convertToText();

            }else{

                $contenido = '';

            }

            date_default_timezone_set('America/Mexico_City');
            setlocale(LC_TIME, 'es_MX.UTF-8');
            $fecha_actual = date("Y-m-d");
            $temp = $upload_dir.$upload_name;
            $sql = "INSERT INTO archivos (titulo, tipo, tamanio, ruta, fecha, contenido, nivel_seguridad, namePropietario) values ('$nombre_original', '$extension', '$size', '$temp', '$fecha_actual', '".$conn->real_escape_string($contenido)."', '$nivelSeguridad', '$propietario' )";
            if ($conn->query($sql) === TRUE) {
                $response = array('conectado'=>"Registrado en la base de datos", 'error'=>'null');
            } else {
              $response = array('conectado'=>"Hubo un error al registrar en la base de datos", 'error'=>$conn->error);
            }
        }else
        {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error al subir el archivo a la carpeta localhost"
            );
        }
    }
 
}else{
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "Error total"
    );
}
 
echo json_encode($response);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

?>