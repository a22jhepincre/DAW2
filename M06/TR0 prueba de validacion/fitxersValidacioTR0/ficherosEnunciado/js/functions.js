
let list;
let dataRecords = [];
let btnLike;
let btnDislike;
function init(){
    list = document.querySelector('#list');

}

let getBooks =  function (){
    fetch('http://alvaro.daw.inspedralbes.cat/api.php/records/BOOK')
        .then((result) => result.json())
        .then((data)=>{
            dataRecords = data;
            console.log(dataRecords);
            innerBooks();

        })

}

let initBtnDislike = function (){
    btnDislike = document.querySelectorAll('.btn-dislike')
    btnDislike.forEach((btn) =>{
        btn.addEventListener('click', function (){
            let idRecord = this.dataset.idRecord;
            alert("id del record para dar dislike: "+ idRecord)
        });
    })
}

let initBtn = function (){
    list.addEventListener('click', function (e){
        if(e.target.classList.contains('btn-like')){
            console.log(e.target.dataset.idRecord)
            console.log("like")
            alert("id del record para dar like: "+ e.target.dataset.idRecord)

        }else if (e.target.classList.contains('btn-dislike')){
            console.log(e.target.dataset.idRecord)
            console.log("dislike")
            alert("id del record para dar dislike: "+ e.target.dataset.idRecord)

        }
    });
}
let initBtnLike = function (){
    btnLike = document.querySelectorAll('.btn-like')
    btnLike.forEach((btn) =>{
        btn.addEventListener('click', function (){
            let idRecord = this.dataset.idRecord;
            alert("id del record para dar like: "+ idRecord)
        });
    })
}

let innerBooks = function (){
    list.classList.add('row')
    dataRecords.records.forEach((book, key)=>{
        list.innerHTML += `
        <div class="col-lg-4 col-6 w-100" >
        <div class="w-100" style="border:1px solid;"> 
            <div class="w-100" style="height: 400px;">
                <img style="object-fit: cover; height: 100%" class="w-100" src="${book.cover}"/>    
            </div>
            <div class="p-4" >
                <p style="font-weight: bolder; font-size: 1.5rem; margin:0;">${book.title}</p>
                <p style="font-weight: normal; font-size: 1.2rem; margin:0;">${book.genre}</p>
            </div>
            <div class="w-100" style="border-top: 1px solid gray">
                <div class="p-4">
                    <button style="border:0; background-color: #5da423; margin: 0; padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 1rem; padding-right: 1rem; border-radius: 10px;" 
                    class="btn-like"
                    data-like="like"
                    data-id-record="${book.id}"><img src="img/hand-thumbs-up.svg" alt=""
                    class="btn-like"
                    data-like="like"
                    data-id-record="${book.id}"></button>
                       
                    <button style="border:0; background-color: red; margin: 0; padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 1rem; padding-right: 1rem; border-radius: 10px;" 
                    class="btn-dislike"
                    id="btn-dislike"
                    data-dislike="dislike"
                    data-id-record="${book.id}"><img src="img/hand-thumbs-down.svg" alt=""
                    class="btn-dislike"
                    id="btn-dislike"
                    data-dislike="dislike"
                    data-id-record="${book.id}"></button>
                </div>
            </div>
        </div>
            
        </div>
    `;
    })
    // initBtnDislike();
    // initBtnLike();
    initBtn();
}

document.addEventListener("DOMContentLoaded",function() {
    //EL TEU CODI AQUI
    init();
    getBooks();
})
