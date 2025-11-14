<?php
include_once("Model.php");

class Habit extends Model {
    protected ?int $id = null;
    protected string $name;
    protected string $goal;
    protected int $user_id;

    protected static string $table = "habits";
    protected static $primaryKey = "id";

    public function __construct(array $data){
        $this->id = $data["id"];
        $this->name = $data["name"];
        $this->goal = $data["goal"];
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

    public function setGoal(string $goal){
        $this->goal = $goal;
    }

    public function getGoal(){
        return $this->name;
    }

    public function setUser_id(string $user_id){
        $this->user_id = $user_id;
    }

    public function getUser_id(){
        return $this->user_id;
    }

    public function __toString(){
        return $this->id . " | " . $this->name . " | " . $this->goal . " | " . $this->user_id;
    }
    
    public function toArray(){
        return [
            "id" => $this->id,
            "name" => $this->name,
            "goal" => $this->goal,
            "user_id" => $this->user_id
        ];
    }

}

?>