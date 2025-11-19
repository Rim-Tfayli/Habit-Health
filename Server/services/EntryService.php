<?php 
    class EntryService{

        public static function findEntriesByUser(mysqli $connection, string $email){
            $user = UserService::findUserByEmail($connection,$email);
            if($user){
                $userId = $user["id"];
            }
            $entries = Entry::findAll($connection, "user_id", $userId);
            $entriesArray = [];
            foreach ($entries as $entry) {
                $entriesArray[] = $entry->toArray(); 
            }
                return $entriesArray;
        }
        public static function deleteEntry(mysqli $connection, int $id){
            return Entry::delete($connection, $id, "id");
        }
        public static function save(mysqli $connection, array $data){
            $entry = new Entry($data);
            $newEntry = $entry->save($connection, "id");
            $user_id = $data["user_id"];
            $last_entry = $data["entry_text"];
            $user = User::find($connection, $user_id, "id");
            if($user){
                $old_total_entries = $user->getTotalEntries();
                $user->setLastEntry($last_entry);
                $user->setTotalEntries($old_total_entries + 1);
                $user->save($connection, "id");
            }
            //to save in user db his last entry (it is used in admin panel)

            return $newEntry;
        }
    }
?>