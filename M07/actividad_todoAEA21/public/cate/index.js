//declarar variables
const token = window.authToken; // Acceder al token
let btnsAddNote;
let btnsEditNote;
let btnsDeleteNote;
let formNote;
let formCategory;
let btnOpenModalAddCategory;
let btnsEditCategory;
let btnsDeleteCategory;
let btnAddCategory
let modalCategory;
let btnUpdateCategory;

//funcion init donde busca en el documento las variables
function init(){
    btnsAddNote = document.querySelectorAll('.btn-add-note');
    btnsEditNote = document.querySelectorAll('.btn-edit-note');
    btnsDeleteNote = document.querySelectorAll('.btn-delete-note');
    formNote = document.querySelector('#form-note');
    formCategory = document.querySelector('#form-category');
    btnOpenModalAddCategory = document.querySelector('#btn-open-modal-add-category');
    btnsEditCategory = document.querySelectorAll('.btn-edit-category');
    btnsDeleteCategory = document.querySelectorAll('.btn-delete-category');
    btnAddCategory = document.querySelector('#btn-add-category');
    btnUpdateCategory = document.querySelector('#btn-update-category');
    modalCategory = new bootstrap.Modal(document.querySelector('#modal-category'))
    console.log(token)
}


//funciones
let initBtnOpenModalAddCategory = function (){
    btnOpenModalAddCategory.addEventListener('click', function (){
        // formCategory.action = 'http://127.0.0.1:8000/category/store'
        btnUpdateCategory.classList.add('d-none');
        btnAddCategory.classList.remove('d-none');
        modalCategory.show();
    });
}

let initBtnSubmitCategory = function (){
    btnAddCategory.addEventListener('click', function (){
        fetch('/api/category/store', {
            method:'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: document.querySelector('#name').value // O lo que desees enviar
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                document.querySelector('#container-card-categories').innerHTML += data.cardTemplate;

                modalCategory.hide();
            })
            .catch(error => console.error('Error:', error));
    });
}

let initBtnsEditCategory = function (){
    btnsEditCategory.forEach((btnEditCategory=>{
        btnEditCategory.addEventListener('click', function (){
            document.querySelector('#id-category').value = this.dataset.idCategory;
            document.querySelector('#name').value = this.dataset.nameCategory;
            btnUpdateCategory.classList.remove('d-none');
            btnAddCategory.classList.add('d-none');
            modalCategory.show();
        });
    }))
}

let initBtnUpdateCategory = function (){
    btnUpdateCategory.addEventListener('click', function (){
        fetch('/api/category/update', {
            method:'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: document.querySelector('#id-category').value,
                name: document.querySelector('#name').value // O lo que desees enviar
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                document.querySelector('#category-name-'+data.category.id).textContent = data.category.name;
                modalCategory.hide();
            })
            .catch(error => console.error('Error:', error));
    });
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
                    // document.querySelector('#delete-category-form-'+idCategoria).submit();
                    fetch('/api/category/delete/'+idCategoria, {
                        method:'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: null
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                            document.querySelector('#card-category-'+idCategoria).remove();
                        })
                        .catch(error => console.error('Error:', error));

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
    initBtnOpenModalAddCategory();
    initBtnsEditCategory();
    initBtnsDeleteCategory();
    initBtnSubmitCategory();
    initBtnUpdateCategory();
});
