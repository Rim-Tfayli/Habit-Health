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
      newHabit.className = "habit-item";
      newHabit.innerHTML=`
        <label for="">${habit.name}
        <input type="text" id="habit-goal" value="${habit.goal}" readonly>
        <a href="" class="delete-habit"><i class="fa-solid fa-trash"></i></a>
        <a href="" class="edit-habit"><i class="fa-solid fa-pen-to-square"></i></a>
      `;
      habitsList.appendChild(newHabit);
    });
    //when the user click edit, we remove readonly attribute
    //bsir fi y edit, based on the habit name
    // we send new goal, name and user email since the save method only calls edit method if the same user
    //is sending same habit name with diferent goal 
}