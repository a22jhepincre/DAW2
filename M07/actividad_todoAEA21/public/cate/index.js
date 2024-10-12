
//declarar variables

let btnAddNote;
let btnsEditNote;
let btnDeleteNote;
let formNote;


//funcion init donde busca en el documento las variables
function init(){
    btnAddNote = document.querySelector('#btn-add-note');
    btnsEditNote = document.querySelectorAll('.btn-edit-note');
    btnDeleteNote = document.querySelector('#btn-delete-note');
    formNote = document.querySelector('#form-note');
}


//funciones
let initBtnAddNote = function (){
    btnAddNote.addEventListener('click', function (){
        document.querySelector('#idCategory').value = this.dataset.idCategory;
        formNote.action = 'http://127.0.0.1:8000/note/store';

        let modal = new bootstrap.Modal(document.getElementById('modal-note'));
        modal.show();
    });
}

let initBtnEditNote = function (){
    btnsEditNote.forEach((btnEditNote)=>{
        btnEditNote.addEventListener('click', function (){
            document.querySelector('#idCategory').value = this.dataset.idCategory;
            document.querySelector('#idNote').value = this.dataset.idNote;
            document.querySelector('#title').value = this.dataset.titleNote;
            document.querySelector('#description').value = this.dataset.descriptionNote;
            formNote.action = 'http://127.0.0.1:8000/note/update';

            let modal = new bootstrap.Modal(document.getElementById('modal-note'));
            modal.show();
        });
    });

}

let initBtnDeleteNote = function (){
    btnDeleteNote.addEventListener('click', function (){
        document.querySelector('#idCategory').value = this.dataset.idCategory;
        let modal = new bootstrap.Modal(document.getElementById('modal-note'));
        modal.show();
    });
}

//event listener para cargar todas las funciones creadas
document.addEventListener('DOMContentLoaded', function (){
    init();
    initBtnAddNote();
    initBtnEditNote();
});
