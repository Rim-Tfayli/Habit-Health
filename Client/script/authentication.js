function checkAuth(){
    const user_email = localStorage.getItem('email');
    if(!user_email){
        redirectUser();
    }
    else{
        checkUser(user_email);
    }
}
async function checkUser(user_email){
    try{
        const response = await axios.get(`${BASE_URL}/user`, {
            params:{ email: user_email }
        });
        if(response.status !== 200){
            redirectUser();
        }
        else{
            return true;
        }            
    }
    catch(error){
        console.error("connection failed:( ")
    }
}


function redirectUser(){
    alert("You have to login first!!!!");
    window.location.href = "./login.html";
    return false;
}