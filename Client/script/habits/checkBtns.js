const add_new_btn = document.getElementById("add_new");
const new_habit_name = document.getElementById("habit_name");
const new_habit_goal = document.getElementById("new_habit_goal");
add_new_btn.addEventListener("click", function(e){
        e.preventDefault();
        const new_habit = {
            email: localStorage.getItem("email"),
            name: new_habit.name,
            goal: new_habit.value
        };
        addNewHabit(new_habit);  
});

const show_habits = document.getElementById("show_habits");
show_habits.addEventListener("click", function(e){
        e.preventDefault();
        displayHabits(habits);
});


//to check delete btns f each habit
function checkDeleteBtn(){
    document.querySelectorAll(".delete-habit").forEach(dlt => {
        dlt.addEventListener("click", function(e){
        e.preventDefault();
        const habitId = dlt.id;
        deleteHabit(habitId);
    });
  });
}


function checkEditBtn(habitsList){
    document.querySelectorAll(".edit-habit").forEach(edit => {
        edit.addEventListener("click", function(e){
        e.preventDefault();
        const habitId = edit.id;
        const input = document.getElementById(habitId);
        input.removeAttribute("readonly");
        input.classList.add("input-edit");
        const submit = document.createElement("button");
        submit.innerHTML = "Save";
        submit.className = "submit";
        habitsList.appendChild(submit);
        checkSubmitBtn(submit);
    });
  });
}
//function to prepare every edited habit to be sent to the server
function checkSubmitBtn(submit){
    submit.addEventListener("click", function(e){
        e.preventDefault();
        let edited_habits = [];
        document.querySelectorAll(".input-edit").forEach(new_habit => {
            edited_habits.push({
                email: localStorage.getItem("email"),
                name: new_habit.name,
                goal: new_habit.value
            });
        })
        //console.log(edited_habits); 
        updateHabits(edited_habits);      
    });
}