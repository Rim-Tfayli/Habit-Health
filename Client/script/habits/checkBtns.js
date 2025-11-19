const add_new_btn = document.getElementById("add_new");

add_new_btn.addEventListener("click", function(e){
        e.preventDefault();
        const new_habit_name = document.getElementById("habit_name").value;
        const new_habit_goal = document.getElementById("habit_goal").value;
        const new_habit = {
            email: localStorage.getItem("email"),
            name: new_habit_name,
            goal: new_habit_goal
        };
        addNewHabit(new_habit);  
});

const show_habits = document.getElementById("show_habits");
show_habits.addEventListener("click", function(e){
        e.preventDefault();
        getHabits();
});


//to check delete btns pf each habit
function checkDeleteBtn(){
    addClickListeners(".delete-habit", function(e) {
        e.preventDefault();
        const habitId = this.dataset.id;
        deleteHabit(habitId);      
    });
};

//adding even listener to each edit btn
//so when the user click on an edit icon (btn), we can get his or her id (= dataset.id)
function checkEditBtn(habitsList){
    addClickListeners(".edit-habit", function(e) {
        e.preventDefault();
        const habitId = this.dataset.id;;
        const input = document.getElementById(habitId);
        input.removeAttribute("readonly");
        input.classList.add("input-edit");
        if(!habitsList.querySelector(".submit")){
            const submit = document.createElement("button");
            submit.innerHTML = "Save";
            submit.className = "submit";
            habitsList.appendChild(submit);
            checkSubmitBtn(submit);
        }
    });
}
//function to prepare every edited habit to be sent to the server
//since we added (input-edit) class to every edited habit, that's how we will access only the edited ones
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
        updateHabits(edited_habits); 
        getHabits();
    });
}