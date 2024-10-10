
let nClicks;
let imgContainer;

function init(){
    nClicks = document.querySelector('#n-clicks');
    imgContainer = document.querySelector('#img-container');
    nClicks.textContent = 0;
}

let initClickImgContainer = function (){
    imgContainer.addEventListener('click', function (){
        nClicks.textContent++;
    });
}

document.addEventListener('DOMContentLoaded', function (){
    init();
    initClickImgContainer();
});