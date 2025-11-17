<?php
include_once("Model.php");

class Entry extends Model {
    protected ?int $id = null;
    protected string $entry_text;
    protected ?string $created_at = null;
    protected int $user_id;

    protected static string $table = "entries";
    protected static $primaryKey = "id";

    public function __construct(array $data){
        $this->user_id = (int)$data["user_id"];
        $this->entry_text = $data["entry_text"];
        $this->created_at = $data["created_at"];
    }
    public function toArray(){
        return [
            "user_id" => $this->user_id,
            "entry_text" => $this->entry_text,
            "created_at" => $this->created_at

        ];
    }

}  
?>