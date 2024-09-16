let containerQuestion;
let containerAnswers;
let indice = 0;

function init() {
    containerQuestion = document.querySelector('#containerQuestion');
    containerAnswers = document.querySelector('#containerAnswers');
}

let cargarQuestion = function (indice) {
    fetch('/PR0/PR0/back/server.php?route=pregunta&id=' + indice)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            containerQuestion.textContent = data.pregunta;
            containerAnswers.innerHTML = ``;
            let answersHtml = ``;
            data.respostes.forEach(resposta => {
                answersHtml += `
                <div class="col-lg-5 col-12 mb-lg-4 mb-2">
                <button class="btn btn-primary btn-lg w-75 py-10 btnOpcion" data-option-id="${resposta.id}">${resposta.resposta}</button>
            </div>`
            });

            containerAnswers.innerHTML = answersHtml;

            let btnsOption = document.querySelectorAll('.btnOpcion');;

            btnsOption.forEach((btnOpcion) => {
                btnOpcion.addEventListener('click', function () {
                    
                    cargarQuestion(indice)
                });
            })

            let containerProgressbar = document.querySelector('#containerProgressbar');
            containerProgressbar.innerHTML = `
            <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${indice * 10}" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: ${indice * 10}%"></div>
            </div>
            `;

            indice++;

        })
        .catch(error => console.error('Error:', error));
}


let verify = function () {

}

document.addEventListener("DOMContentLoaded", function () {
    init();

    cargarQuestion(0);
    btnsOpcion();
});