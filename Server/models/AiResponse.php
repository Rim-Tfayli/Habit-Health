<?php
include_once("Model.php");

class AiResponse extends Model{
    protected static string $table = "ai_response";
    protected static string $primary_key = "id";

    protected ?int $id = null;
    protected int $user_id;
    protected int $steps;
    protected int $water;
    protected int $caffeine;
    protected string $sleep_time;
    protected ?string $created_at = null;
    protected int $calories;

    public function __construct(array $data = []){
        $this->user_id = (int)$data["user_id"];
        $this->steps = $data["steps"];
        $this->water = (int)$data["water"];
        $this->caffeine = $data["caffeine"];
        $this->sleep_time = (int)$data["sleep_time"];
        $this->calories = $data["calories"];
        $this->created_at = $data["created_at"];
    }
    public function toArray(){
        return [
            "id" => $this->id,
            "user_id" => $this->user_id,
            "steps" => $this->steps,
            "water" => $this->water,
            "caffeine" => $this->caffeine,
            "sleep_time" => $this->sleep_time,
            "calories" => $this->calories,
            "created_at" => $this->created_at
        ];
    }
}
?>
