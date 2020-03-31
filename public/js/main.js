let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');



let drawBlocks = (x, y) => {
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect (x, y, 55, 50);
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect (x + 20, y + 20, 55, 50);
};



let i = 0;


let update = (delta) => {

    i++;

    let x = Math.cos(i / 100) * 200;
    let y = Math.sin(i / 100) * 200;

    drawBlocks(x + 400, y + 300);

    ctx.font = "14px Arial";
    ctx.fillText("Delta: " + delta, 10, 50);

};



let oldNow;
let tick = () => {
    ctx.clearRect(0, 0, 800, 600);
    let now = Date.now();
    update((now - oldNow) / 1000);
    oldNow = now;
    requestAnimationFrame(tick);
};
tick();
