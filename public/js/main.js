

let engine = new Engine();


let drawBlocks = (ctx, x, y) => {
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect (x, y, 55, 50);
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect (x + 20, y + 20, 55, 50);
};


let i = 0;
let update = (ctx, delta) => {

    i++;

    let x = Math.cos(i / 100) * 200;
    let y = Math.sin(i / 100) * 200;

    drawBlocks(ctx, x + 400, y + 300);

    ctx.font = "14px Arial";
    ctx.fillText("Delta: " + delta, 10, 50);

};

engine.addUpdateCallback(update);

engine.start();

let res = Intersection.intersectLinePolygon({x:2,y:6}, {x:7,y:3}, [{x:2,y:3}, {x:2,y:2}, {x:6,y:2}, {x:6,y:3}]);

console.log(res);