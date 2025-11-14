<?php
include_once("Model.php");

class AiResponse extends Model{
    protected static string $table = "ai_response";
    protected static string $primary_key = "id";

    protected ?int $id = null;
    protected int $entry_id;
    protected int $steps;
    protected int $minutes;
    protected int $caffeine;
    protected string $sleep_time;
    protected ?string $created_at = null;
    protected int $calories;

    public function __construct(array $data = []){
        $this->entry_id = (int)$data["entry_id"];
        $this->steps = $data["steps"];
        $this->minutes = (int)$data["minutes"];
        $this->caffeine = $data["caffeine"];
        $this->sleep_time = (int)$data["sleep_time"];
        $this->calories = $data["calories"];

    }
    public function toArray(){
        return [
            "id" => $this->id,
            "entry_id" => $this->entry_id,
            "steps" => $this->steps,
            "minutes" => $this->minutes,
            "caffeine" => $this->caffeine,
            "sleep_time" => $this->sleep_time,
            "calories" => $this->calories
        ];
    }
}
?>
