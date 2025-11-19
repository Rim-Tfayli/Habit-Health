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
    }
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
    }
}