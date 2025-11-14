<?php
include("Model.php");

class Entry extends Model {
    protected int $id;
    protected string $entry_text;
    protected string $created_at;
    protected int $user_id;

    protected static string $table = "entries";
    protected static $primaryKey = "id";

    public function __construct(array $data){
        $this->id = $data["id"];
        $this->user_id = $data["user_id"];
        $this->entry_text = $data["entry_text"];
        $this->created_at = $data["created_at"];
    }
    public function toArray(){
        return [
            "id" => $this->id,
            "user_id" => $this->user_id,
            "entry_text" => $this->entry_text,
            "created_at" => $this->created_at
        ];
    }

}  
?>