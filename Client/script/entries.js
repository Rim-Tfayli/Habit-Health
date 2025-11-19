window.onload = function() {
    checkAuth();
    checkUserType();
};
const submit = document.getElementById("submit-entry");
submit.addEventListener("click", function (e) {
        e.preventDefault();
        const walk = document.getElementById('walk').value.trim();
        const water = document.getElementById('water').value.trim();
        const coffee = document.getElementById('coffee').value.trim();        
        const food = document.getElementById('food').value.trim();
        const sleep = document.getElementById('sleep').value.trim();

        const entry = document.getElementById('entry').value;
        
        //if the user didn't enter free text, than wel will the other option of adding an entry 
        let newEntry = entry;
    
        if(walk)
            newEntry += `I walked for ${walk} min.  `;
        if(water)
            newEntry += `I drank ${water} L.  `;
        if(coffee)
            newEntry += `I had ${coffee} cups of coffee.  `;
        if(food)
            newEntry += `I ate ${food}. `;
        if(sleep)
            newEntry += `I slept at ${sleep}. `;
        
        if(newEntry.trim()==='')
        {
            alert("Please add an entry :) ");
            return;
        }
        const  data = {
            email: localStorage.getItem('email'),
            userInput: newEntry
        };
        addNewEntry(data);
})
async function addNewEntry(data){
    try{
        const response = await axios.post(`${BASE_URL}/entry/insert`, data);
        if(response.status){
            await callAiResponse(data);
            window.location.href="./habits.html";

            return response.data;
        }
    }
    catch(error){
        console.error(error);
        return {status: 500, data: 'connection failed'};
    }
}
async function callAiResponse(data){
    try{
        const response = await axios.post(`${BASE_URL}/api/ai.php`, data);
    }
    catch(error){
        console.error(error);
    }
}