document.getElementById('submit-login').onclick = function(e){
    e.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    let valid = true;

    if(!isValidEmail(emailInput.value.trim())){
        emailError.textContent = 'Invalid email format';
        valid = false;
    }
    if(passwordInput.value.length < 6){
        passwordError.textContent = 'Password must be at least 6 characters';
        valid = false;
    }

    if (!valid) return;

    login(email);
};
async function createNewUser(data){
    try{
        const response = await axios.get(`${BASE_URL}/user`, {
            params:{ email: email }
        });
        if(response){
            localStorage.setItem('email', emailInput.value.trim());
            return response.data;
        }
    }
    catch(error){
        console.error(error);
        return {status: 500, data: 'connection failed'};
    }
}