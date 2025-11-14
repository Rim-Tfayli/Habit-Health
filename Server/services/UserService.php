<?php 
    class UserService{

        public static function findUserByEmail(mysqli $connection, string $email){
            $user = User::find($connection, $email, "email");
            $user = $user ? $user->toArray() : [];
            return $user;
        }
        public static function findAllUsers(mysqli $connection){
            $users = User::findAll($connection);
            $usersArray = [];
            foreach ($users as $user) {
                $usersArray[] = $user->toArray(); 
            }
                return $usersArray;
        }     
        public static function deleteUser(mysqli $connection, string $email){
            return User::delete($connection, $email, "email");
        }
        public static function save(mysqli $connection, array $data){
            $user = new User($data);
            $newUser = $user->save($connection, "email");
            
            return $newUser;
        }   
        public static function login(mysqli $connection, string $email, string $password){
            $user = User::find($connection, $email, "email");
            if(!$user) 
                return null; 
            if(password_verify($password, $user->getPassword())){
                return $user->toArray();
            }
        }         
    }
?>