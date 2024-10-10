let data = {
    catActive: 0,
    gatos: [
        { name: "Michifu",  image: "https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97?fm=webp&w=612", nclicks: 0 },
        { name: "Minino",  image: "https://puppis.blog/wp-content/uploads/2022/02/abc-cuidado-de-los-gatos-min.jpg", nclicks: 0 },
        { name: "Garfield",  image: "https://clinicaveterinarium.es/wp-content/uploads/2023/11/lindo-gatito-gato-siames-interior.jpg", nclicks: 0 },
        { name: "LindoGatito", image: "https://static.fundacion-affinity.org/cdn/farfuture/46mZnLhAYw8xwZBGnHdtITnaZqhrx5cvHSN81eUMWzw/mtime:1528830293/sites/default/files/el-gato-necesita-tener-acceso-al-exterior.jpg", nclicks: 0 }
    ]
};

let containerName;
let containerClicks;
let containerImg;

function init(){
    containerName = document.querySelector('#container-name');
    containerClicks = document.querySelector('#container-clicks');
    containerImg = document.querySelector('#container-img');
}

let initImg = function (){
    data.gatos.forEach((gato, key)=>{
        containerName.innerHTML += `
            <div class="d-flex">
                <p class="name-gato">${gato.name}</p>
            </div>
            
        `;
    });
    initClickNameGato();
}

let initClickNameGato = function (){
    let namesGato = document.querySelectorAll('.name-gato');
    namesGato.forEach((gato, key)=>{
        gato.addEventListener('click', function (e){
            let nameGato = e.target.textContent;
            console.log(nameGato);

            let index = data.gatos.findIndex(gato => gato.name === nameGato);
            if (index !== -1) {
                console.log(`Gato encontrado en el índice: ${index}`);
                data.catActive = index;
                showImgGato();
            } else {
                console.log("Gato no encontrado");
            }
        });
    });
}

let showImgGato = function (){
    containerImg.innerHTML = `
        <img id="img-content" src="${data.gatos[data.catActive].image}">
        <div id="click-counter">
            ${data.gatos[data.catActive].nclicks}
        </div>
    `;
    initClickImg();
}

let initClickImg = function (){
    let imgContent = document.querySelector('#img-content');
    imgContent.addEventListener('click', function (){
        data.gatos[data.catActive].nclicks++;
        document.querySelector('#click-counter').textContent = data.gatos[data.catActive].nclicks;
        console.log('click')
    });
}

document.addEventListener('DOMContentLoaded', function (){
    init();
    initImg();
});