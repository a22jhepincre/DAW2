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

function addUser($name, $email, $password)
{
    $conex = conectDB();

    if (!$conex) {
        return json_encode(['status' => 'error', 'message' => 'No se pudo conectar.']);
    }

    $stmt = mysqli_prepare($conex, "INSERT INTO user (name, email, password) VALUES (?, ?, ?)");

    if ($stmt === false) {
        return json_encode(['status' => 'error', 'message' => 'Error en la preparación de la consulta.']);
    }

    mysqli_stmt_bind_param($stmt, "sss", $name, $email, $password);

    if (mysqli_stmt_execute($stmt)) {
        $response = json_encode(['status' => 'success', 'message' => 'Usuario añadido exitosamente.']);
    } else {
        $response = json_encode(['status' => 'error', 'message' => 'Error al añadir el usuario: ' . mysqli_error($conex)]);
    }

    mysqli_stmt_close($stmt);
    closeDB($conex);

    return $response;
}

?>
