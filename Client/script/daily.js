/*window.onload = function() {
  getHabits();
};
async function getHabits(){
     try{
        console.log(schema);
        const res = await axios.post(`${BASE_URL}/api/weeklySummary.php`);
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
}*/
const response = {
    "summary":{
        "steps":9000,
        "water":522,
        "sleep": 13,
        "calories": 2000
    },
    "gaps":{
        "steps":9000,
        "water":522,
        "sleep": 13,
        "calories": 2000
    },
    "feedback":[
        "you are so cute mon amour"
    ]   
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
    //mmkn zid icons
    div.innerHTML = `
        <h1>Today's Progress:</h1>
        <p>Steps: <span>${summary.steps}</span </p>
        <p>Water: <span>${summary.water} L</span></p>
        <p>Sleep: <span>${summary.sleep} hrs </span></p>
        <p>Calories: <span>${summary.steps} kcal </span></p>
    `;
}
function displayGaps(gaps){
    const div = document.getElementById("gaps");
    div.innerHTML = `
        <h1>You still have:</h1>
        <p>Steps: <span>${gaps.steps}</span </p>
        <p>Water: <span>${gaps.water}L</span></p>
        <p>Sleep: <span>${gaps.sleep} hrs</span></p>
        <p>Calories: <span>${gaps.steps} </span></p>
    `; 
}
