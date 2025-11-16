/*window.onload = function() {
  getHabits();
};*/
const habits = [
  {
    "id": 1,
    "name": "Water Intake",
    "goal": "3 liters per day",
    "user_id": 5
  },
  {
    "id": 2,
    "name": "Steps",
    "goal": "8000 steps",
    "user_id": 5
  },
  {
    "id": 3,
    "name": "Sleep",
    "goal": "7 hours",
    "user_id": 5
  },
  {
    "id": 4,
    "name": "Calories",
    "goal": "1800 kcal",
    "user_id": 5
  },
  {
    "id": 5,
    "name": "Caffeine",
    "goal": "2 cups max",
    "user_id": 5
  }
]

function displayHabits(habits){
    const habitsList = document.getElementById("habits-list");
    const title = document.createElement("h2");
    title.innerHTML="Your Habit List";
    habits.forEach(habit => {
      const newHabit = document.createElement("div");
      newHabit.className = "habit-list";
      newHabit.innerHTML=`
            <span>${habit.name}</span>
            <input type="text" id="${habit.id}" name="${habit.name}" value="${habit.goal}" readonly>
            <a href="" class="delete-habit" id="${habit.id}"><i class="fa-solid fa-trash"></i></a>
            <a href="" class="edit-habit" id="${habit.id}"><i class="fa-solid fa-pen-to-square"></i></a>
      `;
      habitsList.appendChild(newHabit);
    });
   checkDeleteBtn();
   checkEditBtn(habitsList);
}