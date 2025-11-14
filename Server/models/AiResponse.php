<?php
require_once('Model.php');

class AiResponse extends Model{
    protected static string $table = "ai_response";
    protected static string $primary_key = "id";

    protected int $id;
    protected int $entry_id;
    protected int $steps;
    protected int $minutes;
    protected int $caffeine;
    protected string $sleep_time;
    protected int $calories;

    public function __construct(array $data = []){
        foreach($data as $key => $value){
            $this->$key = $value;
        }
    }
}
?>
