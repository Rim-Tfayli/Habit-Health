<?php
require_once('ParsedData.php');

class AiResponseService {
    public static function save(mysqli $connection, array $data){
        $aiResponse = new AiResponse($data);
        return $aiResponse->save($connection, "id");
    }
    public static function findByEntry(mysqli $connection, int $entry_id){
        return AiResponse::find($connection, "entry_id", $entry_id);
        //to display it
    }
}
?>