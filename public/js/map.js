let map = [
    [[6,1], [9,1], [9,3], [6,3]],
    [[1,6], [5,6], [5,11], [1,11]],
    [[13,4], [13,7], [12,7], [12,4]],
    [[9,8], [10,8], [10,9], [9,9]],
];

let scaleFactor = 15;

let MapData = map.map(poly => {
   return poly.map(coord => {
       return {
           x: coord[0] * scaleFactor,
           y: coord[1] * scaleFactor,
       }
   })
});
