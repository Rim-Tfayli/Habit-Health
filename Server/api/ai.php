<?php 
    require_once("../connection/connection.php");
    require_once("../services/ResponseService.php");
    require_once("../services/EntryService.php");
    require_once("../services/AiResponseService.php");
    include_once("prompts.php");


    //will be sent from axios..
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data['user_id']) || !isset($data['user_input'])){
        echo ResponseService::response(400, "Some info are missing");
        exit;
    }
    $entry_id = $data["entry_id"];
    $user_id = $data['user_id'];
    $user_input = $data['user_input'];

    $newEntry = EntryService::save($connection, [
        "id" => $entry_id,
        "user_id" => $user_id,
        "entry_text" => $user_input,
    ]);
    $apiKey = "";

    $prompt = "$prompt1 \"$user_input\"";
    
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
        echo ResponseService::response(500, "OpenAI request failed: " . curl_error($cHttp));
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
    $aiResponse = AiResponseService::save($connection, [
        "entry_id" => $entry_id,
        "steps" => $resultData['steps'],
        "minutes" => $resultData['minutes'],
        "caffeine" => $resultData['caffeine'],
        "sleep_time"=> $resultData['sleep_time'],
        "calories" => $resultData['calories'],
        "created_at" => date('Y-m-d H:i:s')
    ]);

    if($aiResponse){
        echo ResponseService::response(200, $aiResponse);
    }



?>