<?php

echo "hola";

$servername = "servidor";
$username = "root";
$password = "root";
$dbname = "DAW";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, nom FROM persones";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo "id: " . $row["id"]. " - Name: " . $row["nom"]. "<br>";
  }
} else {
  echo "0 results";
}
$conn->close();
?>