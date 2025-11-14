<?php
header('Content-Type: application/json');

    require_once("../connection/connection.php");
    require_once("../services/ResponseService.php");
    require_once("../services/EntryService.php");
    require_once("../services/AiResponeService.php");
    require_once("../services/HabitService.php");
    require_once("../services/UserService.php");
    require_once("../services/HabitService.php");
    require_once(__DIR__ . "/../models/Entry.php");
    require_once(__DIR__ . "/../models/User.php");
    require_once(__DIR__ . "/../models/Habit.php");
    include_once("prompts.php");

   $response = '{
  "summary": {
    "steps": "10500",
    "water": "2.5 liters",
    "caffeine": "7 cups",
    "sleep_time": "7 hours average"
  },
  "message": [
    "Amazing job staying active and keeping track! Every step and healthy choice counts—keep going, you’ve got this!"
  ],
  "advices": {
    "advice1": "You should drink more water to stay fully hydrated.",
    "advice2": "You should balance caffeine intake to avoid sleep disruption.",
    "advice3": "You should aim for consistent sleep close to 7-8 hours.",
    "advice4": "You should include more protein in your meals for sustained energy.",
    "advice5": "You should keep up with daily physical activity and vary your workouts."
  }
}';

$resultData = json_decode($response, true);
echo ResponseService::response(200, $resultData);

?>