let result;

function init(){
    result = document.querySelector('#result');
}

let getResults = function(){
    fetch('/DAW2/PR0/PR0/back/server.php?route=results')
    .then(response => response.json())
    .then(data => {
        console.log(data)

        result.textContent = data['nAnswersCorrect'] + "/10";
    })
}



document.addEventListener("DOMContentLoaded", function () {
    init();

    getResults();
});