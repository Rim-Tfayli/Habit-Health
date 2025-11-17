<?php 

$apis = [
    '/users'         => ['controller' => 'UserController', 'method' => 'getAllUsers'],
    '/user'         => ['controller' => 'UserController', 'method' => 'getUser'],
    '/user/insert' => ['controller' => 'UserController', 'method' => 'saveUser'],
    '/user/delete'  => ['controller' => 'UserController', 'method' => 'deleteUser'],
    '/user/login' => ['controller' => 'UserController', 'method' => 'loginUser'],

    '/entries'       => ['controller' => 'EntryController', 'method' => 'getEntryByUser'],
    '/entry/insert'  => ['controller' => 'EntryController', 'method' => 'saveEntry'],
    '/entry/delete'  => ['controller' => 'EntryController', 'method' => 'deleteEntry'],

    '/habits'       => ['controller' => 'HabitController', 'method' => 'getHabitByUser'],
    '/habit/insert'  => ['controller' => 'HabitController', 'method' => 'saveHabit'],
    '/habit/delete'  => ['controller' => 'HabitController', 'method' => 'deleteHabit'],
    '/habit/topHabits'  => ['controller' => 'HabitController', 'method' => 'getTopHabits'],


    '/aiResponse'        => ['controller' => 'AiResponseController', 'method' => 'getWeeklyAiResponse'],
    '/aiResponse/insert' => ['controller' => 'AiResponseController', 'method' => 'saveAiResponse']
];
?>