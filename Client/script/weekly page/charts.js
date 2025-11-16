async function displayCharts() {
    try{
        const data = await axios.post(`${BASE_URL}/aiResponse`,{
            email: localStorage.getItem('email')
        })
        if(data){
            displayWeeklyChart(data);
        }
   }
    catch(error){
        console.error("Error", error);
    }
    
}
const resp = {
    "status": 200,
    "data": [
        {
            "id": null,
            "user_id": 1,
            "steps": 10500,
            "water": 3,
            "caffeine": 2,
            "sleep_time": "0",
            "calories": 2200
        },
        {
            "id": null,
            "user_id": 1,
            "steps": 554,
            "water": 3,
            "caffeine": 5,
            "sleep_time": "0",
            "calories": 1000
        }
    ]
};
prepareData(resp.data); 
function prepareData(data){ 
    let water = []; 
    let steps = []; 
    let caffeine = [];
    let sleep_time = []; 
    let calories = []; 
    data.forEach(val => { 
        water.push(val.water); 
        steps.push(val.steps); 
        caffeine.push(val.caffeine); 
        sleep_time.push(val.sleep_time); 
        calories.push(val.calories); 
    });
    console.log(water);
    drawCharts(water, steps, caffeine, sleep_time, calories); 
}
function drawCharts(water, steps, caffeine, sleep_time, calories){

}