<?php
include('../connection/connection.php');
require_once('../services/AiResponseService.php');
require_once('../services/ResponseService.php');

    class AiResponseController{
    //to display summary for the user
    function getParsed(){
            global $connection;
            if(isset($_GET['entry_id'])){
                $entry_id = $_GET['entry_id'];            
                $parsed = AiResponseService::findByEntry($connection, $entry_id);
                echo ResponseService::response(200, "Parsed data found", $parsed);
            } else {
                echo ResponseService::response(400, "Entry ID missing");
            }
        }

    //when ai send the response, it will be saved in the db based on entry_id (post ai.php)
    function saveAiResopnse(){
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
