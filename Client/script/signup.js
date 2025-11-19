const btn = document.getElementById('submit-signup');
btn.addEventListener("click", async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;
    const gender = document.getElementById('gender').value;
    

    let valid = true;

    valid = ValidateForm(username, email, password, confirm, gender);

    if (!valid) return;

    const data = {
        username: username,
        email: email,
        password: password,
        gender: gender
    };
    console.log(data);
    const signup = await createNewUser(data);
    if(signup)
        localStorage.setItem('email', email);
        localStorage.setItem('user_type', 2);
});
async function createNewUser(data){
    try{
        console.log(data);

        const response = await axios.post(`${BASE_URL}/user/insert`, data);
        if(response.status===200){
            window.location.href="./habits.html";
            return response.data;
        }
    } 
    catch(error){
        console.error(error);
        return { status: 500, data: 'connection failed' };
    }
}
function isValidEmail(email){
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ); //from stack overflow
}
function ValidateForm(username, email, password, confirm, gender){
    const usernameError = document.getElementById('usernam-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmError = document.getElementById('confirm-error');
    const genderError = document.getElementById('gender-error');
    
    usernameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmError.textContent = '';
    genderError.textContent = '';

    let valid = true;
    if(username === ''){
        usernameError.textContent = 'Username is required';
        valid = false;
    }
    else if(!isValidEmail(email)){
        emailError.textContent = 'Invalid email format';
        valid = false;
    }
    else if(password.length < 6){
        passwordError.textContent = 'Password must be at least 6 characters';
        valid = false;
    }
    else if(password !== confirm){
        confirmError.textContent = 'Passwords do not match';
        valid = false;
    }
    else if(!gender){
        genderError.textContent = 'Please select your gender';
        valid = false;
    }
    return valid;
}