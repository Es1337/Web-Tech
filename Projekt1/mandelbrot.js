var c;
var ctx;
var arr = [];
var index = 0;
var counter = 0;
var rectSize = 50;
var animate = 1;
var limit;

function init() {
    counter=0;
    rectSize = document.getElementById('start-rect-size').value;
    limit = document.getElementById('limit').value;
    animate = 1;
    c = document.getElementById('dis');
    ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    var z = new Complex(0.0, 0.0);
    var test = "";
    ctx.fillStyle = 'rgb(0,0,0)';

    for(var i = 0; i < c.width + 1; i++) {
        for(var j = 0; j < c.height + 1; j++)
        {
            var x = (i-(0.5*c.width + 0.15*c.width))/(0.5*c.height);
            var y = (j-(0.5*c.height))/(0.5*c.height);
            
            z = new Complex(x,y);

            if(isInMB(z)) {
                arr.push([i, j, 1]);
            }
            else {
                arr.push([i, j, 0]);
            }
        }
    }

    frame();
}

function frame() {
    var x = Math.floor(Math.random() * c.width);
    var y = Math.floor(Math.random() * c.height);
    var l = x*c.height + y;
    const cSize = c.width * c.height;

    if(rectSize > 1 && counter == limit) {
        rectSize -= 2;
        counter = 0;
    }
    else if(rectSize < 1) rectSize = 1;
    document.getElementById('curr-rect-size').innerHTML = rectSize;

    if(arr[l][2] == 1)
    {
        ctx.fillStyle = 'rgba(0,0,0, 0.3)';
        ctx.fillRect(arr[l][0], arr[l][1], rectSize, rectSize);
    }
    else {
        ctx.fillStyle = 'rgba(100,0,200, 0.3)';
        ctx.fillRect(arr[l][0], arr[l][1], rectSize, rectSize);
    }

    counter++;
    if(animate == 1)
        window.requestAnimationFrame(frame);
}

function end() {
    ctx = null;
    animate = 0;
    return;
}

class Complex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    print() {
        return this.x + "+" + this.y + "i";
    }
}

function ac(u, v) {
    return new Complex(u.x + v.x, u.y + v.y);
}

function mc(u, v) {
    return new Complex(u.x*v.x - u.y*v.y, u.x*v.y + u.y*v.x);
}

function dc(u, v) {
    var re = (u.x*v.x + u.y*v.y)/(v.x**2 + v.y**2);
    var im = (-u.x*v.y + u.y*v.x)/(v.x**2 + v.y**2);
    return new Complex(re, im);
}

function isInMB(z) {
    var i, a;
    a = z;

    for(i = 0; i < 1000; i++) {
        a = equation(a);
        if(a.x > 2 || a.x < -2 || a.y > 2 || a.y < -2) {
            return false;
        }
    }
    return true;

    function equation(a) {
        var squared = square(a);
        var sum = new Complex(squared.x + z.x, squared.y + z.y)
        return sum;
    }    
}

function square(z) {
    var re, im;
    re = z.x*z.x - z.y*z.y;
    im = 2* z.x*z.y;
    return new Complex(re, im);
}
