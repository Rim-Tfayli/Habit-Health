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
    include_once("prompts.php");

    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data['email'])){
        echo ResponseService::response(400, "email is missing");
        exit;
    }
    //getting weekly summary
    //and acting like nutrition coach to give health advice

    
    $apiKey = "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 ";

    $prompt = " $prompt3  \n\"$habitsEntriesJson\"";

    //echo  $prompt;    

    $msg = [
        'model' => 'gpt-3.5-turbo',
        'messages' => [
            [
                'role' => 'user',
                'content' => $prompt
            ]
        ]
    ];
    $cHttp=curl_init('https://api.openai.com/v1/chat/completions');
    curl_setopt($cHttp, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($cHttp, CURLOPT_POST, true);
    curl_setopt($cHttp, CURLOPT_POSTFIELDS, json_encode($msg));
    curl_setopt($cHttp, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($cHttp, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]);
    $response = curl_exec($cHttp);
    if(curl_errno($cHttp)){
        echo ResponseService::response(500, "OpenAI request failed: " . curl_error($ch));
        exit;
    }
    $responseData = json_decode($response,true);
    $result = $responseData['choices'][0]['message']['content'];
    $resultData=json_decode($result,true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(200);
        echo json_encode(["status" => "failed", "message" => "Invalid JSON response from OpenAI"]);
        return;
    }



?>