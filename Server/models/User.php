<?php
include("Model.php");

class User extends Model {

    //I may add height and weight (hsab l waet)
    protected ?int $id = null;
    protected string $username;
    protected string $email;
    protected string $password;
    protected string $gender;
    protected int $user_type_id;

    protected static string $table = "users";

    public function __construct(array $data){
        $this->id = $data["id"];
        $this->username = $data["username"];
        $this->email = $data["email"];
        $this->password = $data["password"];
        $this->gender = $data["gender"];
        $this->user_type_id = (int)$data["user_type_id"];
    }

    public function getID(){
        return $this->id;
    }

    public function setUsername(string $username){
        $this->username = $username;
    }

    public function getUsername(){
        return $this->username;
    }

    public function setEmail(string $email){
        $this->email = $email;
    }

    public function getEmail(){
        return $this->email;
    }

    public function setGender(string $gender){
        $this->gender = $gender;
    }

    public function getGender(){
        return $this->gender;
    }

    public function setPassword(string $password){
        $this->password = password_hash($password, PASSWORD_BCRYPT);
    }

    public function getPassword(){
        return $this->password;
    }

    public function __toString(){
        return $this->id . " | " . $this->username . " | " . $this->password . " | " . $this->gender;
    }
    
    public function toArray(){
        return [
            "id" => $this->id,
            "username" => $this->username,
            "email" => $this->email,
            "password" => $this->password,
            "gender" => $this->gender
        ];
    }

}

?>