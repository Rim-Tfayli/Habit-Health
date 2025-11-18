
async function addNewHabit(new_habit){
    try{
        const added = await axios.post(`${BASE_URL}/habit/insert`,new_habit);
        if(added.status===200){
            console.log("new habit added");
            getHabits();
        }
    }
    catch(error){
        console.error(error);
        return {status: 500, data: 'connection failed'};
    }
}

async function getHabits(){
    try{
        const habits = await axios.post(`${BASE_URL}/habits`, {
            email: localStorage.getItem("email")
         })
        if(habits.status===200){
            console.log("habits are ready");
            displayHabits(habits.data.data);
        }
    }
    catch(error){
        console.error(error);
        return {status: 500, data: 'connection failed'};
    }
}

//async function to send the updates to the server
//note that what the server gets same user email and same habit name with different goal
//the habitService will call update method instead of create new
async function updateHabits(edited_habits){
    try{
        //console.log(edited_habits);
        const response = await axios.post(`${BASE_URL}/habit/insert`, edited_habits[0]);
        if(response){
            return response.data;
        }
    }
    catch(error){
        console.error(error);
        return {status: 500, data: 'connection failed'};
    }
}

async function deleteHabit(habitId){
    try{
        console.log(habitId);
        const habits = axios.delete(`${BASE_URL}/habit/delete`,{
            params: { id: habitId }
        });
        console.log("testt");
        getHabits();
    }
    catch(error){
        console.error(error);
        return {status: 500, data: 'connection failed'};
    }
}