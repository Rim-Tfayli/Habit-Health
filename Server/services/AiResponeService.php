<?php
class AiResponseService {
    public static function save(mysqli $connection, array $data){
        $aiResponse = new AiResponse($data);
        return $aiResponse->save($connection, "id");
    }
    public static function findAiResponsesByUser(mysqli $connection, string $email){
        $user = UserService::findUserByEmail($connection,$email);
        if($user){
            $userId = $user["id"];
        }
        $aiResponses = AiResponse::findAll($connection, "user_id", $userId);
        $aiResponsesArray = [];
        foreach ($aiResponses as $aiResponse) {
            $aiResponsesArray[] = $aiResponse->toArray(); 
        }
            return $aiResponsesArray;
    }
}
?>
