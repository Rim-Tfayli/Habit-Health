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
function displayWeeklyChart(data){
    
}