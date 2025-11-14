<?php
require_once(__DIR__ . "/../models/User.php");
require_once(__DIR__ . "/../connection/connection.php");
require_once(__DIR__ . "/../services/ResponseServices.php");
require_once(__DIR__ . "/../services/EntryService.php");

class UserController {

    function getEntryByUser(){
        global $connection;

        if(isset($_GET["email"])){
            $email = $_GET["email"];
        }else{
            echo ResponseService::response(400, "User Email is missing");
            return;
        }
        $email = $_GET['email'];
        echo EntryService::findEntryByUserEmail($connection, $email);

        return;
    }   
    public function saveEntry(){
        global $connection;
        $data = json_decode(file_get_contents("php://input"), true);

        if($data){
            $result = EntryService::save($connection, $data);
            echo ResponseService::response(200, $result["action"]);
        }
        echo ResponseService::response(400, "Data is missing");
        return;
    }
    public function deleteEntry(){
        global $connection;
        if(isset($_GET["id"])){
            $id = $_GET["id"];
            $deleted = EntryService::deleteEntry($connection, $id);
            if($deleted){
                echo ResponseService::response(200, "Entry deleted");
            }else{
                echo ResponseService::response(500, "Failed to delete entry");
            }
        }
        echo ResponseService::response(400, "Entry ID is missing");
        return;            
    }
}

?>