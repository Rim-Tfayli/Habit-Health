<?php
include_once("Model.php");

class Habit extends Model {
    protected int $id;
    protected string $name;
    protected string $category;
    protected int $user_id;

    protected static string $table = "entries";
    protected static $primaryKey = "id";

    public function __construct(array $data){
        $this->id = $data["id"];
        $this->name = $data["name"];
        $this->category = $data["category"];
        $this->user_id = (int)$data["user_id"];
    }

    public function getID(){
        return $this->id;
    }

    public function setName(string $name){
        $this->name = $name;
    }

    public function getName(){
        return $this->name;
    }

    public function setCategory(string $category){
        $this->category = $category;
    }

    public function getCategory(){
        return $this->name;
    }

    public function setUser_id(string $user_id){
        $this->user_id = $user_id;
    }

    public function getUser_id(){
        return $this->user_id;
    }

    public function __toString(){
        return $this->id . " | " . $this->name . " | " . $this->category . " | " . $this->user_id;
    }
    
    public function toArray(){
        return [
            "id" => $this->id,
            "name" => $this->name,
            "category" => $this->category,
            "user_id" => $this->user_id
        ];
    }

}

?>