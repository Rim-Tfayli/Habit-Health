<?php 
class HabitService {
    public static function findHabitsByUser(mysqli $connection, string $email) {
        $user = UserService::findUserByEmail($connection,$email);
        if($user){
            $userId = $user["id"];
        }
        $habits = Habit::findAll($connection, "user_id", $userId);
        $habitsArray = [];
        foreach ($habits as $habit) {
            $habitsArray[] = $habit->toArray(); 
        }
        return $habitsArray;
    }
    public static function deleteHabit(mysqli $connection, int $id){
            return Habit::delete($connection, $id, "id");
        }
        public static function save(mysqli $connection, array $data){
            $habit = new Habit($data);
            //test if we already have same habit name for same user, we update it
            //else, we create it
            $habits = HabitService::findHabitsByUser($connection, "user_id", $habit->getUser_id());
            foreach ($habits as $temp){
                if($temp["name"] === $data["name"]){
                    $data["id"] = $temp["id"];
                    $newHabit = $habit->update($connection, "id", $data);
                    return "updated";
                }
            }
            $newHabit = $habit->createNew($connection, $data);
            return "created";
        }
}

?>