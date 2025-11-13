<?php
include ('../connection/connection.php');

$sql = "CREATE TABLE user_types(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) UNIQUE   
)";

$query = $connection->prepare($sql);
$query->execute();

echo "Table(s) Created!";

?>