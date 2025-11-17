/*window.onload = function() {
    checkAuthorization();
};
function checkAuthorization(){
    const user_type = localStorage.getItem('user_type');
    if(!user_type || user_type===2){
        redirectToHome();
    }
    else{
        getUsers();
    }
}
function redirectToHome(){
    alert("You are not an admin");
    window.location.href = "./daily.html";
    return false;
}*/
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
            <mmkn hot last entry msln>
            <a href="" class="user-info" id="${user.id}"><i class="fas fa-info-circle"></i></a>
            <a href="" class="delete-user" id="${user.id}"><i class="fa-solid fa-trash"></i></a>
            <a href="" class="edit-user" id="${user.id}"><i class="fa-solid fa-pen-to-square"></i></a>
      `;
      usersList.appendChild(current);
    });
    checkInfoBtn();
    checkDeleteBtn();
    checkEditBtn(usersList);
}