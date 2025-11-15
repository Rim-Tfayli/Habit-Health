window.onload = function() {
  getHabits();
};
async function getHabits(){
     try{
        console.log(schema);
        const res = await axios.post(`${BASE_URL}/api/weeklySummary.php`,{
            'email': localStorage.getItem('email')
        })
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
        messeage(response.message);
        advices(response.advices);
    } 
    catch(error){
        console.error("Error!", error);
        return {status: 500, data: 'connection failed'};
    }
}
function message(msg){
    const message = document.getElementById("message");
    message.innerHTML(msg);
}
function advices(adv){
    const advices = document.getElementById("advices");
    let advs = `<h1>For a better lifestyle: <i class="fa-solid fa-heart-circle-plus"></i></h1><ul>`;
    adv.forEach(advice => {
        advs += `<li> ${advice}'</li>`;        
    });
    advs +=`</ul>`;
    advices.innerHTML = advs;
}
const btn = document.getElementById("showCharts");
dlt.addEventListener("click", function(e){
    e.preventDefault();
    displayCharts();
});