<?php
require_once(__DIR__ . "/../models/Habit.php");
require_once(__DIR__ . "/../connection/connection.php");
require_once(__DIR__ . "/../services/ResponseService.php");
require_once(__DIR__ . "/../services/HabitService.php");

class HabitController {

    function getHabitByUser(){
        global $connection;
        $data = json_decode(file_get_contents("php://input"), true);
        if(isset($data["email"])){
            $email = $data["email"];           
            $entries = HabitService::findHabitsByUser($connection, $email);
            echo ResponseService::response(400, $entries);
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
                "name" => $data["name"],
                "goal" => $data["goal"]
            ]);
            echo ResponseService::response(200, $result); 
        }
        else{
            echo ResponseService::response(400, "Data is missing");
            return;
        }
    }
    public function deleteHabit(){
        global $connection;
        if(isset($_GET["id"])){
            $id = $_GET["id"];
            $deleted = HabitService::deleteHabit($connection, $id);
            if($deleted){
                echo ResponseService::response(200, "Habit deleted");
            }else{
                echo ResponseService::response(500, "Failed to delete habit");
            }
        }
        echo ResponseService::response(400, "Habit ID is missing");
        return;            
    }
}

?>