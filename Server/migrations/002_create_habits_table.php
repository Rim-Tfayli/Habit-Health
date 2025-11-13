<?php
include ('../connection/connection.php');

$sql = "CREATE TABLE IF NOT EXISTS habits(
          id INT(11) AUTO_INCREMENT PRIMARY KEY,
          user_email VARCHAR(255) NOT NULL,
          name VARCHAR(255) NOT NULL,
          goal VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE
          )";

$query = $connection->prepare($sql);
$query->execute();

echo "Table(s) Created!";

?>