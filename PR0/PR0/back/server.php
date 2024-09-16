<?php
// Inicia la sesión si es necesario
session_start();

// Recoge el método de la petición
$requestMethod = $_SERVER['REQUEST_METHOD'];
// Recoge la ruta solicitada (por ejemplo, api.php?route=algo)
$route = isset($_GET['route']) ? $_GET['route'] : '';

// Función para leer preguntas desde un archivo JSON
// Función para leer preguntas desde un archivo JSON
function getPreguntas() {
    // Decodifica el archivo preguntas.json
    $preguntasFile = json_decode(file_get_contents("data.json"), true);
    
    // Verifica si la decodificación falló
    if ($preguntasFile === null) {
        http_response_code(500);
        echo json_encode(["error" => "No se pudo leer el archivo de preguntas"]);
        exit;
    }

    $preguntas = [];

    foreach ($preguntasFile['preguntes'] as $pregunta) {
        $questionWithoutCorrect = [];
        foreach($pregunta['respostes'] as $resposta){
            $questionWithoutCorrect [] = [
                'id' => $resposta['id'],
                'resposta' => $resposta['resposta']
            ];
        }
        $preguntas[] = [
            'id' => $pregunta['id'], 
            'pregunta' => $pregunta['pregunta'],
            'respostes' => $questionWithoutCorrect,
            'imatge' => $pregunta['imatge']
        ];
    }

    return $preguntas;
}


// Define las rutas para GET y POST
switch ($requestMethod) {
    case 'GET':
        handleGetRequest($route);
        break;

    case 'POST':
        handlePostRequest($route);
        break;

    default:
        http_response_code(405); // Método no permitido
        echo json_encode(["error" => "Método no permitido"]);
        break;
}

// Función para manejar las peticiones GET
function handleGetRequest($route) {
    switch ($route) {
        case 'preguntas':
            // http://localhost/PR0/PR0/back/server.php?route=preguntas preguntas sin la correcta
            $preguntas = getPreguntas();
            header('Content-Type: application/json');
            echo json_encode($preguntas);
            break;
        case 'pregunta':
            // http://localhost/PR0/PR0/back/server.php?route=pregunta&id=1 una pregunta dependiendo del indice
            $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
            $preguntas = getPreguntas();
            if (isset($preguntas[$id])) {
                header('Content-Type: application/json');
                echo json_encode($preguntas[$id]);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Pregunta no encontrada"]);
            }
            break;
        default:
            // Ruta no encontrada
            http_response_code(404);
            echo json_encode(["error" => "Ruta no encontrada"]);
            break;
    }
}

// Función para manejar las peticiones POST
function handlePostRequest($route) {
    switch ($route) {
        default:
            // Ruta no encontrada para POST
            http_response_code(404);
            echo json_encode(["error" => "Ruta no encontrada"]);
            break;
    }
}
