async function getUsers(){
    try{
        const resp = await axios.get(`${BASE_URL}/users`);
        if(resp){
            const users = resp.data.data;
            displayUsers(users);
        }
    }
    catch(error){
        console.error(error);
        return {status: 500, data: 'connection failed'};
    }
}
function displayUsers(users){
   // console.log(users);
    const usersList = document.getElementById("users-list-container");
    const title = document.createElement("h2");
    title.innerHTML="Users";
    usersList.appendChild(title);
    users.forEach(user => {      
        console.log(user.created_at); 
        const current = document.createElement("div");
        current.className = "users-list";
        current.innerHTML=`
            <span class="username">${user.username}</span>
            <span>${user.email}</span>
            <div id="info-${user.id}" class="user-info-container"></div>
            <div class="icons">
                <a href="" class="user-info" data-id="${user.id}" data-email="${user.email}"><i class="fa-solid fa-circle-info"></i></a>
                <a href="" class="delete-user" data-id="${user.id}"><i class="fa-solid fa-trash"></i></a>
            </div>
      `;
      usersList.appendChild(current);
    });
    checkInfoBtn();
    checkDeleteBtn();
}

async function checkInfoBtn() {
    const infoBtns = document.querySelectorAll(".user-info");
    infoBtns.forEach(btn => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();
            const userEmail = btn.dataset.email;
            const userId = btn.dataset.id
            await getUserInfo(userEmail, userId);
        });
    });
}

async function getUserInfo(userEmail, userId){
    try{
        const response = await axios.get(`${BASE_URL}/user`,{ 
            params:{ email: userEmail }
        });
        const info = response.data.data;
        displayUserInfo(userId, info)
    }
    catch(error){
        console.error(error);
    }
}
function displayUserInfo(userId, info){
    console.log(info);
    const infoDiv = document.getElementById(`info-${userId}`);
    infoDiv.innerHTML = `
        <p>Email: ${info.email}</p>
        <p>Gender: ${info.gender}</p>
        <p>Date Joined: ${info.created_at}</p>
        <p>Total Entries:${info.total_entries}</p>
        <p>Last Entry:${info.last_entry}</p>
    `;
    infoDiv.style.display = "block";
}
function checkDeleteBtn(){
    document.querySelectorAll(".delete-user").forEach(dlt => {
        dlt.addEventListener("click", function(e){
            e.preventDefault();
            const userId = dlt.dataset.id
            console.log(userId);
            deleteUser(userId);
    });
  });
}
async function deleteUser(userId){
    try{
        const deleted =  await axios.delete(`${BASE_URL}/user/delete`,{
            params: { id: userId }
        })
        if(deleted.status===200){
            window.location.reload();
        }
    }
    catch(error){
        console.error(error);
        return {status: 500, data: 'connection failed'};
    }
}
