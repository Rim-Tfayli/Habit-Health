<?php
include ('../connection/connection.php');

$sql = "INSERT INTO user_types (name) VALUES
        ('admin'), ('user')";

$query = $connection->prepare($sql);
$query->execute();

echo "Table user_types Created!";
?>