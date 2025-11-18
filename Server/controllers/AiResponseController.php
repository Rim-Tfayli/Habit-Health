<?php
require_once(__DIR__ . "/../connection/connection.php");
require_once(__DIR__ . "/../services/ResponseService.php");
require_once(__DIR__ . "/../models/AiResponse.php");
require_once(__DIR__ . "/../services/AiResponseService.php");


class AiResponseController{
    //to display summary for the user
    function getWeeklyAiResponse(){
        global $connection;
        if(isset($_GET['email'])){
            $user_email = $_GET['email']; 
            $ai_responses = AiResponseService::findAiResponsesByUser($connection, $user_email);
            echo ResponseService::response(200, $ai_responses);
        } else {
            echo ResponseService::response(400, "User Email missing");
        }
    }

    //when ai send the response, it will be saved in the db based on entry_id (post ai.php)
    function saveAiResponse(){
        global $connection;
        $data = json_decode(file_get_contents("php://input"), true);

        if(!$data){
            echo ResponseService::response(400, "Data is missing");
            return;
        }
        $result = AiResponseService::save($connection, $data);

        if($result){
            echo ResponseService::response(200, $result["action"], $result["object"]);
        } else {
            echo ResponseService::response(500, "Failed to save parsed data");
        }
    }
}
?>
