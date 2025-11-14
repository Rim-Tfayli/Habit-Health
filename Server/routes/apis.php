<?php 

$apis = [
    '/users'         => ['controller' => 'UserController', 'method' => 'getAllUsers'],
    '/user'         => ['controller' => 'UserController', 'method' => 'getUser'],
    '/user/insert' => ['controller' => 'UserController', 'method' => 'saveUser'],
    '/user/delete'  => ['controller' => 'UserController', 'method' => 'deleteUser'],
    '/user/login' => ['controller' => 'UserController', 'method' => 'loginUser']
];
?>