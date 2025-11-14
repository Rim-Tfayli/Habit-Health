<?php 
    class EntryService{

        public static function findEntryByUserEmail(mysqli $connection, string $email){
            $user = User::find($connection, $email, "email");
            if($user){
                $userId = $user->getID();
                $entries = Entry::findAll($connection, "user_id", $userId);
                return $entries;
            }
        }
        public static function deleteEtry(mysqli $connection, string $id){
            return Entry::delete($connection, $id, "id");
        }
        public static function save(mysqli $connection, array $data){
            $entry = new Entry($data);
            $newEntry = $entry->save($connection, "id");
            
            return $newEntry;
        }
    }
?>