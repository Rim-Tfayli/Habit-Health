async function getUsers(){
    try{
        const users = await axios.get(`${BASE_URL}/users`);
        if(users){
            console.log("get all users");
            displayUsers(users.data);
        }
    }
    catch(error){
        console.error(error);
        return {status: 500, data: 'connection failed'};
    }
}
function displayUsers(users){
    const usersList = document.getElementById("users-list");
    const title = document.createElement("h2");
    title.innerHTML="Users";
    users.forEach(user => {
      const current = document.createElement("div");
      current.className = "users-list";
      current.innerHTML=`
            <span>${user.username}</span>
            <div id="info-${user.id}" class="user-info-container"></div>
            <mmkn hot last entry msln>
            <a href="" class="user-info" id="${user.id}"><i class="fas fa-info-circle"></i></a>
            <a href="" class="delete-user" id="${user.id}"><i class="fa-solid fa-trash"></i></a>
      `;
      usersList.appendChild(current);
    });
    checkInfoBtn();
    checkDeleteBtn();
    checkEditBtn(usersList);
}
//fkra: when the admin clicks (user-info), it shows his email, gender and maybe last entry or aymta he joind or 

async function checkInfoBtn() {
    const infoBtns = document.querySelectorAll(".user-info");
    infoBtns.forEach(btn => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();
            const userId = btn.id;
            await getUserInfo(userId);
        });
    });
}

async function getInfos(userId){
    try{
        const response = await axios.get(`${BASE_URL}/users/info`,{ 
            params:{ id: userId }
        });
        const info = response.data;
        displayUserInfo(userId, info)
    }
    catch(error){
        console.error(error);
    }
}
function displayUserInfo(userId, info){
    const infoDiv = document.getElementById(`info-${userId}`);
    infoDiv.innerHTML = `
        <p>Email: ${data.email}</p>
        <p>Gender: ${data.gender}</p>
        <p>Date Joined: ${data.created_at}</p>
        <p>Last Entry:"to be implemented bl backend"</p>
    `;
}
function checkDeleteBtn(){
    document.querySelectorAll(".delete-user").forEach(dlt => {
        dlt.addEventListener("click", function(e){
            e.preventDefault();
            const userId = dlt.id;
            deleteUser(userId);
    });
  });
}
async function deleteUser(userId){
    try{
        const user = axios.get(`${BASE_URL}/user/delete`,{
            params: { id: userId }
        })
        if(user.status===200){
            window.location.reload();
        }
    }
    catch(error){
        console.error(error);
        return {status: 500, data: 'connection failed'};
    }
}
//pie chart that present to used habits