var request;
var objJSON;
var id_mongo;
function getRequestObject()      {
    if ( window.ActiveXObject)  {
        return ( new ActiveXObject("Microsoft.XMLHTTP")) ;
    } else if (window.XMLHttpRequest)  {
        return (new XMLHttpRequest())  ;
    } else {
        return (null) ;
    }
}

// Lista rekordow w bazie
function _list() {
    document.getElementById('result').innerHTML = ''; 
    document.getElementById('data').innerHTML = '';  
    request = getRequestObject() ;
    request.onreadystatechange = function() {
        if (request.readyState == 4)    {
            objJSON = JSON.parse(request.response);
            var txt = "";
            for ( var id in objJSON )  {
                txt +=  id+": {";
                for ( var prop in objJSON[id] ) {             
                    if ( prop !== '_id')
                    { 
                        txt += prop+":"+objJSON[id][prop]+",";  
                    }
                    else
                    { 
                        txt += "id:" + objJSON[id][prop]['$oid']+","; 
                    } 
                }
                txt +="}<br/>";
            }
            document.getElementById('result').innerHTML = txt;
        }
    }
    request.open("GET", "/~8kusm/zad02/biblioteka/list", true);
    request.send(null);
}

// Wstawianie rekordow do bazy
function _ins_form() {
    var form1 = "<form name='add'><table>" ;
    form1    += "<tr><td>id</td><td><input type='text' name='id' value='1' ></input></td></tr>";
    form1    += "<label for=\"cat\">Kategoria:</label><select name=\"cat\" id=\"cat\"><option value=\"horror\">Horrory</option><option value=\"album\">Albumy</option><option value=\"basn\">Baśń</option>";
    form1    += "<tr><td>tytuł</td><td><input type='text' name='title' value='title' ></input></td></tr>";
    form1    += "<tr><td>autor</td><td><input type='text' name='author' value='author' ></input></td></tr>";  
    form1    += "<tr><td>wydawnictwo</td><td><input type='text' name='publisher' value='publisher' ></input></td></tr>";
    form1    += "<tr><td></td><td><input type='button' value='wyslij' onclick='_insert(this.form)' ></input></td></tr>";
    form1    += "</table></form>";
    document.getElementById('data').innerHTML = form1;
    document.getElementById('result').innerHTML = ''; 
}

function _insert(form)  {
    var book = {};
    book.id = form.id.value;
    book.cat = form.cat.value;
    book.title = form.title.value;
    book.author = form.author.value;
    book.publisher = form.publisher.value;
    
    txt = JSON.stringify(book);
    document.getElementById('result').innerHTML = ''; 
    document.getElementById('data').innerHTML = '';  
    request = getRequestObject() ;
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200 )    {
            document.getElementById('result').innerHTML = request.response;
        }
    }
    request.open("POST", "/~8kusm/zad02/biblioteka/save", true);
    request.send(txt);
}

// Usuwanie rekordow z bazy danych
function _del_list() {
    document.getElementById('result').innerHTML = ''; 
    document.getElementById('data').innerHTML = '';  
    request = getRequestObject() ;
    request.onreadystatechange = function() {
        if (request.readyState == 4) { 
            objJSON = JSON.parse(request.response);
            var txt = "<form name='data'><select name='del' size='10'>";
            for ( var id in objJSON ) {
                txt +=  "<option value="+id+" >"+id+": {" ;
                for ( var prop in objJSON[id] ) {             
                    if ( prop !== '_id')
                    { txt += prop+":"+objJSON[id][prop]+",";  }
                    else
                    { txt += "id:"+ objJSON[id][prop]['$oid']+"," ;  }
                }     
                txt +="}</option>";
            }
            txt += "</select><br/><input type='button' value='usun' onclick='_delete(this.form)'/></form>";
            document.getElementById('data').innerHTML = txt;
        }
    }
    request.open("GET", "/~8kusm/TI_lab12/rest/list", true);
    request.send(null);
}

function _delete(form) {
    var rec = form.del.selectedIndex;
    var id = document.getElementsByTagName('option')[rec].value;
    var id_mongo = objJSON[id]['_id']['$oid'];
    document.getElementById('result').innerHTML = ''; 
    document.getElementById('data').innerHTML = '';  
    request = getRequestObject() ;
    request.onreadystatechange = function() {
        if (request.readyState == 4 )    {
            document.getElementById('result').innerHTML = request.response;
        }
    }
    print (id_mongo);
    request.open("DELETE", "/~8kusm/zad02/biblioteka/delete1/"+id_mongo, true);

    request.send(null);
}

// Poprawa rekordow w bazie danych
function _upd_list() {
    document.getElementById('result').innerHTML = ''; 
    document.getElementById('data').innerHTML = '';  
    request = getRequestObject() ;
    request.onreadystatechange = function() {
        if (request.readyState == 4)    { 
        objJSON = JSON.parse(request.response);
        var txt = "<form name='data'><select name='del' size='10'>";
        for ( var id in objJSON )  {
            txt +=  "<option value="+id+" >"+id+": {" ;
            for ( var prop in objJSON[id] ) {             
                if ( prop !== '_id')
                { txt += prop+":"+objJSON[id][prop]+",";  }
                else
                { txt += "oid:" + objJSON[id][prop]['$oid']+"," ;  }
            }    
            txt +="}</option>";
        }
        txt += "</select><br/><input type='button' value='popraw' onclick='_upd_form(this.form)'/></form>";
        document.getElementById('data').innerHTML = txt;
        }
    }
    request.open("GET", "/~8kusm/zad02/biblioteka/list", true);
    request.send(null);
  }




function _upd_form(form) {
    var rec = form.del.selectedIndex;
    id_rec = document.getElementsByTagName('option')[rec].value;
    id_mongo = objJSON[id_rec]['_id']['$oid'];
    console.log(id_mongo);
    document.getElementById('result').innerHTML = ''; 
    document.getElementById('data').innerHTML = '';  
    var form1 = "<form name='add'><table>" ;
    form1    += "<label for=\"cat\">Kategoria:</label><select name=\"cat\" id=\"cat\"><option value=\"horror\">Horrory</option><option value=\"album\">Albumy</option><option value=\"basn\">Baśń</option>";
    form1    += "<tr><td>id</td><td><input type='text' name='id' value='"+objJSON[id_rec]['id']+"' ></input></td></tr>";
    form1    += "<tr><td>tytuł</td><td><input type='text' name='title' value='"+objJSON[id_rec]['title']+"' ></input></td></tr>";  
    form1    += "<tr><td>autor</td><td><input type='text' name='author' value='"+objJSON[id_rec]['author']+"' ></input></td></tr>";
    form1    += "<tr><td>wydawnictwo</td><td><input type='text' name='publisher' value='"+objJSON[id_rec]['publisher']+"' ></input></td></tr>";
    form1    += "<tr><td></td><td><input type='button' value='wyslij' onclick='_update(this.form)' ></input></td></tr>";
    form1    += "</table></form>";
    document.getElementById('data').innerHTML = form1;
    document.getElementById('result').innerHTML = ''; 
}

function _update(form) {
    var book = {};
    book.id = form.id.value;
    book.cat = form.cat.value;
    book.title = form.title.value;
    book.author = form.author.value;
    book.publisher = form.publisher.value;
    txt = JSON.stringify(book);
    document.getElementById('result').innerHTML = ''; 
    document.getElementById('data').innerHTML = '';  
    request = getRequestObject() ;
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200 )    {
            document.getElementById('result').innerHTML = request.response;
            }
    }
    request.open("PUT", "/~8kusm/zad02/biblioteka/update1/"+id_mongo, true);
    request.send(txt);
}

// Szukanie rekordow w bazie
function _search_form() {
    var form1 = "<form name='add'><table>" ;
    form1    += "<tr><td>id</td><td><input type='text' name='id' value='id' ></input></td></tr>";
    form1    += "<tr><td></td><td><input type='button' value='wyslij' onclick='_search(this.form)' ></input></td></tr>";
    form1    += "</table></form>";
    document.getElementById('data').innerHTML = form1;
    document.getElementById('result').innerHTML = ''; 
}

function _search_form_cat() {
    var form1 = "<form name='add'><table>" ;
    form1    += "<label for=\"cat\">Kategoria:</label><select name=\"cat\" id=\"cat\"><option value=\"horror\">Horrory</option><option value=\"album\">Albumy</option><option value=\"basn\">Baśń</option>";
    form1    += "<tr><td></td><td><input type='button' value='wyslij' onclick='_search_cat(this.form)' ></input></td></tr>";
    form1    += "</table></form>";
    document.getElementById('data').innerHTML = form1;
    document.getElementById('result').innerHTML = ''; 
}

function _search_(form) {
    var target = form.id.value;
    var txt = '';
    document.getElementById('result').innerHTML = ''; 
    document.getElementById('data').innerHTML = '';  
    request = getRequestObject() ;
    request.onreadystatechange = function() {
        if (request.readyState == 4 )    {
            objJSON = JSON.parse(request.response);
            for(var id in objJSON)
            {
                if(objJSON[id]['id'] == target)
                {
                    for ( var prop in objJSON[id] ) {             
                        if ( prop !== '_id')
                            { txt += prop+": "+objJSON[id][prop]+", ";  }
                        else
                            { txt += "oid: " + objJSON[id][prop]['$oid']+", " ;  }
                    }    
                }
            }
            document.getElementById('result').innerHTML = txt;
        }
    }

   request.open("GET", "/~8kusm/zad02/biblioteka/list/", true);
   request.send(null);
}

function _search_cat(form) {
    var target = form.cat.value;
    var txt = '';
    document.getElementById('result').innerHTML = ''; 
    document.getElementById('data').innerHTML = '';  
    request = getRequestObject() ;
    request.onreadystatechange = function() {
        if (request.readyState == 4 )    {
            objJSON = JSON.parse(request.response);
            for(var id in objJSON)
            {
                if(objJSON[id]['cat'] == target)
                {
                for ( var prop in objJSON[id] ) {             
                        if ( prop !== '_id')
                            { txt += prop+": "+objJSON[id][prop]+", ";  }
                        else
                            { txt += "<br/>oid: " + objJSON[id][prop]['$oid']+", " ;  }
                }    
                }
            }
            document.getElementById('result').innerHTML = txt;
        }
    }

    request.open("GET", "/~8kusm/zad02/biblioteka/list/", true);
    request.send(null);
}
