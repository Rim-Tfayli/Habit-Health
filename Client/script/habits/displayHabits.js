function displayHabits(habits){      
    const habitsList = document.getElementById("habits-list");
    habitsList.innerHTML = "";
    if(habits.length === 0){
      habitsList.innerHTML = "No habits to show";
      return;
    }
    const title = document.createElement("h2");
    title.innerHTML="Your Habit List";
    habitsList.appendChild(title);
    habits.forEach(habit => {
      const newHabit = document.createElement("div");
      newHabit.className = "habit-list";
      newHabit.innerHTML=`
            <span>${habit.name}</span>
            <input type="text" id="${habit.id}" name="${habit.name}" value="${habit.goal}" readonly>
            <a href="" class="delete-habit" data-id="${habit.id}"><i class="fa-solid fa-trash"></i></a>
            <a href="" class="edit-habit" data-id="${habit.id}"><i class="fa-solid fa-pen-to-square"></i></a>
      `;
      habitsList.appendChild(newHabit);
    });
   checkDeleteBtn();
   checkEditBtn(habitsList);
}
//display the user habits as a list
//each habit div contain 2 icons, one for deleting a habit and the other for editing it
//when the user clicks on the edit icon, the div of the habit turns into an input (before clicking it was readonly input)
