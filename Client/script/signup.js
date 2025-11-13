document.getElementById('submit-signup').onclick = function(e){
    e.preventDefault();

    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirm = document.getElementById('confirm');
    const gender = document.getElementById('gender');
    
    const usernameError = document.getElementById('usernam-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmError = document.getElementById('confirm-error');
    const genderError = document.getElementById('gender-error');

    let valid = true;

    if(username.value.trim() === ''){
        usernameError.textContent = 'Username is required';
        valid = false;
    }
    if(!isValidEmail(emailInput.value.trim())){
        emailError.textContent = 'Invalid email format';
        valid = false;
    }
    if(passwordInput.value.length < 6){
        passwordError.textContent = 'Password must be at least 6 characters';
        valid = false;
    }
    if(passwordInput.value !== confirmInput.value){
        confirmError.textContent = 'Passwords do not match';
        valid = false;
    }
    if (!genderInput.value) {
        genderError.textContent = 'Please select your gender';
        valid = false;
    }

    if (!valid) return;

    const data = {
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value,
        gender: gender.value
    };
    createNewUser(data);

    localStorage.setItem('email', emailInput.value.trim());
};
async function createNewUser(data){
    try{
        const response = await axios.post(`${BASE_URL}/user/insert`, data);
        return response.data;
    } 
    catch(error){
        console.error(error);
        return { status: 500, data: 'connection failed' };
    }
}