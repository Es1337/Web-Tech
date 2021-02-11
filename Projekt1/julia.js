var animate = 1;
function juliaStart() {
    var creal = document.getElementById('c-real').value;
    var cimg = document.getElementById('c-img').value;
    var canvas;
    var ctx;
    var frame = 0;
    var color;

    var pallette = [];
    animate = 1;

    function julia() {
        canvas = document.getElementById('dis2');
        ctx = canvas.getContext('2d');
        
        for(var i = 0; i < 200; i++) {
            for(var j = 0; j < 200; j++) {
                var cx = -2 + i/50;
                var cy = -2 + j/50;
                
                var index = 0;
                
                do {
                    let xt = cx*cx-cy*cy+creal;
                    cy = 2*cx*cy+cimg;
                    cx = xt;
                    index++;
                }while((cx*cx+cy*cy<4) && index<25);
                
                ctx.beginPath();
                ctx.rect(i*4, j*4, 4, 4);
                ctx.fillStyle = pallette[index];
                ctx.fill();
            }
        }
        frame++;
        creal = -0.8 + 0.6*Math.sin(frame/(3.14*20));
        cimg = -0.8 + 0.4*Math.cos(frame/(3.14*40));
        if(animate == 1)
            window.requestAnimationFrame(julia);
    }

    for(var k = 0; k < 9; k++) {
        color = (31*k).toString(16);

        if(color.length == 1) 
            color = '0' + color;

        pallette[k] = "#" + color + color + 'ff';
        pallette[k+8] = '#00ff' + color;
        pallette[17 + k] = "#" + color + '0000';
    }

    if(animate == 1)
        window.requestAnimationFrame(julia);
}

function juliaEnd() {
    var canvas = document.getElementById('dis2');
    var ctx = canvas.getContext('2d');
    animate = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx = null;

    return;
}
