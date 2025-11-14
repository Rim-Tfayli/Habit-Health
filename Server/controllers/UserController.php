<?php
require_once(__DIR__ . "/../models/User.php");
require_once(__DIR__ . "/../connection/connection.php");
require_once(__DIR__ . "/../services/ResponseServices.php");
require_once(__DIR__ . "/../services/UserService.php");

class UserController {

    function getUser(){
        global $connection;

        if(isset($_GET["email"])){
            $email = $_GET["email"];
        }else{
            echo ResponseService::response(400, "Email is missing");
            return;
        }
        $user = UserService::findUserByEmail($connection,$email);
        if($user){
            echo ResponseService::response(200, $user);
        }
        else{
            echo ResponseService::response(404, "User not found");
        }
        return;
    }

    function getAllUsers(){
        global $connection;
        $users = UserService::findAllUsers($connection);
        echo ResponseService::response(200, $users);
    }  

    function deleteUser(){
        global $connection;
        if(isset($_GET["email"])){
            $email = $_GET["email"];
        }else{
            echo ResponseService::response(500, "Email is missing");
            return;
        }
        UserService::deleteUser($connection, $email);
        echo ResponseService::response(200, "User Deleted");
    }

    function saveUser(){ 
        global $connection;
        $data = json_decode(file_get_contents("php://input"), true);
        if($data){
            $user = UserService::save($connection, $data);
            if($user)
                echo ResponseService::response(200, $user["action"]);
        }
        else{
            echo ResponseService::response(500, "Data is missing");
        }
    }
    
    public static function loginUser() {
        global $connection;
        $data = json_decode(file_get_contents("php://input"), true);

        if(!isset($data['email']) || !isset($data['password'])){
            echo ResponseService::response(400, "Email and Password are required");
            return;
        }

        $user = UserService::login($connection, $data['email'], $data['password']);

        if($user){
            echo ResponseService::response(200, $user);
        } else {
            echo ResponseService::response(401, "Invalid email or password");
    }
}

 
}

?>