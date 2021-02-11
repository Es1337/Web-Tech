startx = 20;
starty = 450;
endx = 700;
endy = 20;
  
context.beginPath();
context.moveTo(startx, starty);
context.lineTo(endx, endy);
context.strokeStyle = "black";
context.stroke();

context.font = "bold 30px sans-serif";
context.fillText("y = ax + b", 420, 312);