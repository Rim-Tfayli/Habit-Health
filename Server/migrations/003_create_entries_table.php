<?php
include ('../connection/connection.php');

$sql = "CREATE TABLE entries(
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(100),
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )";

$query = $connection->prepare($sql);
$query->execute();

echo "Table(s) Created!";

?>