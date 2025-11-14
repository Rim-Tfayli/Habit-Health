<?php 
    class EntryService{

        public static function findEntriesByUser(mysqli $connection, string $column, string $userId){
            $entries = Entry::findAll($connection, $column, $userId);
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
            
            return $newEntry;
        }
    }
?>