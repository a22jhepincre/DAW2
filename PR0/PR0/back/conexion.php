<?php

function conectDB()
{
    $server = "localhost";
    $user = "a22jhepincre";
    $password = "root";
    $dbName = "PR0";

    return mysqli_connect($server, $user, $password, $dbName);
}

function closeDB($conex)
{
    mysqli_close($conex);
}

//functions for user
function addUser($name)
{
    $conex = conectDB();

    if (!$conex) {
        return json_encode(['status' => 'error', 'message' => 'No se pudo conectar.']);
    }

    $stmt = mysqli_prepare($conex, "INSERT INTO user (name) VALUES (?)");

    if ($stmt === false) {
        return json_encode(['status' => 'error', 'message' => 'Error en la preparación de la consulta.']);
    }

    mysqli_stmt_bind_param($stmt, "s", $name);

    if (mysqli_stmt_execute($stmt)) {
        $userId = mysqli_insert_id($conex);
        $response = json_encode(['status' => 'success', 'message' => 'Usuario añadido exitosamente.', 'idUser' => $userId]);
    } else {
        $response = json_encode(['status' => 'error', 'message' => 'Error al añadir el usuario: ' . mysqli_error($conex)]);
    }

    // Cierra la sentencia y la conexión
    mysqli_stmt_close($stmt);
    closeDB($conex);

    return $response;
}

function selectUser()
{
    $conex = conectDB();

    if (!$conex) {
        return json_encode(['status' => 'error', 'message' => 'No se pudo conectar.']);
    }

    $result = mysqli_query($conex, "SELECT * FROM user;");
    
    if ($result === false) {
        return json_encode(['status' => 'error', 'message' => 'Error al seleccionar usuarios: ' . mysqli_error($conex)]);
    }

    $users = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $users[] = $row;
    }

    $response = json_encode(['status' => 'success', 'users' => $users]);

    closeDB($conex);

    return $response;
}

function setPoints($id, $points)
{
    $conex = conectDB();

    if (!$conex) {
        return json_encode(['status' => 'error', 'message' => 'No se pudo conectar.']);
    }

    $stmt = mysqli_prepare($conex, "UPDATE user SET total_score = ? WHERE id = ?");

    if ($stmt === false) {
        return json_encode(['status' => 'error', 'message' => 'Error en la preparación de la consulta.']);
    }

    mysqli_stmt_bind_param($stmt, "ii", $points, $id);

    if (mysqli_stmt_execute($stmt)) {
        $response = json_encode(['status' => 'success', 'message' => 'Usuario modificado exitosamente.']);
    } else {
        $response = json_encode(['status' => 'error', 'message' => 'Error al modificar usuario: ' . mysqli_error($conex)]);
    }

    // Cierra la sentencia y la conexión
    mysqli_stmt_close($stmt);
    closeDB($conex);

    return $response;
}

//functions for questions
function getRandomQuestions(){
    $conex = conectDB();

    if (!$conex) {
        return json_encode(['status' => 'error', 'message' => 'No se pudo conectar.']);
    }

    $result = mysqli_query($conex, "SELECT * FROM questions ORDER BY RAND() LIMIT 10;");
    
    if ($result === false) {
        return json_encode(['status' => 'error', 'message' => 'Error al seleccionar usuarios: ' . mysqli_error($conex)]);
    }

    $questions = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $questions[] = $row;
    }

    $response = json_encode(['status' => 'success', 'questions' => $questions]);

    closeDB($conex);

    return $response;
    
}
?>