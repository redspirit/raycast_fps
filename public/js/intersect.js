/*****
 *
 *   Intersection.js
 *
 *   copyright 2002, Kevin Lindsey
 *
 *****/

function Point2D(x,y){if(arguments.length>0){this.init(x,y);}}
Point2D.prototype.init=function(x,y){this.x=x;this.y=y;};
Point2D.prototype.dist=function(that){var dx=this.x-that.x;var dy=this.y-that.y;return Math.sqrt(dx*dx+dy*dy);};

function Intersection(status) {
    if ( arguments.length > 0 ) {
        this.init(status);
    }
}

Intersection.prototype.init = function(status) {
    this.status = status;
    this.points = new Array();
};

Intersection.prototype.appendPoint = function(point) {
    this.points.push(point);
};

Intersection.prototype.appendPoints = function(points) {
    this.points = this.points.concat(points);
};

Intersection.intersectLineLine = function(a1, a2, b1, b2) {
    var result;

    var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
    var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
    var u_b  = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

    if ( u_b != 0 ) {
        var ua = ua_t / u_b;
        var ub = ub_t / u_b;

        if ( 0 <= ua && ua <= 1 && 0 <= ub && ub <= 1 ) {
            result = new Intersection("Intersection");
            result.points.push(
                new Point2D(
                    a1.x + ua * (a2.x - a1.x),
                    a1.y + ua * (a2.y - a1.y)
                )
            );
        } else {
            result = new Intersection("No Intersection");
        }
    } else {
        if ( ua_t == 0 || ub_t == 0 ) {
            result = new Intersection("Coincident");
        } else {
            result = new Intersection("Parallel");
        }
    }

    return result;
};

Intersection.intersectLinePolygon = function(a1, a2, points) {
    let result = new Intersection("No Intersection");
    let length = points.length;
    result.intersect = false;
    result.distance = null;

    for ( let i = 0; i < length; i++ ) {
        let b1 = points[i];
        let b2 = points[(i+1) % length];
        let inter = Intersection.intersectLineLine(a1, a2, b1, b2);
        result.appendPoints(inter.points);
    }

    if (result.points.length > 0) {
        let min = Infinity;
        for (let i = 0; i < result.points.length; i++ ) {
            let dist = result.points[i].dist(a1);
            if(dist < min) {
                min = dist;
                result.distance = dist;
                result.target = result.points[i];
            }
        }
        result.intersect = true;
        result.status = null;
    }

    return result;
};

Intersection.intersectLinePolygons = function(a1, a2, polygons) {

    let result = {
        intersect: false,
        target: a2
    };

    for ( let i = 0; i < polygons.length; i++ ) {
        let poly = polygons[i];
        let res = Intersection.intersectLinePolygon(a1, a2, poly);
        if(res.intersect) {
            result.intersect = true;
            result.target = res.target;
            result.distance = res.distance;
            break;
        }
    }

    return result;
};