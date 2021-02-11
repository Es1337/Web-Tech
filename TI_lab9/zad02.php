<?php
function __autoload($class_name) { 
echo 'Laduje klase '.$className.'<br />';
include $class_name . '.php' ; 
}
 
$obj = new Server() ; //próbujemy utworzyć obiekt klasy Server bez jej uprzedniego ładowania. PHP szybko odkrywa, że nie ma jej jeszcze w swojej pamięci, dlatego wywołuje funkcję __autoload(), prosząc ją o jej odnalezienie. Funkcja wyświetla na ekranie informację, że coś ładuje, a następnie dokleja do nazwy klasy rozszerzenie i ścieżkę, a całość przesyła do instrukcji require.
$obj->prn_server() ;
$obj->prn_post() ;
$obj->prn_get() ;
$obj->prn_cookie() ;
$obj->prn_session() ;
?>