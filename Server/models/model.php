<?php
abstract class Model{

    protected static string $table;
    protected static string $primary_key = "id";

    public static function find(mysqli $connection, $primary_value, string $primary_key){
        $sql = sprintf("SELECT * from %s WHERE %s = ?",
                       static::$table,
                       $primary_key);

        $query = $connection->prepare($sql);
        $type = is_int($primary_value) ? "i" : "s";
        $query->bind_param($type, $primary_value);
        $query->execute();               

        $data = $query->get_result()->fetch_assoc();

        return $data ? new static($data) : null;
    }

    public static function findAll(mysqli $connection, string $column = "", $value = null){
         if($column && $value !== null){
            //if I want to get all entries of a user
            //column is user_id
            $sql = sprintf("SELECT * FROM %s WHERE %s = ?", static::$table, $column);
            $query = $connection->prepare($sql);
            $type = is_int($value) ? "i" : "s";
            $query->bind_param($type, $value);
        }
        else{
            //if I am getting all the users
            $sql = sprintf("SELECT * FROM %s", static::$table);
            $query = $connection->prepare($sql);
        }
        $query->execute();
        $data = $query->get_result();
        $rows=[];
        while($row = $data->fetch_assoc()){
            $rows[] = $row ? new static($row) : null;
        }
        return $rows;
    }

    public static function delete(mysqli $connection, $primary_value, string $primary_key){
        $sql = sprintf("DELETE from %s WHERE %s = ?",
                        static::$table,
                        $primary_key);
        $query = $connection->prepare($sql);
        $type = is_int($primary_value) ? "i" : "s";
        $query->bind_param($type, $primary_value);
        return $query->execute();
    }


    public function save(mysqli $connection, string $primary_key) {
        $properties = get_object_vars($this);
        if(isset($properties['password'])){
            $properties['password'] = password_hash($properties['password'], PASSWORD_DEFAULT);
        }
        $exist = static::find($connection, $this->$primary_key, $primary_key);
        if($exist){
            $this->update($connection, $primary_key, $properties);
            return ['action' => 'updated', 'object' => $this];
        }
        $this->createNew($connection, $properties);
        return ['action' => 'created', 'object' => $this];
    }
    
    public function createNew(mysqli $connection, array $properties){
        unset($properties[static::$primary_key]);
        $in = str_repeat('?,', count($properties)-1) . '?';
        $strings = str_repeat('s', count($properties));
        $columns = implode(", ", array_keys($properties));
        $sql = sprintf("INSERT INTO %s (%s) VALUES (%s)",
                       static::$table,
                       $columns,
                       $in);      
        $query  = $connection->prepare($sql); //prepare
        $query->bind_param($strings, ...array_values($properties)); //bind array at once
        return  $query->execute();
    }
    public function update(mysqli $connection,  string $primary_key, array $properties){      
        $primary_value = $properties[$primary_key];
        unset($properties[$primary_key]);
        if($primary_key!=="id")
            unset($properties["id"]);
        $types = str_repeat('s', count($properties)) . (is_int($primary_value) ? 'i' : 's');
        $new = implode(' = ?, ', array_keys($properties)) . ' = ?';
        $sql = sprintf("UPDATE %s SET %s WHERE %s = ?",
                       static::$table,
                       $new,
                       $primary_key);      
        $query  = $connection->prepare($sql); //prepare
        $values = array_values($properties);
        $values[] = $primary_value;
        $query->bind_param($types, ...$values); //bind array at once
        return $query->execute();
    }

}
?>
