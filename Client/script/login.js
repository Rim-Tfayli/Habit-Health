document.getElementById('submit-login').onclick = function(e){
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    let valid = true;

    if(!isValidEmail(email)){
        emailError.textContent = 'Invalid email format';
        valid = false;
    }
    if(password.length < 6){
        passwordError.textContent = 'Password must be at least 6 characters';
        valid = false;
    }

    if (!valid) return;

    login(email, password);
};
async function login(email, password){
    try{
        const response = await axios.post(`${BASE_URL}/user/login`, {
            email: email,
            password: password
        });
        if(response){
            localStorage.setItem('email', email);
            window.location.href="/habits.html";
            return response.data;
        }
    }
    catch(error){
        console.error(error);
        return {status: 500, data: 'connection failed'};
    }
}