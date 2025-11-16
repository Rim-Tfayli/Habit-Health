<?php
include ('../connection/connection.php');

$sql = "CREATE TABLE IF NOT EXISTS ai_response(
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        steps INT,
        water INT,
        caffeine INT,
        sleep_time TIME,
        calories INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )";

$query = $connection->prepare($sql);
$query->execute();

echo "Table(s) Created!";

?>