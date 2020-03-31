

let Engine = function () {
    let self = this;
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    let callbacksList = [];

    this.addUpdateCallback = (fn) => {
        callbacksList.push(fn);
    };

    let update = (delta) => {
        callbacksList.forEach(fn => {
           fn(ctx, +delta);
        });
    };

    let oldNow;
    let tick = () => {
        ctx.clearRect(0, 0, 800, 600);
        let now = Date.now();
        update((now - oldNow) / 1000);
        oldNow = now;
        requestAnimationFrame(tick);
    };

    this.start = () => {
        tick();
    }

};
