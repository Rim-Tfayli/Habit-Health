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