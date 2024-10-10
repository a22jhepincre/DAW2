let data = [
    {
        'id':1,
        'name': 'gato1',
        'url_pic': 'https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97?fm=webp&w=612'
    },
    {
        'id':2,
        'name': 'gato2',
        'url_pic': 'https://puppis.blog/wp-content/uploads/2022/02/abc-cuidado-de-los-gatos-min.jpg'
    }
]

let containerImg;
let containerClicks;
let imgContent;

function init(){
    containerImg = document.querySelector('#container-img');
    containerClicks = document.querySelector('#container-clicks');
}

let initImg = function (){
    data.forEach((data, key)=>{
        containerImg.innerHTML += `
            <div class="d-flex">
                <div style="width: 100px; height: 100px; overflow: hidden;">
                    <img class="img-content" data-id-gato="${data.id}" src="${data.url_pic}" style="max-width: 100%; max-height: 100%; object-fit: cover;" />
                </div>
                <p>${data.name}</p>
            </div>
            
        `;
    });
    initImgClick();
}

let initClickers = function (){
    data.forEach((data, key)=> {
        containerClicks.innerHTML += `
            <div>
                ${data.name} clicks:
                <div id="click-${data.id}">
                    0
                </div>
                
            </div>
            
        `;
    });
}

let initImgClick = function (){
    imgContent = document.querySelectorAll('.img-content');
    imgContent.forEach((img, key)=>{
        img.addEventListener('click', function (){
            let idGato = this.dataset.idGato;
            document.querySelector('#click-'+idGato).textContent++;
        });
    });
}


document.addEventListener('DOMContentLoaded', function (){
    init();
    initImg();
    initClickers();
});