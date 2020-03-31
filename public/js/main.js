

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

    // ctx.font = "14px Arial";
    // ctx.fillText("Delta: " + delta, 10, 50);

};


let dirAngle = 0;       // in deg
let viewingAngle = 60;  // in deg
let rayLength = 300;
let cameraPoint = {x: 8 * 15, y: 5 * 15};
let raysCount = 120;

let rayDelta = viewingAngle / raysCount; // in deg
let barWidth = 800 / raysCount;


let direction = 0;

hotkeys('W', {keyup: true, keydown: true}, function() {
    if (event.type === 'keydown') {
        direction = 1;
    }
    if (event.type === 'keyup') {
        direction = 0;
    }
});

hotkeys('S', {keyup: true, keydown: true}, function() {
    if (event.type === 'keydown') {
        direction = -1;
    }
    if (event.type === 'keyup') {
        direction = 0;
    }
});


let drawPreview = (ctx, delta) => {

    // dirAngle += 0.05;

    // console.log(direction);

    let speed = 1;
    cameraPoint.x += direction * Math.cos(engine.toRad(dirAngle)) * speed;
    cameraPoint.y += direction * Math.sin(engine.toRad(dirAngle)) * speed;


    let leftAngle = dirAngle - (viewingAngle / 2);
    let rightAngle = dirAngle + (viewingAngle / 2);

    let barX = 0;

    for ( let a = leftAngle; a <= rightAngle; a += rayDelta) {

        let radA = engine.toRad(a);
        let endRayPoint = {
            x: cameraPoint.x + Math.cos(radA) * rayLength,
            y: cameraPoint.y + Math.sin(radA) * rayLength,
        };

        let intersectResult = Intersection.intersectLinePolygons(cameraPoint, endRayPoint, MapData);

        if(intersectResult.distance !== null) {
            let barHeight = 1 / intersectResult.distance * 1000 * 16;
            let color = (120 - intersectResult.distance).toString();
            ctx.fillStyle = 'rgb('+color+','+color+','+color+')';
            // ctx.strokeStyle = ctx.fillStyle;
            ctx.fillRect(barX, 300 - (barHeight / 2), barWidth, barHeight);
        }
        barX += barWidth;


        // ctx.beginPath();
        // ctx.strokeStyle = "rgb(255,0,0)";
        // ctx.moveTo(cameraPoint.x, cameraPoint.y);
        // ctx.lineTo(intersectResult.target.x, intersectResult.target.y);
        // ctx.stroke();

    }

};

let drawMap = (ctx, delta) => {


    ctx.strokeStyle = "rgb(0,0,0)";
    MapData.forEach(poly => {

        ctx.beginPath();
        ctx.moveTo(poly[0].x, poly[0].y);
        for (let i = 1; i < poly.length; i++ ) {
            ctx.lineTo(poly[i].x, poly[i].y);
        }
        ctx.lineTo(poly[0].x, poly[0].y);
        ctx.stroke();

    });

};

// engine.addUpdateCallback(update);
engine.addUpdateCallback(drawPreview);
engine.addUpdateCallback(drawMap);

engine.start();

// let res = Intersection.intersectLinePolygon({x:2,y:6}, {x:7,y:3}, [{x:2,y:3}, {x:2,y:2}, {x:6,y:2}, {x:6,y:3}]);
// console.log(res);