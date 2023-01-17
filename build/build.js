var gui = new dat.GUI();
var params = {
    nombre_ellipse: 3,
    nombre_rayon: 50,
    size_ellipse: 350,
    noise: 0.1,
    random_seed: 0,
    Download_Image: function () { return save(); }
};
gui.add(params, "nombre_ellipse", 1, 50, 1);
gui.add(params, "nombre_rayon", 10, 200, 1);
gui.add(params, "size_ellipse", 100, 500, 1);
gui.add(params, "noise", 0.1, 1, 0.1);
gui.add(params, "random_seed", 0, 50, 1);
gui.add(params, "Download_Image");
function draw() {
    randomSeed(params.random_seed);
    background('black');
    for (var i = 0; i < params.nombre_ellipse; i++) {
        noFill();
        noStroke();
        var pos_x = random(width);
        var pos_y = random(height);
        ellipse(pos_x, pos_y, params.size_ellipse);
        var pos_bebe_x = random(pos_x - params.size_ellipse / 3, pos_x + params.size_ellipse / 3);
        var pos_bebe_y = random(pos_y - params.size_ellipse / 3, pos_y + params.size_ellipse / 3);
        ellipse(pos_bebe_x, pos_bebe_y, 10);
        stroke(random(255), random(255), random(255));
        strokeWeight(1);
        for (var i_1 = 0; i_1 < params.nombre_rayon; i_1++) {
            var angle = TWO_PI / params.nombre_rayon * i_1;
            var variation = map(noise(i_1 * params.noise), 0, 1, -20, 20);
            line(pos_bebe_x, pos_bebe_y, pos_x + (params.size_ellipse + variation) * cos(angle) / 2, pos_y + (params.size_ellipse + variation) * sin(angle) / 2);
        }
    }
}
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map