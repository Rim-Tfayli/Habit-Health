<?php
include ('../connection/connection.php');

$sql = "CREATE TABLE IF NOT EXISTS users(
          id INT(11) AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password TEXT NOT NULL,
          gender ENUM('male','female'),
          user_type_id INT DEFAULT 2,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_type_id) REFERENCES user_types(id)
        )";
          
$query = $connection->prepare($sql);
$query->execute();

echo "Table(s) Created!";

?>