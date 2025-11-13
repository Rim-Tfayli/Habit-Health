<?php
include ('../connection/connection.php');

$sql = "CREATE TABLE entries(
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_email VARCHAR(100),
        text TEXT NOT NULL,
        parsed_json JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE
        )";

$query = $connection->prepare($sql);
$query->execute();

echo "Table(s) Created!";

?>