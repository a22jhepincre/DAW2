let btnPlay;
let nameInput;


function init(){
    btnPlay = document.querySelector('#btnPlay');
    nameInput = document.querySelector('#name')
}

let initBtnPlay = function(){
    btnPlay.addEventListener('click', function(){
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
    initBtnPlay();
});