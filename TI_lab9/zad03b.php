<?php
  
function __autoload($class_name) {
include $class_name . '.php' ;
}
 
  
$sesja = new Sesja();
  
$sesja->setSession() ;
  
$obj = new Server();
  
$obj->prn_cookie();
$obj->prn_session();
?>