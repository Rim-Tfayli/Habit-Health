<?php
include ('../connection/connection.php');

$sql = "INSERT INTO users (username, email, password, gender, user_type_id) 
        VALUES (charbel, charbel@gmail.com, pass123, male, 1)";

$query = $connection->prepare($sql);
$query->execute();

echo "Inserted!";
?>