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

            //to save in user db his last entry (it is used in admin panel)
            $sql = "UPDATE users SET last_entry = ? WHERE id = ?
                    total_entries = total_entries + 1";
            $query = $connection->prepare($sql);
            $query->bind_param("si", $data["entry_text"], $data["user_id"]);
            $query->execute();

            return $newEntry;
        }
    }
?>