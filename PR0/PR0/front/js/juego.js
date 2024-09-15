let btnsOption;

function init() {
    btnsOption = document.querySelectorAll('#btnOpcion');
}

let btnSelect = function () {
    btnsOption.forEach(btnOption => {
        btnOption.addEventListener('click', function () {
            let respuesta = this.textContent;
            let respuestaId = this.getAttribute('data-option-id')
            console.log(respuesta)
            console.log(respuestaId)
        })
    });
}

document.addEventListener("DOMContentLoaded", function () {
    init();

    btnSelect();
});