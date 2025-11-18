

async function displayCharts() {
    try{
        const resp = await axios.post(`${BASE_URL}/aiResponse`,{
            email: localStorage.getItem('email')
        })
        if(resp.data){
            const data = resp.data
            console.log(data.data);
            //prepareData(data.data);
        }
   }
    catch(error){
        console.error("Error", error);
    }
}
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
