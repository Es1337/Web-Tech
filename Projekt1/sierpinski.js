var canvas;
var ctx;
var depth;
var timer;
var fillColor;
var flag = 1;

function update() {
    canvas = document.getElementById('dis3');
    ctx = canvas.getContext('2d');
    fillColor = document.getElementById('myColor').value;
    var sliderValue = document.getElementById('slider').value;
    depth = sliderValue;
    document.getElementById('sliderText').innerHTML = depth;
    draw(depth);
}

function changeColor() {
    fillColor = document.getElementById('myColor').value;
    ctx.fillStyle = fillColor;
    ctx.fill();
}

function draw(d) {
    canvas = document.getElementById('dis3');
    ctx = canvas.getContext('2d');
    clear();
    triangle(d, ctx);

    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 0.5;
    ctx.stroke();
}

function clear() {
    canvas = document.getElementById('dis3');
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.resetTransform();
    ctx.beginPath();
    ctx.moveTo(0, 0);
}

var iteration = 0;

function start() {
    flag = 1;
    update();
    clear();
    draw();
    animate();
}

function animate() {
    iteration++;
    draw(iteration%11);
    if(flag == 1)
        setTimeout(animate, 500);
}

function endAnimation() {
    flag = 0;
    ctx = null;
    return;
}

var width = 800;
var height = 1000;
var size = 800;

function sierpinski(ax, ay, bx, by, cx, cy, d, context) {
    if(d > 0) {
        var pax = (bx + cx)/2;
        var pay = (by + cy)/2;

        var pbx = (ax + cx)/2;
        var pby = (ay + cy)/2;

        var pcx = (ax + bx)/2;
        var pcy = (ay + by)/2;

        sierpinski(ax, ay, pbx, pby, pcx, pcy, d-1, context);
        sierpinski(pax, pay, bx, by, pcx, pcy, d-1, context);
        sierpinski(pax, pay, pbx, pby, cx, cy, d-1, context);
    }
    else {
        context.moveTo(ax, ay);
        context.lineTo(bx, by);
        context.lineTo(cx, cy);
        context.lineTo(ax, ay);
    }
}

function triangle(d, context) {
    var midpx = width/2;
    var midpy = height/2;

    var ri = (size/6) * Math.sqrt(3);
    var ru = (size/3) * Math.sqrt(3);

    var pax = midpx - (size/2);
    var pay = midpy + ri;

    var pbx = midpx + (size/2);
    var pby = midpy + ri;

    var pcx = midpx;
    var pcy = midpy - ru;

    sierpinski(pax, pay, pbx, pby, pcx, pcy, d, context);
}