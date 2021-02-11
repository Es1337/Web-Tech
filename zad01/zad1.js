var request;
var response;
function getRequestObject(){
    if ( window.ActiveXObject) {
        return ( new ActiveXObject("Microsoft.XMLHTTP")) ;
    } 
    else if (window.XMLHttpRequest) {
        return (new XMLHttpRequest())  ;
    } 
    else {
        return (null) ;
    }
}
 
function getNew(){
    var input = document.getElementById("in");
    var html = "";
    html += "<form action=\"#\" method=\"get\"><br/>";
    html += "wspolrzedne: srodka <input type=\"text\" id=\"x\" required> <input type=\"text\" id=\"y\" required><br/>";
    html += "promien: <input type=\"text\" id=\"radius\" required><br/>";
    html += "kolor: <input type=\"text\" id=\"color\" required><br/>";
    html += "<input type=\"button\" value=\"Zapisz\" onclick=\"sendRequestNew()\"></form>";
    input.innerHTML = html;
}

function sendRequestNew(){
    request = getRequestObject();
    var url = "../cgi-bin/zapisz_.py";
    var x = document.getElementById("x").value;
    var y = document.getElementById("y").value;
    var radius = document.getElementById("radius").value;
    var color = document.getElementById("color").value;
    url += "?x=" + x;
    url += "&y=" + y;
    url += "&r=" + radius;
    url += "&c=" + color;

    if(request)
    {
        try {
            request.onreadystatechange = handleResponseNew;
            request.open("GET", url, true);
            request.send(null);
        }
        catch(e){
            
        }
    }
}

function sendRequestDraw(){
    request = getRequestObject();
    var url = "../cgi-bin/czytaj_.py";

    if(request)
    {
        try {
            request.onreadystatechange = handleResponse;
            request.open("GET", url, true);
            request.send(null);
        }
        catch(e){
            
        }
    }
}
 
function handleResponse(){
    var draw = document.getElementById("draw");
    if (request.readyState == 4) {
        if(request.status == 200) {
            response = request.responseText;

            draw.innerHTML += response;
        }
    }
}

function handleResponseNew(){
    var inp = document.getElementById("in");
    if (request.readyState == 4) {
        if(request.status == 200) {
            response = request.responseText;
            inp.innerHTML = "";

            inp.innerHTML += response;
        }
    }
}

function draw()