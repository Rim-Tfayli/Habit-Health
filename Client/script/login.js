const btn = document.getElementById('submit-login');
btn.addEventListener("click", function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    emailError.textContent = '';
    passwordError.textContent = '';

    let valid = true;

    if(!isValidEmail(email)){
        emailError.textContent = 'Invalid email format';
        valid = false;
    }
    else if(password.length < 6){
        passwordError.textContent = 'Password must be at least 6 characters';
        valid = false;
    }

    if (!valid) return;

    login(email, password);
});
async function login(email, password){
    try{
        const response = await axios.post(`${BASE_URL}/user/login`, {
            email: email,
            password: password
        });
        if(response.data.status===200){
            const user = response.data.data;
            localStorage.setItem('email', email);
            localStorage.setItem('user_type', user.user_type_id);
            window.location.href="./habits.html";
            return response.data;
        }
        else{
            alert("invalid Username Or Password");
        }
    }
    catch(error){
        console.error(error);
        return {status: 500, data: 'connection failed'};
    }
}
function isValidEmail(email){
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ); //from stack overflow
}