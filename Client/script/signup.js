document.getElementById('submit-signup').onclick = function(e){
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;
    const gender = document.getElementById('gender').value;
    
    const usernameError = document.getElementById('usernam-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmError = document.getElementById('confirm-error');
    const genderError = document.getElementById('gender-error');

    let valid = true;

    if(username === ''){
        usernameError.textContent = 'Username is required';
        valid = false;
    }
    if(!isValidEmail(email)){
        emailError.textContent = 'Invalid email format';
        valid = false;
    }
    if(password < 6){
        passwordError.textContent = 'Password must be at least 6 characters';
        valid = false;
    }
    if(password !== confirmInput.value){
        confirmError.textContent = 'Passwords do not match';
        valid = false;
    }
    if (!gender) {
        genderError.textContent = 'Please select your gender';
        valid = false;
    }

    if (!valid) return;

    const data = {
        username: username,
        email: email,
        password: password,
        gender: gender
    };
    const signup =createNewUser(data);
    if(signup)
        localStorage.setItem('email', email);
};
async function createNewUser(data){
    try{
        const response = await axios.post(`${BASE_URL}/user/insert`, data);
        window.location.href="/dashboard.html";
        return response.data;
    } 
    catch(error){
        console.error(error);
        return { status: 500, data: 'connection failed' };
    }
}