<?php
include ('../connection/connection.php');

$password = password_hash("pass123", PASSWORD_BCRYPT);
$username = "charbel";
$email = "charbel@gmail.com";
$gender = "male";
$user_type_id = 1;

$sql = "INSERT INTO users (username, email, password, gender, user_type_id) 
        VALUES (?, ?, ?, ?, ?)";

$query = $connection->prepare($sql);
$query->bind_param("ssssi", $username, $email, $password, $gender, $user_type_id);



$query->execute();

echo "Inserted!";
?>