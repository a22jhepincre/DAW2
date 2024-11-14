let addName;
let name;

let initAddName = function (){
    addName.addEventListener('click', function (){
        console.log(name.value);
        if(name.value === ''){
            window.alert('PA ponte un nombre')
        }

        localStorage.setItem('name', name.value);

        window.location = 'chat.html';
    });
}

function init(){
    addName = document.querySelector('#add-name');
    name = document.querySelector('#name');
}

document.addEventListener('DOMContentLoaded', function (){
   init();
    initAddName();
});
