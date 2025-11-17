<?php
include ('../connection/connection.php');

//get top habits to be used in admin panel chart
$sql = "SELECT name, COUNT(*) AS habit_count
    FROM habits
    GROUP BY name
    ORDER BY habit_count DESC
    LIMIT 5;
";
$query = $connection->prepare($sql);
$query->execute();

$data = $query->get_result();
$rows = [];
while($row = $data->fetch_assoc()){
    $rows[] = $row; 
}
echo ResponseService::response(200, $rows);

?>