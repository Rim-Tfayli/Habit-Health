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

    '/aiResponse'        => ['controller' => 'AiResponseController', 'method' => 'getAiResponse'],
    '/aiResponse/insert' => ['controller' => 'AiResponseController', 'method' => 'saveAiResopnse']
];
?>