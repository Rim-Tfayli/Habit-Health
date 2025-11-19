function displayUsers(users){
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

//we go through each user's info btn so when the admin clicks on the info incon of a ceertain user
//we only send to the api that user's email
async function checkInfoBtn() {
    addClickListeners(".user-info", async function(e) {
        e.preventDefault();
        const userEmail = this.dataset.email;
        const userId = this.dataset.id
        await getUserInfo(userEmail, userId);
    });
};

function checkDeleteBtn(){
    addClickListeners(".delete-user", function(e){
        e.preventDefault();
        const userId = this.dataset.id
        deleteUser(userId);
    });
};

function displayUserInfo(userId, info){
    document.querySelectorAll(".user-info-container").forEach(div => {
        div.innerHTML = "";
        div.style.display = "none";
    });
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