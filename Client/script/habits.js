window.onload = function() {
  getHabits();
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
        <span>${habit.name}: ${habit.goal}</span>
        <a href="" class="delete-habit" id="${habit.id}"><i class="fa-solid fa-trash"></i></a>
      `;
      habitsList.appendChild(newHabit);
    });
   checkDeleteBtn();
}
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