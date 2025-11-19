window.onload = function() {
    checkUserType();
    checkAuth();
    getDailySummary();
};
async function getDailySummary(){
     try{
        const res = await axios.post(`${BASE_URL}/api/dailySummary.php`,{
            email: localStorage.getItem('email')
        });
        
        const response = res.data.data;
        if(!response){
             alert("Let's start your day by entering your habits and entries!");
            setTimeout(() => {
                    window.location="./entries.html"
            },1500);
        }

        displaySummary(response.summary);
        displayGaps(response.gaps);
        displayFeedback(response.feedback); 
    } 
    catch(error){
        console.error("Error!", error);
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
        <h1>Today's progress</h1>
        <p>Steps <i class="fa-solid fa-person-walking"></i> <span>${summary.steps | 0}</span </p>
        <p>Water <i class="fa-solid fa-whiskey-glass"></i> <span>${summary.water_liters | 0} L</span></p>
        <p>Sleep <i class="fa-solid fa-bed"></i> <span>${summary.sleep_hours | 0} hrs </span></p>
        <p>Calories <i class="fa-solid fa-utensils"></i> <span>${summary.calories | 0} kcal </span></p>
    `;
}
function displayGaps(gaps){
    const div = document.getElementById("gaps");
    div.innerHTML = `
        <h1>You still have</h1>
        <p>Steps <i class="fa-solid fa-person-walking"> <span>${gaps.steps_gap | 0}</i></span </p>
        <p>Water <i class="fa-solid fa-whiskey-glass"></i> <span>${gaps.water_gap_liters | 0} L</span></p>
        <p>Sleep <i class="fa-solid fa-bed"></i> <span>${gaps.sleep_gap_hours | 0} hrs</span></p>
        <p>Calories <i class="fa-solid fa-utensils"></i> <span>${gaps.calories_gap | 0} kcal </span></p>
    `; 
}
