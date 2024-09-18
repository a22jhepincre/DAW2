let btnRegister;
let nameInput;


function init(){
    btnRegister = document.querySelector('#btnRegister');
    nameInput = document.querySelector('#name')
}

let initBtnRegister = function(){
    btnRegister.addEventListener('click', function(){
        fetch('/DAW2/PR0/PR0/back/server.php?route=addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': nameInput.value
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            window.location.href = "juego.php";
        })
        .catch(error => console.error('Error:', error));
    })
}

document.addEventListener("DOMContentLoaded", function () {
    init();
    initBtnRegister();
});