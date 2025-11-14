<?php 
    require_once("../connection/connection.php");
    require_once("../services/ResponseService.php");
    require_once("../services/EntryService.php");
    require_once("../services/AiResponeService.php");
    require_once("../services/HabitService.php");
    require_once("../services/UserService.php");
    require_once("../services/HabitService.php");
    require_once(__DIR__ . "/../models/Entry.php");
    require_once(__DIR__ . "/../models/User.php");
    require_once(__DIR__ . "/../models/Habit.php");

    //$data = json_decode(file_get_contents("php://input"), true);
    if (!isset($_GET['email'])){
        echo ResponseService::response(400, "email is missing");
        exit;
    }
    //getting today's entries to get summary
    //and comparing them with habits to get feedbacks

    $start = date("Y-m-d 00:00:00");
    $end = date("Y-m-d 23:59:59");
    $entries = Entry::findByDate($connection, $start, $end);
    $habits = HabitService::findHabitsByUser($connection, $_GET['email']);

   echo ResponseService::response(400, $entries);    
   echo ResponseService::response(400, $habits);