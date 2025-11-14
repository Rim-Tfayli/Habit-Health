<?php
require_once(__DIR__ . "/../models/Entry.php");
require_once(__DIR__ . "/../connection/connection.php");
require_once(__DIR__ . "/../services/ResponseService.php");
require_once(__DIR__ . "/../services/EntryService.php");

class EntryController {

    function getEntryByUser(){
        global $connection;
        $data = json_decode(file_get_contents("php://input"), true);
        if(isset($data["email"])){
            $email = $data["email"];           
            $entries = EntryService::findEntriesByUser($connection, $email);
            echo ResponseService::response(400, $entries);
        }
        else{
            echo ResponseService::response(400, "User Email is missing");
            return;
        }   
        return;
    }   
    public function saveEntry(){
        global $connection;
        $data = json_decode(file_get_contents("php://input"), true);

        if($data){
            $user = UserService::findUserByEmail($connection, $data["email"]);
            $result = EntryService::save($connection, [
                "user_id" => $user["id"],
                "entry_text" => $data["userInput"]
            ]);
            echo ResponseService::response(200, $result["action"]);
        }
        else{
            echo ResponseService::response(400, "Data is missing");
            return;
        }
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