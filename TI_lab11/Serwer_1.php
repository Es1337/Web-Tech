<?php
function test() { 
   return "Test serwisu SOAP 1.2 - plik serwer_1.php";
} 
  
   $server = new SoapServer(null, array(
      'uri' => "http://pascal.fis.agh.edu.pl/Demo",
      'soap_version' => SOAP_1_2));
   $server->addFunction("test"); 
   $server->handle();
  
?>