/*sync function displayCharts() {
    try{
        const data = await axios.post(`${BASE_URL}/aiResponse`,{
            email: localStorage.getItem('email')
        })
        if(data){
            prepareData(data);
        }
   }
    catch(error){
        console.error("Error", error);
    }
    
}*/
const resp = {
    "status": 200,
    "data": [
        {
            "id": null,
            "user_id": 1,
            "steps": 10500,
            "water": 3,
            "caffeine": 2,
            "sleep_time": 10,
            "calories": 2200,
            "created_at": "2025-11-14 15:00:00"
        },
        {
            "id": null,
            "user_id": 1,
            "steps": 554,
            "water": 3,
            "caffeine": 5,
            "sleep_time": 5,
            "calories": 1000,
            "created_at": "2025-11-15 15:00:23"
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
    let created_at = [];
    data.forEach(val => { 
        water.push(val.water); 
        steps.push(val.steps); 
        caffeine.push(val.caffeine); 
        sleep_time.push(val.sleep_time); 
        calories.push(val.calories); 
        created_at.push(val.created_at)
    });
    console.log(water);
    drawCharts(water, steps, caffeine, sleep_time, calories,created_at); 
}
function drawCharts(water, steps, caffeine, sleep_time, calories, created_at){
    eachChart("water", water, created_at, "aqua");
    eachChart("steps", steps, created_at, "blue");
    eachChart("caffeine", caffeine, created_at, "red");
    eachChart("sleep", sleep_time, created_at, "purple");
    eachChart("calories", calories, created_at, "orange"); 
}
function eachChart(canvasId, data, created_at, color){
  const ctx = document.getElementById(canvasId);
  console.log(data);
  new Chart(ctx, {
  type: "line",
  data: {
    labels: created_at,
    datasets: [{ 
      data: data ,
      borderColor: color,
      pointRadius: 7,
      tension: 4000,
    }]
  },
  options: {
    plugins: {
      legend: { display: false },
      title: {
          display: true,
          text: canvasId + " variation",
          font: { size: 16 }
      }
    }
  }
});
}