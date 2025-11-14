<?php 
    require_once("../connection/connection.php");
    require_once("../services/ResponseService.php");
    require_once("../services/EntryService.php");
    require_once("../services/AiResponseService.php");

    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data['email'])){
        echo ResponseService::response(400, "email is missing");
        exit;
    }
    