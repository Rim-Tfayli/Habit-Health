<?php
class AiResponseService {
    public static function save(mysqli $connection, array $data){
        $aiResponse = new AiResponse($data);
        return $aiResponse->save($connection, "id");
    }
    public static function findByEntry(mysqli $connection, int $entry_id){
        $ai_response = AiResponse::find($connection, $entry_id, "entry_id");
        $ai_response = $ai_response ? $ai_response->toArray() : [];
        return $ai_response;
        //to display it
    }
}
?>
