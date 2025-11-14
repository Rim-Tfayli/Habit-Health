<?php
require_once(__DIR__ . "/../models/Entry.php");
require_once(__DIR__ . "/../connection/connection.php");
require_once(__DIR__ . "/../services/ResponseService.php");
require_once(__DIR__ . "/../services/EntryService.php");

class EntryController {

    function getHabitByUser(){
        global $connection;

        if(isset($_GET["email"])){
            $email = $_GET["email"];
            $user = UserService::findUserByEmail($connection,$email);
            if($user){
                $userId = $user["id"];
                $habits = HabitService::findHabitsByUser($connection, "user_id", $userId);
                echo ResponseService::response(400, $habits);
            }
        }
        else{
            echo ResponseService::response(400, "User Email is missing");
            return;
        }   
        return;
    }   
    public function saveHabit(){
        global $connection;
        $data = json_decode(file_get_contents("php://input"), true);
        if($data){
            $user = UserService::findUserByEmail($connection, $data["email"]);
            $result = HabitService::save($connection, [
                "user_id" => $user["id"],
                "habit_name" => $data["name"],
                "goal" => $data["goal"]
            ]);
            echo ResponseService::response(200, $result["action"]); 
        }
        echo ResponseService::response(400, "Data is missing");
        return;
    }
    public function deleteHabit(){
        global $connection;
        if(isset($_GET["id"])){
            $id = $_GET["id"];
            $deleted = HabitService::deleteEntry($connection, $id);
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