<?php
require_once(__DIR__ . "/../connection/connection.php");
require_once(__DIR__ . "/../services/ResponseService.php");
require_once(__DIR__ . "/../models/AiResponse.php");
require_once(__DIR__ . "/../services/AiResponeService.php");


class AiResponseController{
    //to display summary for the user
    function getAiResponse(){
        global $connection;
        if(isset($_GET['entry_id'])){
            $entry_id = $_GET['entry_id'];            
            $ai_response = AiResponseService::findByEntry($connection, $entry_id);
            echo ResponseService::response(200, $ai_response);
        } else {
            echo ResponseService::response(400, "Entry ID missing");
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
