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