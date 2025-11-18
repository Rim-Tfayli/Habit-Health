window.onload = function() {
    checkAuth();
    getWeeklySummary();
};
async function getWeeklySummary(){
     try{
        const res = await axios.post(`${BASE_URL}/api/test.php`,{
            'email': localStorage.getItem('email')
        })
        const response = res.data.data;
        console.log(response);
        message(response.message);
        advices(response.advices);
    } 
    catch(error){
        console.error("Error!", error);
        return {status: 500, data: 'connection failed'};
    }
}
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
btn.addEventListener("click", function(e){
    e.preventDefault();
    displayCharts();
});