
async function addNewHabit(new_habit){
    try{
        const added = await axios.get(`${BASE_URL}/habit/inser`,new_habit);
        if(added){
            console.log("new habit added");
        }
    }
    catch(error){
        console.error(error);
        return {status: 500, data: 'connection failed'};
    }
}

async function getHabits(){
    try{
        const habits = axios.get(`${BASE_URL}/habits`,{
            params: { email: localStorage.getItem('email') }
         })
        if(habits){
            console.log("habits are ready");
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