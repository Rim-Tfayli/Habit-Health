window.onload = function() {
  getWeeklySummary();
  
};
async function getWeeklySummary(){
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
/*
adv = {        
    "summary": {
        "steps": "10500",
        "water": "2.5",
        "caffeine": "70",
        "sleep_time": "4"
    },
    "message": [
        "Ahsante ya bannut keep going you can do it"
    ],
    "advices": {
        "adv1": "You should drink more water.",
        "adv2": "You should balance caffeine intake.",
        "adv3": "You should sleep more",
        "adv4": "You should include more protein in your meals.",
        "adv5": "You shouldmove more."
    }
}
message(adv.message);
advices(adv.advices);*/
function message(msg){
    const message = document.getElementById("message");
    message.innerHTML=msg;
}
function advices(adv){
    const advices = document.getElementById("advices");
    let advs = `<h1>Advices to improve your Lifestyle <i class="fa-solid fa-heart-circle-plus"></i></h1><ul>`;    
    Object.values(adv).forEach(advice => {
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