//declarar variables

let btnsAddNote;
let btnsEditNote;
let btnsDeleteNote;
let formNote;
let formCategory;
let btnAddCategory;
let btnsEditCategory;
let btnsDeleteCategory;

//funcion init donde busca en el documento las variables
function init(){
    btnsAddNote = document.querySelectorAll('.btn-add-note');
    btnsEditNote = document.querySelectorAll('.btn-edit-note');
    btnsDeleteNote = document.querySelectorAll('.btn-delete-note');
    formNote = document.querySelector('#form-note');
    formCategory = document.querySelector('#form-category');
    btnAddCategory = document.querySelector('#btn-add-category');
    btnsEditCategory = document.querySelectorAll('.btn-edit-category');
    btnsDeleteCategory = document.querySelectorAll('.btn-delete-category');
}


//funciones
let initBtnAddCategory = function (){
    btnAddCategory.addEventListener('click', function (){
        formCategory.action = 'http://127.0.0.1:8000/category/store'
        let modal = new bootstrap.Modal(document.querySelector('#modal-category'));

        modal.show();

    });
}

let initBtnsEditCategory = function (){
    btnsEditCategory.forEach((btnEditCategory=>{
        btnEditCategory.addEventListener('click', function (){
            document.querySelector('#id-category').value = this.dataset.idCategory;
            document.querySelector('#name').value = this.dataset.nameCategory;
            formCategory.action = 'http://127.0.0.1:8000/category/update'

            let modal = new bootstrap.Modal(document.querySelector('#modal-category'));

            modal.show();
        });
    }))
}

let initBtnsDeleteCategory = function (){
    btnsDeleteCategory.forEach(btnDeleteCategory=>{
        btnDeleteCategory.addEventListener('click', function (){
            let idCategoria = this.dataset.idCategory;
            Swal.fire({
                title: 'Advice!',
                html: 'Do you want to continue to delete the Category? <br> This action delete all notes inside category.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    document.querySelector('#delete-category-form-'+idCategoria).submit();
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    console.log("Action cancelled");
                }
            });
        });
    })
}

let initBtnAddNote = function (){
    btnsAddNote.forEach(btnAddNote=>{
        btnAddNote.addEventListener('click', function (){
            document.querySelector('#idCategory').value = this.dataset.idCategory;
            formNote.action = 'http://127.0.0.1:8000/note/store';

            let modal = new bootstrap.Modal(document.getElementById('modal-note'));
            modal.show();
        });
    })

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
    btnsDeleteNote.forEach((btnDeleteNote)=>{
        btnDeleteNote.addEventListener('click', function (){
            let idNote = this.dataset.idNote;
            Swal.fire({
                title: 'Advice!',
                text: 'Do you want to continue to delete the note?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    document.querySelector('#delete-note-form-'+idNote).submit();
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    console.log("Action cancelled");
                }
            });

        });
    })

}

//event listener para cargar todas las funciones creadas
document.addEventListener('DOMContentLoaded', function (){
    init();
    initBtnAddNote();
    initBtnEditNote();
    initBtnDeleteNote();
    initBtnAddCategory();
    initBtnsEditCategory();
    initBtnsDeleteCategory();
});
