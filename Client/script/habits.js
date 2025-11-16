window.onload = function() {
  getHabits(habits);
};
async function getHabits(){
    try{
        const habits = axios.get(`${BASE_URL}/habits`,{
            params: { email: localStorage.getItem('email') }
         })
         if(habits){
            displayHabits(habits);
         }
    }
    catch(error){
        console.error(error);
        return {status: 500, data: 'connection failed'};
    }
}
function displayHabits(habits){
    const habitsList = document.getElementById("habits-list");
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
async function deleteHabit(habitId){
    try{
        const habits = axios.get(`${BASE_URL}/habit/delete`,{
            params: { id: habitId }
        })
        if(habits){
            window.location.reload();
        }
    }
    catch(error){
        console.error(error);
        return {status: 500, data: 'connection failed'};
    }
}

function checkEditBtn(habitsList){
    document.querySelectorAll(".edit-habit").forEach(edit => {
        edit.addEventListener("click", function(e){
        e.preventDefault();
        const habitId = edit.id;
        const input = document.getElementById(habitId);
        input.removeAttribute("readonly");
        input.classList.add("input-edit");
        const add = document.getElementById("add");
        add.classList.add("remove-add");
        const submit = document.createElement("a");
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
//async function to send the updates to the server
//note that what the server gets same user email and same habit name with different goal
//the habitService will call update method instead of create new
async function updateHabits(edited_habits){
    try{
        const response = await axios.post(`${BASE_URL}/habit/insert`, edited_habits);
        if(response){
            window.location.href="/habits.html";
            return response.data;
        }
    }
    catch(error){
        console.error(error);
        return {status: 500, data: 'connection failed'};
    }

}