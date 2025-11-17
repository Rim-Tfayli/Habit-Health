getTopHabits();
async function getTopHabits(){
    try{
        const topHabits = await axios.get(`${BASE_URL}/habit/topHabits`);
        prepareData(topHabits.data.data);
        //console.log(topHabits.data);
    }
    catch(error){
        console.error(error);
        return {status: 500, data: 'connection failed'};
    }
}
function prepareData(topHabits){
    let names = []; 
    let count = [];
    topHabits.forEach(val => { 
        names.push(val.name); 
        count.push(val.habit_count); 
    });
    console.log(names);
    createPieChart(names, count);
}
function createPieChart(names, count){
    const xValues = names;
    const yValues = count;
    const barColors = [
        "#b91d47",
        "#00aba9",
        "#2b5797",
        "#e8c3b9",
        "#1e7145"
    ];

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: barColors,
            data: yValues
            }]
        },
        options: {
            plugins: {
            legend: {display:true},
            title: {
                display: true,
                text: "Top 5 Habits",
                font: {size:16}
            }
            }
        }
        });
}