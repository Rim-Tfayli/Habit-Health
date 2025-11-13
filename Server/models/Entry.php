<?php
include("Model.php");

class Entry extends Model {
    protected int $id;
    protected int $habit_id;
    protected string $entry_text;
    protected string $ai_op;
    protected string $created_at;
    protected int $user_id;

    protected static string $table = "entries";

    public function __construct(array $data){
        $this->id = $data["id"];
        $this->habit_id = $data["habit_id"];
        $this->user_id = $data["user_id"];
        $this->entry_text = $data["entry_text"];
        $this->ai_op = $data["ai_op"];
        $this->created_at = $data["created_at"];
    }
    public function toArray(){
        return [
            "id" => $this->id,
            "habit_id" => $this->habit_id,
            "user_id" => $this->user_id,
            "entry_text" => $this->entry_text,
            "ai_po" => $this->ai_op,
            "created_at" => $this->created_at
        ];
    }

}  
?>