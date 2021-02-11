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
 
function sendRequest(val){
    request = getRequestObject();
    var url = "../cgi-bin/ajax1.py";
    url += "?option=" + val;
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
    target = document.getElementById("opt");
    if (request.readyState == 4) {
        if(request.status == 200) {
            response = request.responseXML;

            var root = response.documentElement;
            var optionArray = root.getElementsByTagName('option');
            var html = "";

            target.innerHTML = "<option name=\"default\">Wybierz opcje</option>";

            for(var i = 0; i < optionArray.length; i++) {
                html += "<option name = \"" + i + "\" >";
                html += optionArray.item(i).firstChild.data;
                html += "</option>";
            }
            target.innerHTML += html;
        }
    }
}