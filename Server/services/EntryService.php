<?php 
    class EntryService{

        public static function findEntryByUserEmail(mysqli $connection, string $email){
            $user = User::find($connection, $email, "email");
            if($user){
                $userId = $user->getID();
                $entries = Entry::findAll($connection, $userId, "user_id");
                return $entries;
            }
        }
        public static function deleteEtry(mysqli $connection, string $id){
            return Entry::delete($connection, $id, "id");
        }
        /*public static function save(mysqli $connection, array $data){
            $entry = new Entry($data);
            $newUser = $entry->createNew($connection, $data);
            
            return $newUser;
        }*/
    }
?>