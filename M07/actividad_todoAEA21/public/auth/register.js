
//declarar variables
let togglePassword;
let passwordInput;
let togglePasswordRepeat;
let passwordRepeatInput;
let validatorPassword;
let validatorPasswordRepeat;
let validatorEmail;
let validatorUsername;
let btnSubmit;
let emailInput;
let usernameInput;
let userCheck;
let emailCheck;
let passwordCheck;

//funcion init donde busca en el documento las variables
function init(){
    togglePassword = document.querySelector("#toggle-password");
    passwordInput = document.querySelector("#password");
    togglePasswordRepeat = document.querySelector("#toggle-password-repeat");
    passwordRepeatInput = document.querySelector("#password-repeat");
    validatorPassword = document.querySelector('#validator-password');
    validatorPasswordRepeat = document.querySelector('#validator-password-repeat');
    validatorEmail = document.querySelector('#validator-email');
    validatorUsername = document.querySelector('#validator-username');
    btnSubmit = document.querySelector('#btn-submit');
    emailInput = document.querySelector('#email');
    usernameInput = document.querySelector('#username');
    userCheck = false;
    emailCheck = false;
    passwordCheck = false;
}


//funciones
let tooglePasswordVisibility = function (){
    togglePassword.addEventListener("click", function () {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);

        this.classList.toggle("bi-eye");
        this.classList.toggle("bi-eye-slash");
    });

    togglePasswordRepeat.addEventListener("click", function () {
        const type = passwordRepeatInput.getAttribute("type") === "password" ? "text" : "password";
        passwordRepeatInput.setAttribute("type", type);

        this.classList.toggle("bi-eye");
        this.classList.toggle("bi-eye-slash");
    });
}

let validator = function (){
    let password = false;
    let passwordRepeat = false;
    passwordInput.addEventListener('keyup', function (){
        // console.log(this.value);
        if(this.value !== ""){
            if((this.value !== passwordRepeatInput.value) && passwordRepeatInput.value !== ""){
                validatorPassword.textContent = "Las contraseñas no coinciden";
                validatorPasswordRepeat.textContent = "Las contraseñas no coinciden";
                this.classList.add('border-danger');
                this.classList.remove('border-success');
                passwordRepeatInput.classList.add('border-danger');
                passwordRepeatInput.classList.remove('border-success');
                password = false;
            }else{
                validatorPassword.textContent = "";
                validatorPasswordRepeat.textContent = "";
                this.classList.remove('border-danger');
                this.classList.add('border-success');
                passwordRepeatInput.classList.remove('border-danger');
                passwordRepeatInput.classList.add('border-success');
                password = true;
            }
        }else{
            validatorPassword.textContent = "Este campo no puede estar vacio";
            this.classList.add('border-danger');
            this.classList.remove('border-success');
            password = false;
        }
        passwordCheck = password && passwordRepeat;
        btnSubmit.disabled = !(passwordCheck && emailCheck && userCheck);
    });

    passwordRepeatInput.addEventListener('keyup', function (){
        // console.log(this.value);
        if(this.value !== ""){
            if((this.value !== passwordInput.value) && passwordInput.value !== ""){
                validatorPassword.textContent = "Las contraseñas no coinciden";
                validatorPasswordRepeat.textContent = "Las contraseñas no coinciden";
                this.classList.add('border-danger');
                this.classList.remove('border-success');
                passwordInput.classList.add('border-danger');
                passwordInput.classList.remove('border-success');
                passwordRepeat = false;
            }else{
                validatorPassword.textContent = "";
                validatorPasswordRepeat.textContent = "";
                this.classList.remove('border-danger');
                this.classList.add('border-success');
                passwordInput.classList.remove('border-danger');
                passwordInput.classList.add('border-success');
                passwordRepeat = true;
            }
        }else{
            validatorPasswordRepeat.textContent = "Este campo no puede estar vacio";
            this.classList.add('border-danger');
            this.classList.remove('border-success');
            passwordRepeat = false;
        }
        passwordCheck = password && passwordRepeat;
        btnSubmit.disabled = !(passwordCheck && emailCheck && userCheck);
    });

    emailInput.addEventListener('keyup', function (){
        if(this.value !== ""){
            if(!this.value.includes('@')){
                validatorEmail.textContent = "No es un email valido '@'";
                this.classList.remove('border-success');
                this.classList.add('border-danger');
                emailCheck = false;
            }else{
                validatorEmail.textContent = "";
                this.classList.add('border-success');
                this.classList.remove('border-danger');
                emailCheck = true;
            }
        }else{
            validatorEmail.textContent = "Este campo no puedo esta vacio";
            this.classList.remove('border-success');
            this.classList.add('border-danger');
            emailCheck = false;
        }
        btnSubmit.disabled = !(passwordCheck && emailCheck && userCheck);
    });

    usernameInput.addEventListener('keyup', function (){
        if(this.value !== ""){
            validatorUsername.textContent = "";
            this.classList.add('border-success');
            this.classList.remove('border-danger');
            userCheck = true;
        }else{
            validatorUsername.textContent = "Este campo no puedo esta vacio";
            this.classList.remove('border-success');
            this.classList.add('border-danger');
            userCheck = false;
        }
        btnSubmit.disabled = !(passwordCheck && emailCheck && userCheck);
    });
}

//event listener para cargar todas las funciones creadas
document.addEventListener('DOMContentLoaded', function (){
    init();
    tooglePasswordVisibility();
    validator();
});
