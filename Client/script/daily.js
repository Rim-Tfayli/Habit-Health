window.onload = function() {
    checkAuth();
    getHabits();
};
async function getHabits(){
     try{
        console.log(schema);
        const res = await axios.post(`${BASE_URL}/api/dailySummary.php`,{
            email: localStorage.getItem('email')
        });
        
        let response = res.data;
        if(!Array.isArray(response)){ 
            if(isJSON(response)){
                response = JSON.parse(response); 
            }
            else{
                console.error("Response is not valid JSON");
                return;
            }
        }
        displaySummary(response.summary);
        displayGaps(response.gaps);
        displayFeedback(response.feedback);        
    } 
    catch(error){
        console.error("Error!", error);
        return {status: 500, data: 'connection failed'};
    }
}
displaySummary(response.summary);
displayGaps(response.gaps);
displayFeedback(response.feedback);    

function displayFeedback(feedback){
    const div = document.getElementById("feedback");
    div.innerHTML = feedback;
}
function displaySummary(summary){
    const div = document.getElementById("summary");
    div.innerHTML = `
        <h1>Today's Process<i class="fa-solid fa-circle-check"></i></h1>
        <p>Steps <i class="fa-solid fa-person-walking"></i> <span>${summary.steps}</span </p>
        <p>Water <i class="fa-solid fa-whiskey-glass"></i> <span>${summary.water} L</span></p>
        <p>Sleep <i class="fa-solid fa-bed"></i> <span>${summary.sleep} hrs </span></p>
        <p>Calories <i class="fa-solid fa-utensils"></i> <span>${summary.calories} kcal </span></p>
    `;
}
function displayGaps(gaps){
    const div = document.getElementById("gaps");
    div.innerHTML = `
        <h1>You still have<i class="fa-solid fa-hourglass"></i></h1>
        <p>Steps <i class="fa-solid fa-person-walking"> <span>${gaps.steps}</i></span </p>
        <p>Water <i class="fa-solid fa-whiskey-glass"></i> <span>${gaps.water} L</span></p>
        <p>Sleep <i class="fa-solid fa-bed"></i> <span>${gaps.sleep} hrs</span></p>
        <p>Calories <i class="fa-solid fa-utensils"></i> <span>${gaps.calories} kcal </span></p>
    `; 
}
