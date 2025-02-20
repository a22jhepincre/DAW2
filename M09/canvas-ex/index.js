const colorRectangle = "#111111";
const colorPunts = "blue";
const alcada = 245;
const diametre = 80;
const marge = 15;
let pintarRatoliCheck;

function init() {
    const canvas = document.getElementById("myCanvas");
    pintarRatoliCheck = document.querySelector('#pintar-ratoli-check');
    if (!canvas || !canvas.getContext) {
        console.error("Error: No se encontró el canvas o no es compatible.");
        return;
    }

    const ctx = canvas.getContext("2d");

    pintarP(ctx);
    pintarCirculoArribaIzquierda(ctx);
    pintarCirculoAbajoDerecha(ctx, canvas.width - marge - diametre / 2, canvas.height + marge - marge - diametre);
    pintarI(ctx);
}

let pintarP = (ctx) => {
    console.log("Pintando la letra P");

    ctx.beginPath();
    ctx.fillStyle = colorRectangle;
    ctx.fillRect(marge * 2 + diametre, marge, diametre, alcada);
    ctx.fillRect(marge * 3 + diametre * 2, marge, diametre, alcada - diametre - marge);
    ctx.stroke();
}

let pintarCirculoArribaIzquierda = (ctx) => {
    console.log(`Pintando círculo arriba izquierda`);

    ctx.beginPath();
    ctx.arc(marge + diametre / 2, marge + diametre / 2, diametre / 2, 0, Math.PI * 2);
    ctx.fillStyle = colorPunts;
    ctx.fill();
    ctx.stroke();


}

let pintarCirculoAbajoDerecha = (ctx, x, y)=>{
    console.log(`Pintando círculo abajo derecha`);

    ctx.beginPath();
    ctx.arc(x, y,diametre / 2, 0, Math.PI * 2);
    ctx.fillStyle = colorPunts;
    ctx.fill();
    ctx.stroke();
}

let pintarI = (ctx) => {
    console.log("Pintando la letra I");

    ctx.beginPath();
    ctx.fillStyle = colorRectangle;
    ctx.fillRect(marge, alcada / 2 - marge, diametre, alcada - diametre - marge);
    ctx.stroke();
}

let pintarCanvas = (ctx, event, canvas) => {
    console.log("Pintando canvas");
    if(!pintarRatoliCheck.checked){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pintarP(ctx);
        pintarCirculoArribaIzquierda(ctx);
        pintarCirculoAbajoDerecha(ctx, event.clientX, event.clientY);
        pintarI(ctx);
        return;
    }
    ctx.beginPath();
    ctx.fillStyle = colorPunts;
    ctx.strokeStyle = colorPunts;
    ctx.arc(event.clientX, event.clientY, diametre / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
}

let pintarRatoli = (event) => {
    console.log("ratoli");
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    pintarCanvas(ctx, event, canvas);

}

let pintarLogo = ()=>{
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pintarP(ctx);
    pintarCirculoArribaIzquierda(ctx);
    pintarCirculoAbajoDerecha(ctx, canvas.width - marge - diametre / 2, canvas.height + marge - marge - diametre);
    pintarI(ctx);
}
document.addEventListener('DOMContentLoaded', function () {
    init();
});
