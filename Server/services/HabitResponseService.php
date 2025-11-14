<?php 
class HabitService {
    public static function findHabitsByUser(mysqli $connection, string $column, string $userId) {
         $habits = Habit::findAll($connection, $column, $userId);
            $habitsArray = [];
            foreach ($habits as $habit) {
                $habitsArray[] = $habit->toArray(); 
            }
            return $habitsArray;
    }
    public static function deleteEntry(mysqli $connection, int $id){
            return Entry::delete($connection, $id, "id");
        }
        public static function save(mysqli $connection, array $data){
            $habit = new Habit($data);
            $newHabit = $habit->save($connection, "id");
            
            return $newHabit;
        }
}

?>