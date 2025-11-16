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
        
            $startdate = date("Y-m-d 00:00:00", strtotime("-1 week")); 
            $enddate = date("Y-m-d 23:59:59");
            $aiResponses = AiResponse::findByDate($connection, $startdate, $enddate, "user_id", $userId);
                                echo ResponseService::response(200, $aiResponses);

            $aiResponsesArray = [];
            foreach ($aiResponses as $aiResponse) {
                $aiResponsesArray[] = $aiResponse->toArray(); 
            }
            return $aiResponsesArray;
        }
    }
}
?>
