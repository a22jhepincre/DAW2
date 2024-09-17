<?php
// Inicia la sesión si es necesario
session_start();

// Recoge el método de la petición
$requestMethod = $_SERVER['REQUEST_METHOD'];
// Recoge la ruta solicitada (por ejemplo, api.php?route=algo)
$route = isset($_GET['route']) ? $_GET['route'] : '';

function getPreguntas() {
    $preguntasFile = json_decode(file_get_contents("data.json"), true);
    
    if ($preguntasFile === null) {
        http_response_code(500);
        echo json_encode(["error" => "No se pudo leer el archivo de preguntas"]);
        exit;
    }
    $_SESSION['preguntasFile'] = $preguntasFile;

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
    
    $_SESSION['preguntasWithoutCorrect'] = $preguntas;
    // return $preguntas;
}

getPreguntas();

// Define las rutas para GET y POST
switch ($requestMethod) {
    case 'GET':
        handleGetRequest($route);
        break;

    case 'POST':
        handlePostRequest($route);
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}

// Función para manejar las peticiones GET
function handleGetRequest($route) {
    switch ($route) {
        case 'preguntas':
            // http://localhost/PR0/PR0/back/server.php?route=preguntas preguntas sin la correcta
            $preguntas = $_SESSION['preguntasFile'];
            header('Content-Type: application/json');
            echo json_encode($preguntas);
            break;
            // http://localhost/PR0/PR0/back/server.php?route=initPregunta
        case 'initPregunta':
            $_SESSION['indicePreguntasWithoutCorrect'] = 0;
            $id = $_SESSION['indicePreguntasWithoutCorrect'];
            $_SESSION['indicePreguntasWithoutCorrect'] += 1;
            $preguntas = $_SESSION['preguntasWithoutCorrect'];
            if (isset($preguntas[$id])) {
                header('Content-Type: application/json');
                echo json_encode($preguntas[$id]);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Pregunta no encontrada"]);
            }
            break;
        case 'pregunta':
            // http://localhost/PR0/PR0/back/server.php?route=pregunta&id=1 una pregunta dependiendo del indice
            // $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
            if($_SESSION['indicePreguntasWithoutCorrect'] == null){
                $_SESSION['indicePreguntasWithoutCorrect'] = 0;
            }
            $id = $_SESSION['indicePreguntasWithoutCorrect'];
            $_SESSION['indicePreguntasWithoutCorrect'] += 1;
            $preguntas = $_SESSION['preguntasWithoutCorrect'];
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
